import assert from "node:assert/strict"
import test from "node:test"
import { programs } from "../src/data/programs.ts"
import {
  coursePeriod,
  emptyFilters,
  filterPrograms,
  formatDate,
  moldovaToday,
  registrationStatus,
  selfCheckSummary,
  relatedPrograms,
  programParams,
  catalogParams,
  relatedSearchParams,
  NO_CONFIRMED_ALTERNATIVE,
  UNKNOWN,
} from "../src/lib/programs.ts"

test("past deadline never claims definitively closed; same day and future never claim open", () => {
  const program = programs.find((p) => p.id === "digiprof-a-b")
  assert.equal(registrationStatus(program, "2026-11-07").kind, "past")
  assert.match(
    registrationStatus(program, "2026-11-07").note,
    /nu sunt confirmate/
  )
  for (const today of ["2026-10-29", "2026-10-30"]) {
    assert.equal(registrationStatus(program, today).label, "Termen publicat")
  }
})

test("self-check: unanswered, explicit uncertainty, yes, no and mixed answers", () => {
  const program = programs.find((p) => p.id === "inel-mentori")
  assert.equal(selfCheckSummary(program, {}), "Necesită confirmare")
  const yes = Object.fromEntries(program.selfCheck.map((c) => [c.id, "yes"]))
  assert.equal(selfCheckSummary(program, yes), "Criterii cunoscute îndeplinite")
  assert.equal(
    selfCheckSummary(program, { ...yes, "full-participation": "unknown" }),
    "Necesită confirmare"
  )
  assert.equal(
    selfCheckSummary(program, { ...yes, "management-experience": "no" }),
    "Există criterii cunoscute neîndeplinite"
  )
  assert.equal(
    selfCheckSummary(program, { "management-experience": "no" }),
    "Există criterii cunoscute neîndeplinite"
  )
  for (const id of [
    "upsc-informatica",
    "curriculum-disciplinar",
    "demo-incluziune",
  ]) {
    assert.equal(
      selfCheckSummary(
        programs.find((p) => p.id === id),
        yes
      ),
      "Necesită confirmare"
    )
  }
})

test("interactive criteria have official provenance and do not turn unknowns into criteria", () => {
  const interactive = programs.filter((p) => p.selfCheck?.length)
  assert.equal(interactive.length, 2)
  for (const program of interactive) {
    assert.ok(program.officialUrl && program.verifiedAt && !program.demo)
    for (const check of program.selfCheck) {
      assert.ok(
        check.id && check.question && check.evidence && check.sourceSection
      )
    }
  }
})

test("Plan B prefers same topic and excludes fixtures, self, missing provenance and unrelated records", () => {
  const program = programs[0]
  const matches = relatedPrograms(program, programs)
  assert.equal(matches[0].program.id, "upsc-informatica")
  assert.equal(matches[0].sameTopic, true)
  assert.equal(matches[1].program.id, "curriculum-disciplinar")
  assert.deepEqual(matches[1].audiences, ["Cadre didactice"])
  assert.equal(
    relatedPrograms(program, [program, ...programs.filter((p) => p.demo)])
      .length,
    0
  )
  assert.equal(
    relatedPrograms(program, [
      { ...programs[2], verifiedAt: null },
      programs[3],
    ]).length,
    0
  )
  assert.equal(
    relatedPrograms(program, [{ ...programs[2], officialUrl: null }]).length,
    0
  )
  assert.equal(
    NO_CONFIRMED_ALTERNATIVE,
    "Nu există o alternativă cu înscriere confirmată în catalogul pilot"
  )
  // Related UPSC has future course dates, but its application term remains unknown.
  assert.equal(
    registrationStatus(matches[0].program, "2026-11-07").kind,
    "unknown"
  )
  assert.equal(
    registrationStatus(
      { ...matches[0].program, registrationDeadline: "2026-12-01" },
      "2026-11-07"
    ).kind,
    "published"
  )
})

test("deep links and return preserve every filter; related search intentionally clears conflicting filters", () => {
  const filters = new URLSearchParams({
    q: "competențe digitale",
    language: "Română",
    audience: "Cadre didactice",
    format: "Online",
    topic: "Competențe digitale",
    realOnly: "1",
  })
  const detail = programParams(`?${filters}`, "digiprof-a-b")
  assert.equal(detail.get("program"), "digiprof-a-b")
  assert.equal(catalogParams(`?${detail}`).toString(), filters.toString())
  const next = programParams(`?${detail}`, "upsc-informatica")
  assert.equal(next.get("program"), "upsc-informatica")
  assert.equal(catalogParams(`?${next}`).toString(), filters.toString())
  assert.equal(
    relatedSearchParams(programs[0]).toString(),
    new URLSearchParams({
      topic: "Competențe digitale",
      realOnly: "1",
    }).toString()
  )
  assert.deepEqual([...programParams("", "digiprof-a-b").keys()], ["program"])
})

test("Chisinau summer and winter midnight change the deadline status without using event dates", () => {
  const summer = { ...programs[0], registrationDeadline: "2026-06-30" }
  const winter = { ...programs[0], registrationDeadline: "2026-10-30" }
  assert.equal(
    registrationStatus(summer, moldovaToday(new Date("2026-06-30T20:59:59Z")))
      .kind,
    "published"
  )
  assert.equal(
    registrationStatus(summer, moldovaToday(new Date("2026-06-30T21:00:00Z")))
      .kind,
    "past"
  )
  assert.equal(
    registrationStatus(winter, moldovaToday(new Date("2026-10-30T21:59:59Z")))
      .kind,
    "published"
  )
  assert.equal(
    registrationStatus(winter, moldovaToday(new Date("2026-10-30T22:00:00Z")))
      .kind,
    "past"
  )
})

test("training dates do not become registration deadlines", () => {
  const program = programs.find((p) => p.id === "upsc-informatica")
  assert.equal(registrationStatus(program, "2026-11-07").kind, "unknown")
  assert.equal(formatDate(program.registrationDeadline), UNKNOWN)
  assert.match(coursePeriod(program), /23 noiembrie 2026 – 19 decembrie 2026/)
})

test("month precision does not fabricate a day", () => {
  assert.equal(
    coursePeriod(programs.find((p) => p.id === "curriculum-disciplinar")),
    "noiembrie 2026 – decembrie 2026"
  )
  assert.equal(coursePeriod(programs[0]), UNKNOWN)
})

test("deadline day follows Moldova midnight, independent of host timezone", () => {
  assert.equal(moldovaToday(new Date("2026-11-06T21:59:59Z")), "2026-11-06")
  assert.equal(moldovaToday(new Date("2026-11-06T22:00:00Z")), "2026-11-07")
})

test("search is case and diacritic insensitive across topic and title", () => {
  assert.deepEqual(
    filterPrograms(programs, {
      ...emptyFilters,
      q: "INFORMATICA tehnologii",
    }).map((p) => p.id),
    ["upsc-informatica"]
  )
  assert.equal(
    filterPrograms(programs, { ...emptyFilters, q: "competente digitale" })
      .length,
    2
  )
  assert.equal(
    filterPrograms(programs, { ...emptyFilters, q: "  " }).length,
    programs.length
  )
})

test("language, format and audience intersect; unknown language is excluded", () => {
  assert.deepEqual(
    filterPrograms(programs, {
      ...emptyFilters,
      language: "Română",
      format: "Hibrid",
      audience: "Învățământ primar",
    }).map((p) => p.id),
    ["demo-incluziune"]
  )
  assert.equal(
    filterPrograms(programs, {
      ...emptyFilters,
      language: "Română",
      realOnly: true,
    }).length,
    0
  )
  assert.equal(
    filterPrograms(programs, {
      ...emptyFilters,
      format: "Online",
      audience: "Manageri școlari",
    }).length,
    1
  )
})

test("empty results and real-only filter", () => {
  assert.equal(
    filterPrograms(programs, { ...emptyFilters, q: "nu-exista-programul" })
      .length,
    0
  )
  assert.equal(
    filterPrograms(programs, { ...emptyFilters, realOnly: true }).length,
    4
  )
  assert.equal(
    filterPrograms(programs, {
      ...emptyFilters,
      topic: "Leadership și mentorat",
    }).length,
    1
  )
})

test("fixtures cannot carry official-source verification; real records have provenance and unique links", () => {
  assert.equal(new Set(programs.map((p) => p.id)).size, programs.length)
  for (const program of programs) {
    if (program.demo) {
      assert.equal(program.officialUrl, null)
      assert.equal(program.verifiedAt, null)
      assert.equal(registrationStatus(program).kind, "demo")
    } else {
      assert.equal(new URL(program.officialUrl).protocol, "https:")
      assert.equal(program.verifiedAt, "2026-11-07")
      assert.ok(program.sourceTitle)
    }
  }
})
