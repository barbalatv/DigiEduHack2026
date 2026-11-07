import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileQuestion, GitBranch, MessageSquareText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEMO_RECORDS, FEEDBACK_TYPES, MODULES, createLocalRecord, simulateDecision, type DecisionType, type FeedbackType, type GovernanceRecord, type ModuleId, type ModuleReference } from "@/lib/governance"
import "./governance.css"

const statusLabels = {
  submitted: "Propunere primită",
  "in-review": "În analiză",
  responded: "Răspuns publicat",
} as const
const decisionLabels = {
  accept: "Acceptată pentru pasul următor",
  defer: "Amânată, cu motiv",
  reject: "Neprioritizată, cu motiv",
} as const
const initial = { title: "", problem: "", requestedOutcome: "", type: "service" as FeedbackType }
const futureIntegration = "Conector de date pregătit ca structură; importul real din platforma evenimentului nu este conectat."

export default function GovernancePage({ sourceProgramId }: { sourceProgramId: string | null }) {
  const [records, setRecords] = useState<GovernanceRecord[]>(DEMO_RECORDS)
  const [selectedId, setSelectedId] = useState<string>("demo-m1-upsc")
  const [moduleFilter, setModuleFilter] = useState<ModuleId | "all">("all")
  const [form, setForm] = useState(initial)
  const [formError, setFormError] = useState("")
  const [success, setSuccess] = useState("")
  const [decisionOutcome, setDecisionOutcome] = useState<DecisionType>("defer")
  const [decisionReason, setDecisionReason] = useState("")
  const [decisionError, setDecisionError] = useState("")
  const [showDecision, setShowDecision] = useState(false)
  const programRef: ModuleReference | undefined = sourceProgramId
    ? { moduleId: 1, entityType: "program", entityId: sourceProgramId, title: "Program din catalog: " + sourceProgramId, provenance: "local-catalog" }
    : undefined
  const visible = useMemo(
    () => records.filter(r => moduleFilter === "all" || r.references.some(ref => ref.moduleId === moduleFilter)),
    [records, moduleFilter],
  )
  const selected = records.find(r => r.id === selectedId)
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const record = createLocalRecord("local-" + (records.length + 1), { ...form, reference: programRef })
      setRecords(current => [record, ...current])
      setSelectedId(record.id)
      setModuleFilter("all")
      setForm(initial)
      setFormError("")
      setSuccess("Propunere adăugată doar în această sesiune. Nu a fost trimisă sau înregistrată la organizatori.")
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Date incomplete.")
      setSuccess("")
    }
  }
  const submitDecision = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected) return
    try {
      const updated = simulateDecision(selected, decisionOutcome, decisionReason)
      setRecords(current => current.map(r => r.id === selected.id ? updated : r))
      setDecisionReason("")
      setDecisionError("")
      setShowDecision(false)
    } catch (error) {
      setDecisionError(error instanceof Error ? error.message : "Explică decizia.")
    }
  }
  return (
    <div className="gov-page">
      <section className="shell gov-hero">
        <a className="gov-back" href="/"><ArrowLeft size={16} /> Catalogul de formări</a>
        <span className="gov-kicker">PUNTEA EDU MD / MODULUL 6</span>
        <h1>Vocea practicienilor.<br /><span>Decizii care se văd.</span></h1>
        <p>De la o nevoie din școală la o propunere, o evaluare și un răspuns motivat. Acesta este un prototip al fluxului de feedback și guvernanță, nu un canal oficial de depunere.</p>
        <div className="gov-warning"><FileQuestion size={18} /><p><strong>Mod demonstrativ.</strong> Exemplele, analizele și deciziile sunt fictive. Formularele nu trimit și nu salvează date pe server. Platforma DigiEduHack nu este conectată.</p></div>
      </section>
      <section className="shell gov-steps" aria-label="Pașii procesului">
        <div><span>01</span><strong>Nevoie</strong><small>Practicianul descrie problema</small></div>
        <div><span>02</span><strong>Propunere</strong><small>Se leagă de modulele relevante</small></div>
        <div><span>03</span><strong>Analiză</strong><small>Se adună informații și dovezi</small></div>
        <div><span>04</span><strong>Răspuns</strong><small>Decizie, motiv și următorul pas</small></div>
      </section>
      <section className="shell gov-main" aria-labelledby="gov-feed-title">
        <div className="gov-heading">
          <div><span className="gov-kicker">EXPLORARE</span><h2 id="gov-feed-title">Registrul de propuneri</h2><p>Exemple editabile local pentru a testa fluxul cap-coadă.</p></div>
          <span className="gov-demo-count">{records.length} exemple / în această sesiune</span>
        </div>
        <div className="gov-layout">
          <div className="gov-list">
            <div className="gov-filter"><label htmlFor="gov-module">Legătură cu modulul</label>
              <select id="gov-module" value={moduleFilter} onChange={e => setModuleFilter(e.target.value === "all" ? "all" : Number(e.target.value) as ModuleId)}>
                <option value="all">Toate modulele</option>
                {MODULES.map(m => <option key={m.id} value={m.id}>M{m.id} · {m.title}</option>)}
              </select>
            </div>
            {visible.length === 0 && <p className="gov-empty">Niciun exemplu pentru acest filtru. Integrarea cu modulul respectiv nu a fost importată.</p>}
            {visible.map(record => (
              <button className={"gov-record" + (selectedId === record.id ? " active" : "")} key={record.id} onClick={() => { setSelectedId(record.id); setShowDecision(false) }} type="button" aria-pressed={selectedId === record.id}>
                <span className="gov-record-top"><span>{record.origin === "local" ? "LOCAL · NESALVAT" : "EXEMPLU FICTIV"}</span><span>{statusLabels[record.status]}</span></span>
                <strong>{record.title}</strong>
                <small>{FEEDBACK_TYPES.find(t => t.id === record.type)?.label} · {record.references.length ? record.references.map(r => "M" + r.moduleId).join(", ") : "fără legătură"}</small>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <article className="gov-detail">
            {selected ? (
              <>
                <div className="gov-detail-header"><span className="gov-kicker">FIȘA PROPUNERII · {selected.origin === "local" ? "LOCAL" : "DEMO"}</span><span className="gov-state">{statusLabels[selected.status]}</span></div>
                <h3>{selected.title}</h3>
                <div className="gov-description"><h4>Problema semnalată</h4><p>{selected.problem}</p><h4>Ce schimbare se propune?</h4><p>{selected.requestedOutcome}</p></div>
                <h4>Legături cu ecosistemul</h4>
                {selected.references.length ? <ul className="gov-links">{selected.references.map((r, index) =>
                  <li key={index}><span>M{r.moduleId}</span><div><strong>{r.title}</strong><small>{r.provenance === "local-catalog" ? "Referință la catalogul nostru" : "Legătură demonstrativă, neconfirmată"}</small></div>
                  {r.moduleId === 1 && r.entityType === "program" && r.entityId && <a href={"?program=" + encodeURIComponent(r.entityId)}>Deschide fișa <ArrowRight size={14} /></a>}</li>
                )}</ul> : <p className="gov-muted">Nu există încă o legătură confirmată.</p>}
                <h4>Răspuns și trasabilitate</h4>
                {selected.decision ? <div className="gov-decision"><CheckCircle2 size={18}/><div><strong>{decisionLabels[selected.decision.outcome]}</strong><p>{selected.decision.rationale}</p><small>Simulare locală · nu este o decizie a organizatorilor</small></div></div>
                  : <div className="gov-pending"><MessageSquareText size={18}/><div><strong>Niciun răspuns real publicat</strong><p>Într-o versiune operațională, un responsabil identificat ar publica motivul deciziei, sursele și următoarea revizuire.</p></div></div>}
                <div className="gov-actionline"><Button variant="outline" onClick={() => setShowDecision(v => !v)}>Simulează o decizie</Button><small>Nu modifică platforma evenimentului</small></div>
                {showDecision && <form onSubmit={submitDecision} className="gov-decision-form">
                  <label>Rezultat<select value={decisionOutcome} onChange={e => setDecisionOutcome(e.target.value as DecisionType)}><option value="accept">Acceptată pentru pasul următor</option><option value="defer">Amânată</option><option value="reject">Neprioritizată</option></select></label>
                  <label>De ce?<textarea rows={3} value={decisionReason} onChange={e => setDecisionReason(e.target.value)} placeholder="Argumente și informații lipsă..." /></label>
                  {decisionError && <p role="alert">{decisionError}</p>}<Button type="submit">Afișează răspunsul fictiv</Button>
                </form>}
              </>
            ) : <p>Selectează o propunere.</p>}
          </article>
        </div>
      </section>
      <section className="shell gov-contribute" aria-labelledby="gov-form-title">
        <div><span className="gov-kicker">TESTEAZĂ FLUXUL</span><h2 id="gov-form-title">Ce ar trebui schimbat?</h2><p>Formulează o nevoie concretă și rezultatul pe care vrei să îl vezi. Propunerea va apărea numai în această pagină, până la reîncărcare.</p>{programRef && <p className="gov-source-hint"><GitBranch size={16}/> Legată de fișa din M1: {sourceProgramId}</p>}</div>
        <form onSubmit={submit} className="gov-form">
          <label>Titlu<input value={form.title} maxLength={120} onChange={e => setForm(f => ({...f, title: e.target.value}))} required placeholder="De exemplu: lipsesc informații despre..." /></label>
          <label>Problema<textarea value={form.problem} onChange={e => setForm(f => ({...f, problem: e.target.value}))} required rows={3} placeholder="Ce nu funcționează pentru practicieni?" /></label>
          <label>Rezultatul dorit<textarea value={form.requestedOutcome} onChange={e => setForm(f => ({...f, requestedOutcome: e.target.value}))} required rows={3} placeholder="Ce răspuns sau schimbare ar fi utilă?" /></label>
          <label>Tipul propunerii<select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value as FeedbackType}))}>{FEEDBACK_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}</select></label>
          <div className="gov-form-footer"><p>Fără nume sau e-mail. Nu introduce date personale ori despre elevi.</p><Button type="submit"><Send size={16}/> Adaugă în demonstrație</Button></div>
          {formError && <p role="alert" className="gov-error">{formError}</p>}
          {success && <p role="status" className="gov-success">{success}</p>}
        </form>
      </section>
      <section className="shell gov-connections" aria-labelledby="gov-connections-title">
        <span className="gov-kicker">CONTRACT DE INTEGRARE</span><h2 id="gov-connections-title">Un ecosistem, șase module</h2>
        <p>{futureIntegration} Fiecare referință viitoare va păstra modulul, ID-ul sursei, proveniența și legătura. Nu presupunem că există un API public.</p>
        <div className="gov-module-grid">{MODULES.map(m => <div key={m.id}><span>M{m.id}</span><h3>{m.title}</h3><p>{m.bridge}</p><small>{m.id === 1 ? "Legătură demonstrată cu ID-urile catalogului local" : "Date de pe platformă: neimportate"}</small></div>)}</div>
        <p className="gov-footnote"><ClipboardList size={16} /> Ideile reale ale celorlalte module se vor importa doar dintr-un export verificabil, cu sursa și data capturii.</p>
      </section>
    </div>
  )
}
