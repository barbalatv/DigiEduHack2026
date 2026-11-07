import test from "node:test"
import assert from "node:assert/strict"
import { createLocalRecord, simulateDecision, isSnapshotEnvelope, DEMO_RECORDS } from "../src/lib/governance.ts"

test("new local signal preserves a reference to module 1 but is not submitted to an external platform", () => {
  const ref = { moduleId: 1, entityType: "program", entityId: "upsc-informatica", title: "UPSC", provenance: "local-catalog" }
  const result = createLocalRecord("local-4", { title: "  Curs UPSC  ", problem: "  Lipsesc informații despre înscriere.  ", requestedOutcome: "  Publicați o clarificare oficială.  ", type: "service", reference: ref })
  assert.equal(result.title, "Curs UPSC")
  assert.equal(result.origin, "local")
  assert.equal(result.status, "submitted")
  assert.deepEqual(result.references, [ref])
  assert.equal(result.decision, undefined)
})

test("cannot publish a simulated decision without a reason", () => {
  assert.throws(() => simulateDecision(DEMO_RECORDS[0], "accept", "short"))
})

test("decision is always explicitly simulated", () => {
  const result = simulateDecision(DEMO_RECORDS[0], "defer", "Este nevoie de date suplimentare.")
  assert.equal(result.status, "responded")
  assert.equal(result.decision?.simulated, true)
})

test("snapshot format rejects unknown schemas and malformed items", () => {
  assert.equal(isSnapshotEnvelope({ schemaVersion: "unknown", exportedAt: "now", modules: [] }), false)
  assert.equal(isSnapshotEnvelope({ schemaVersion: "puntea-edu-snapshot/v1", exportedAt: "2026-11-07", modules: [{ id: 9, items: [] }] }), false)
  assert.equal(isSnapshotEnvelope({ schemaVersion: "puntea-edu-snapshot/v1", exportedAt: "2026-11-07", modules: [{ id: 1, items: [{ title: "missing id" }] }] }), false)
  assert.equal(isSnapshotEnvelope({ schemaVersion: "puntea-edu-snapshot/v1", exportedAt: "2026-11-07", modules: [{ id: 1, items: [{ title: "Test", externalId: "a" }] }] }), true)
})
