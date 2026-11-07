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
