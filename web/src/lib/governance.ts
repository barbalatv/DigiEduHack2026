/** Puntea Edu MD · M6 interoperability contract (local prototype; not the event platform API). */
export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6
export type FeedbackType = "service" | "program" | "pilot" | "research"
export type FeedbackStatus = "submitted" | "in-review" | "responded"
export type DecisionType = "accept" | "defer" | "reject"

export interface ModuleReference {
  moduleId: ModuleId
  entityType: string
  entityId: string | null
  title: string
  provenance: "local-catalog" | "platform-export" | "example"
  url?: string
}

export interface GovernanceDecision {
  outcome: DecisionType
  rationale: string
  /** A real decision would require an identified, authorised owner and timestamp. */
  simulated: true
}

export interface GovernanceRecord {
  id: string
  title: string
  problem: string
  requestedOutcome: string
  type: FeedbackType
  status: FeedbackStatus
  references: ModuleReference[]
  origin: "fixture" | "local" | "platform-export"
  decision?: GovernanceDecision
}

export interface SnapshotEnvelope {
  schemaVersion: "puntea-edu-snapshot/v1"
  exportedAt: string
  modules: { id: ModuleId; items: PlatformItem[] }[]
}
export interface PlatformItem {
  externalId: string
  title: string
  url?: string
  /** Raw platform content; not a verified decision, service or programme. */
  description?: string
}

export const MODULES: { id: ModuleId; title: string; bridge: string }[] = [
  { id: 1, title: "Oportunități", bridge: "Oferte, condiții și nevoi neacoperite" },
  { id: 2, title: "Expertiză", bridge: "Mentori și practicieni" },
  { id: 3, title: "Comunități", bridge: "Colaborări și continuitate" },
  { id: 4, title: "Coordonare", bridge: "Goluri, suprapuneri și trasee" },
  { id: 5, title: "Evidență", bridge: "Rezultate și cercetări" },
  { id: 6, title: "Guvernanță", bridge: "Feedback, răspuns și decizie motivată" },
]

export const FEEDBACK_TYPES: { id: FeedbackType; label: string }[] = [
  { id: "service", label: "Serviciu digital" },
  { id: "program", label: "Program de formare" },
  { id: "pilot", label: "Pilotare" },
  { id: "research", label: "Cercetare" },
]

export const DEMO_RECORDS: GovernanceRecord[] = [
  {
    id: "demo-m1-upsc",
    title: "Cum clarificăm termenul unei oferte de formare?",
    problem: "În fișa UPSC, perioada cursului este cunoscută, dar termenul înscrierii nu este precizat în sursa consultată.",
    requestedOutcome: "Să existe o cale de solicitare a clarificării și un răspuns public, cu sursă.",
    type: "service",
    status: "submitted",
    origin: "fixture",
    references: [
      { moduleId: 1, entityType: "program", entityId: "upsc-informatica", title: "Informatică și tehnologii WEB — UPSC", provenance: "local-catalog" },
    ],
  },
  {
    id: "demo-m2-m3",
    title: "Cum continuă sprijinul după un atelier?",
    problem: "Scenariu demonstrativ: un participant dorește să păstreze contactul cu un mentor după formare.",
    requestedOutcome: "Propunere de legătură între profilul mentorului și o comunitate de practică.",
    type: "pilot",
    status: "in-review",
    origin: "fixture",
    references: [
      { moduleId: 2, entityType: "expert", entityId: null, title: "Expert relevant — identificare viitoare", provenance: "example" },
      { moduleId: 3, entityType: "community", entityId: null, title: "Comunitate — identificare viitoare", provenance: "example" },
    ],
  },
  {
    id: "demo-m4-m5",
    title: "Publicarea motivelor unei prioritizări",
    problem: "Scenariu demonstrativ: mai multe școli semnalează aceeași nevoie, însă lipsesc argumentele pentru prioritizarea ei.",
    requestedOutcome: "Un răspuns care leagă nevoia, dovezile și motivul unei decizii.",
    type: "research",
    status: "responded",
    origin: "fixture",
    references: [
      { moduleId: 4, entityType: "gap", entityId: null, title: "Gol în ofertă — exemplu", provenance: "example" },
      { moduleId: 5, entityType: "evidence", entityId: null, title: "Evidență locală — exemplu", provenance: "example" },
    ],
    decision: {
      outcome: "defer",
      rationale: "Exemplu: propunerea necesită date suplimentare înainte de un pilot. Nu reprezintă o hotărâre a organizatorilor.",
      simulated: true,
    },
  },
]

export function createLocalRecord(
  id: string,
  input: { title: string; problem: string; requestedOutcome: string; type: FeedbackType; reference?: ModuleReference },
): GovernanceRecord {
  const title = input.title.trim()
  const problem = input.problem.trim()
  const requestedOutcome = input.requestedOutcome.trim()
  if (title.length < 5 || problem.length < 10 || requestedOutcome.length < 10) {
    throw new Error("Completează titlul, problema și rezultatul dorit.")
  }
  return {
    id,
    title,
    problem,
    requestedOutcome,
    type: input.type,
    status: "submitted",
    references: input.reference ? [input.reference] : [],
    origin: "local",
  }
}

export function simulateDecision(record: GovernanceRecord, outcome: DecisionType, reason: string): GovernanceRecord {
  const rationale = reason.trim()
  if (rationale.length < 10) throw new Error("Explică motivul deciziei (minimum 10 caractere).")
  return { ...record, status: "responded", decision: { outcome, rationale, simulated: true } }
}

/** Accepts only our explicitly versioned interchange envelope; never claims to parse the live Apps Script internals. */
export function isSnapshotEnvelope(value: unknown): value is SnapshotEnvelope {
  if (!value || typeof value !== "object") return false
  const s = value as Partial<SnapshotEnvelope>
  return s.schemaVersion === "puntea-edu-snapshot/v1"
    && typeof s.exportedAt === "string"
    && Array.isArray(s.modules)
    && s.modules.every(m => Boolean(m) && typeof m === "object"
      && Number.isInteger(m.id) && m.id >= 1 && m.id <= 6
      && Array.isArray(m.items)
      && m.items.every(i => Boolean(i) && typeof i === "object"
        && typeof i.externalId === "string" && typeof i.title === "string"))
}
