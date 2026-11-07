export type Program = {
  id: string
  title: string
  organizer: string
  topic: string
  audience: string[]
  languages: string[]
  format: string | null
  cost: string | null
  duration: string | null
  certificate: string | null
  registrationDeadline: string | null
  coursePeriod: { start: string; end: string } | null
  verifiedAt: string | null
  officialUrl: string | null
  sourceTitle: string | null
  demo: boolean
  description: string
  conditions: string[]
  nextStep: string
  caveat: string
}

export const UNKNOWN = "Neprecizat în sursă"

export function moldovaToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Chisinau",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  return ["year", "month", "day"]
    .map((key) => parts.find((part) => part.type === key)!.value)
    .join("-")
}

export function registrationStatus(program: Program, today = moldovaToday()) {
  if (program.demo)
    return {
      label: "Exemplu demonstrativ",
      kind: "demo",
      note: "Date fictive pentru testarea prototipului. Nu este un apel real.",
    }
  if (!program.registrationDeadline)
    return {
      label: "Termen neprecizat",
      kind: "unknown",
      note: "Sursa nu precizează un termen de înscriere. Confirmă disponibilitatea la organizator.",
    }
  if (program.registrationDeadline < today)
    return {
      label: "Termen publicat depășit",
      kind: "past",
      note: "Termenul publicat a trecut. O eventuală prelungire și acceptarea înscrierilor nu sunt confirmate.",
    }
  return {
    label: "Termen publicat",
    kind: "published",
    note: "Data publicată nu garantează locuri disponibile. Confirmă înscrierea la organizator.",
  }
}

export function formatDate(value: string | null): string {
  if (!value) return UNKNOWN
  const monthOnly = value.length === 7
  return new Intl.DateTimeFormat("ro-MD", {
    day: monthOnly ? undefined : "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}${monthOnly ? "-01" : ""}T00:00:00Z`))
}

export function coursePeriod(program: Program): string {
  return program.coursePeriod
    ? `${formatDate(program.coursePeriod.start)} – ${formatDate(program.coursePeriod.end)}`
    : UNKNOWN
}

export type Filters = {
  q: string
  language: string
  format: string
  audience: string
  topic: string
  realOnly: boolean
}
export const emptyFilters: Filters = {
  q: "",
  language: "",
  format: "",
  audience: "",
  topic: "",
  realOnly: false,
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("ro")
    .trim()
}

export function filterPrograms(programs: Program[], filters: Filters) {
  const terms = normalize(filters.q).split(/\s+/).filter(Boolean)
  return programs.filter(
    (program) =>
      terms.every((term) =>
        normalize(
          `${program.title} ${program.topic} ${program.organizer}`
        ).includes(term)
      ) &&
      (!filters.language || program.languages.includes(filters.language)) &&
      (!filters.format || program.format === filters.format) &&
      (!filters.audience || program.audience.includes(filters.audience)) &&
      (!filters.topic || program.topic === filters.topic) &&
      (!filters.realOnly || !program.demo)
  )
}
