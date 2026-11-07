import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react"
import GovernancePage from "./GovernancePage"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  GraduationCap,
  Info,
  Languages,
  MapPin,
  MessageSquareText,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  coursePeriod,
  catalogParams,
  emptyFilters,
  filterPrograms,
  formatDate,
  registrationStatus,
  programParams,
  relatedPrograms,
  relatedSearchParams,
  selfCheckSummary,
  NO_CONFIRMED_ALTERNATIVE,
  UNKNOWN,
  type Answer,
  type Filters,
  type Program,
} from "@/lib/programs"

const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback)
  return () => window.removeEventListener("popstate", callback)
}
const locationSnapshot = () => window.location.search

function navigate(params: URLSearchParams) {
  window.history.pushState(
    null,
    "",
    `${window.location.pathname}${params.size ? `?${params}` : ""}`
  )
  window.dispatchEvent(new PopStateEvent("popstate"))
}

function Status({ program }: { program: Program }) {
  const status = registrationStatus(program)
  return (
    <span className={`status status-${status.kind}`}>
      <span />
      {status.label}
    </span>
  )
}

function ExternalSource({
  program,
  compact = false,
}: {
  program: Program
  compact?: boolean
}) {
  if (!program.officialUrl)
    return (
      <span className="demo-source">Fără sursă oficială · exemplu fictiv</span>
    )
  return (
    <a
      className={compact ? "source-link" : "organizer-link"}
      href={program.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`La organizator: ${program.title} (filă nouă)`}
    >
      {compact ? (
        <>
          {new URL(program.officialUrl).hostname.replace("www.", "")} · la
          organizator
        </>
      ) : (
        "Consultă sursa organizatorului"
      )}
      <ArrowUpRight size={compact ? 15 : 19} aria-hidden="true" />
    </a>
  )
}

function ProgramCard({
  program,
  open,
}: {
  program: Program
  open: (id: string) => void
}) {
  const params = programParams(window.location.search, program.id)
  return (
    <article className={`program-card ${program.demo ? "is-demo" : ""}`}>
      <div className="card-top">
        <span
          className={`topic-mark topic-${program.topic.startsWith("Competențe") ? "digital" : program.topic.startsWith("Leadership") ? "leadership" : program.topic.startsWith("Educație") ? "inclusion" : "curriculum"}`}
        >
          <BookOpen size={21} aria-hidden="true" />
        </span>
        <Status program={program} />
      </div>
      <p className="eyebrow card-topic">{program.topic}</p>
      <h3>
        <a
          href={`?${params}`}
          onClick={(event) => {
            if (
              !event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey &&
              !event.altKey &&
              event.button === 0
            ) {
              event.preventDefault()
              open(program.id)
            }
          }}
        >
          {program.title}
        </a>
      </h3>
      <p className="organizer">{program.organizer}</p>
      <p className="audience">
        <Users size={15} aria-hidden="true" />
        {program.audience.join(" · ")}
      </p>
      <div className="tags">
        <span>
          <Languages size={14} aria-hidden="true" />
          {program.languages.join(", ") || "Limbă neprecizată"}
        </span>
        <span>
          <MapPin size={14} aria-hidden="true" />
          {program.format || "Format neprecizat"}
        </span>
      </div>
      <dl className="date-box">
        <div>
          <dt>
            <CalendarDays size={15} aria-hidden="true" />
            Termen de înscriere
          </dt>
          <dd>{formatDate(program.registrationDeadline)}</dd>
        </div>
        <div>
          <dt>
            <Clock3 size={15} aria-hidden="true" />
            Perioada formării
          </dt>
          <dd>{coursePeriod(program)}</dd>
        </div>
      </dl>
      <dl className="quick-facts">
        <div>
          <dt>Cost</dt>
          <dd>{program.cost || UNKNOWN}</dd>
        </div>
        <div>
          <dt>Durată</dt>
          <dd>{program.duration || UNKNOWN}</dd>
        </div>
        <div className="certificate">
          <dt>Certificat</dt>
          <dd>{program.certificate || UNKNOWN}</dd>
        </div>
      </dl>
      <div className="card-bottom">
        <span>
          {program.verifiedAt
            ? `Verificat ${formatDate(program.verifiedAt)}`
            : "Date demonstrative · neverificate"}
        </span>
        <a
          className="detail-link"
          href={`?${params}`}
          aria-label={`Vezi detalii: ${program.title}`}
          onClick={(event) => {
            if (
              !event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey &&
              !event.altKey &&
              event.button === 0
            ) {
              event.preventDefault()
              open(program.id)
            }
          }}
        >
          Detalii <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <ExternalSource program={program} compact />
    </article>
  )
}

function FilterSelect({
  label,
  value,
  values,
  onChange,
}: {
  label: string
  value: string
  values: string[]
  onChange: (value: string) => void
}) {
  const labelId = useId()
  const items = [
    { label: "Toate", value: "" },
    ...values.map((item) => ({ label: item, value: item })),
  ]
  return (
    <div className="filter-field">
      <span id={labelId}>{label}</span>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onChange(next || "")}
      >
        <SelectTrigger aria-labelledby={labelId} className="filter-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {items.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function SelfCheck({ program }: { program: Program }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const formId = useId()
  const checks = program.selfCheck || []
  if (program.demo) return null
  return (
    <section
      className="detail-section self-check"
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`}>Fișa „Mi se potrivește?”</h2>
      <p>
        Autoverificare opțională, fără cont. Răspunsurile rămân doar în această
        fișă, în memoria paginii; nu sunt trimise sau salvate și se șterg la
        părăsirea fișei ori reîncărcare.
      </p>
      {checks.map((check) => (
        <fieldset key={check.id}>
          <legend>{check.question}</legend>
          <p>
            {check.evidence}{" "}
            <a
              href={program.officialUrl!}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sursa oficială (filă nouă): {check.sourceSection}
            </a>
          </p>
          <div className="answer-options">
            {(
              [
                ["yes", "Da"],
                ["no", "Nu"],
                ["unknown", "Nu știu"],
              ] as const
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`${formId}-${check.id}`}
                  value={value}
                  checked={answers[check.id] === value}
                  onChange={() =>
                    setAnswers((current) => ({ ...current, [check.id]: value }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <p className="check-summary" role="status" aria-live="polite">
        {selfCheckSummary(program, answers)}
      </p>
      <p>
        <strong>De clarificat:</strong>{" "}
        {checks.length
          ? "Aceasta este doar o verificare a criteriilor enumerate, nu o decizie de eligibilitate sau de admitere. Confirmă celelalte condiții și disponibilitatea direct la organizator."
          : "Condițiile detaliate nu sunt suficiente pentru o autoverificare. Consultă cerințele publicate mai jos și solicită clarificări la organizator."}
      </p>
      {program.id === "inel-mentori" && (
        <p>
          Apel istoric: selecția include dosar și interviu. Consultă și
          secțiunea „Cine poate aplica?”; răspunsurile nu înlocuiesc evaluarea
          INEL.
        </p>
      )}
      <ExternalSource program={program} />
      {checks.length > 0 && (
        <Button variant="outline" onClick={() => setAnswers({})}>
          Șterge răspunsurile
        </Button>
      )}
    </section>
  )
}

function ShareCard({ program }: { program: Program }) {
  const [feedback, setFeedback] = useState("")
  const [manual, setManual] = useState(false)
  const shareId = useId()
  // Share only the stable card URL, never search terms or self-check answers.
  const link = new URL(
    `?${programParams("", program.id)}`,
    window.location.href
  ).href
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setManual(false)
      setFeedback(
        "Link copiat. Fișa include sursa oficială și limitele verificării."
      )
    } catch {
      setManual(true)
      setFeedback(
        "Copierea automată nu este disponibilă. Selectează și copiază manual linkul de mai jos."
      )
    }
  }
  return (
    <div className="share-card">
      <Button variant="outline" onClick={copy}>
        Copiază linkul fișei
      </Button>
      <p role="status" aria-live="polite">
        {feedback}
      </p>
      {manual && (
        <label htmlFor={shareId}>
          Linkul fișei
          <Input
            id={shareId}
            readOnly
            value={link}
            onFocus={(event) => event.target.select()}
          />
        </label>
      )}
    </div>
  )
}

function PlanB({
  program,
  programs,
  open,
}: {
  program: Program
  programs: Program[]
  open: (id: string) => void
}) {
  if (registrationStatus(program).kind !== "past") return null
  const related = relatedPrograms(program, programs)
  return (
    <section className="detail-section plan-b">
      <h2>Plan B după termen</h2>
      <p>
        {NO_CONFIRMED_ALTERNATIVE}. Termenul publicat a trecut; o prelungire nu
        este confirmată.
      </p>
      <p>
        Poți compara aceste anunțuri cu sursă consultată. Legătura este
        editorială și nu confirmă înscrieri deschise.
      </p>
      {related.length ? (
        <ul className="related-list">
          {related.map(({ program: candidate, sameTopic, audiences }) => (
            <li key={candidate.id}>
              <a
                href={`?${programParams(window.location.search, candidate.id)}`}
                onClick={(event) => {
                  if (
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.shiftKey &&
                    !event.altKey &&
                    event.button === 0
                  ) {
                    event.preventDefault()
                    open(candidate.id)
                  }
                }}
              >
                {candidate.title} <ArrowRight size={16} aria-hidden="true" />
              </a>
              <p>
                Legătură:{" "}
                {sameTopic
                  ? `aceeași temă — ${candidate.topic}`
                  : `public comun — ${audiences.join(", ")}`}
                .
              </p>
              <p>
                Diferență:{" "}
                {sameTopic
                  ? `altă ofertă, de la ${candidate.organizer}`
                  : `altă temă — ${candidate.topic}`}
                . Perioada: {coursePeriod(candidate)}. Termen:{" "}
                {formatDate(candidate.registrationDeadline)}.
              </p>
              <Status program={candidate} />
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Nu avem alte anunțuri reale cu aceeași temă sau același public în
          catalogul pilot.
        </p>
      )}
      <a
        className="organizer-link"
        href={`?${relatedSearchParams(program)}#catalog`}
      >
        Caută aceeași temă în catalog
      </a>
      <p>
        Filtrul de temă include doar anunțuri reale și înlocuiește celelalte
        filtre. Pentru o eventuală prelungire sau ediție viitoare, consultă
        organizatorul ofertei inițiale.
      </p>
      <ExternalSource program={program} />
    </section>
  )
}

function Detail({
  program,
  programs,
  back,
  open,
}: {
  program: Program
  programs: Program[]
  back: () => void
  open: (id: string) => void
}) {
  const status = registrationStatus(program)
  return (
    <div className="detail-page shell">
      <Button variant="ghost" onClick={back} className="back-button">
        <ArrowLeft />
        Înapoi la catalog
      </Button>
      <article className="detail-layout">
        <div className="detail-summary">
          <div className="detail-badges">
            <span className="eyebrow">{program.topic}</span>
            <Status program={program} />
          </div>
          <h1>{program.title}</h1>
          <p className="detail-organizer">{program.organizer}</p>
          <p className="detail-description">{program.description}</p>
          {!program.demo && <ShareCard program={program} />}
          {program.demo && (
            <div className="notice demo-notice">
              <Info aria-hidden="true" />
              <p>
                <strong>Program demonstrativ.</strong> Organizatorul și oferta
                sunt fictive. Nu există înscriere pentru acest exemplu.
              </p>
            </div>
          )}
        </div>
        <aside className="detail-sidebar">
          <div className="next-step">
            <p className="eyebrow">Înainte de înscriere</p>
            <h2>Datele, pe înțeles</h2>
            <dl className="date-box">
              <div>
                <dt>Termen de înscriere</dt>
                <dd>{formatDate(program.registrationDeadline)}</dd>
              </div>
              <div>
                <dt>Perioada formării</dt>
                <dd>{coursePeriod(program)}</dd>
              </div>
            </dl>
            <div className={`notice notice-${status.kind}`}>
              <CircleHelp aria-hidden="true" />
              <p>{status.note}</p>
            </div>
            <h3>Următorul pas</h3>
            <p>{program.nextStep}</p>
            {program.officialUrl ? (
              <ExternalSource program={program} />
            ) : (
              <Button onClick={back}>
                Explorează anunțurile reale <ArrowRight />
              </Button>
            )}
            <small>
              {program.officialUrl
                ? "Vei deschide site-ul organizatorului într-o filă nouă. Puntea Edu MD nu colectează înscrieri."
                : "Acest exemplu nu are un site de înscriere."}
            </small>
          </div>
        </aside>
        <SelfCheck program={program} />
        <section className="detail-section">
          <h2>
            <Users aria-hidden="true" />
            Pentru cine este programul?
          </h2>
          <div className="tags">
            {program.audience.map((audience) => (
              <span key={audience}>{audience}</span>
            ))}
          </div>
          <ul className="conditions">
            {program.conditions.map((condition) => (
              <li key={condition}>
                <Check size={17} aria-hidden="true" />
                {condition}
              </li>
            ))}
          </ul>
        </section>
        <section className="detail-section">
          <h2>
            <BookOpen aria-hidden="true" />
            Ce trebuie să știi
          </h2>
          <dl className="detail-facts">
            <div>
              <dt>Limba de instruire</dt>
              <dd>{program.languages.join(", ") || UNKNOWN}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{program.format || UNKNOWN}</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>{program.cost || UNKNOWN}</dd>
            </div>
            <div>
              <dt>Durată</dt>
              <dd>{program.duration || UNKNOWN}</dd>
            </div>
            <div>
              <dt>Tip de certificat</dt>
              <dd>{program.certificate || UNKNOWN}</dd>
            </div>
          </dl>
        </section>
        <PlanB program={program} programs={programs} open={open} />
        {!program.demo && <section className="detail-section">
          <h2><MessageSquareText aria-hidden="true" /> Ce lipsește din această ofertă?</h2>
          <p>Testează cum o nevoie concretă din catalog ar putea deveni o propunere și un răspuns motivat prin Modulul 6. Acesta este doar un exercițiu local; nu trimite feedback organizatorului.</p>
          <a className="organizer-link" href={"?view=guvernanta&sourceProgramId=" + encodeURIComponent(program.id)}>Testează fluxul de feedback <ArrowRight size={17} aria-hidden="true" /></a>
        </section>}
        <section className="detail-section">
          <h2>
            <ShieldCheck aria-hidden="true" />
            Surse și limitele verificării
          </h2>
          <p>{program.caveat}</p>
          {program.verifiedAt ? (
            <div className="source-record">
              <span>Consultat la {formatDate(program.verifiedAt)}</span>
              <ExternalSource program={program} />
              <p>{program.sourceTitle}</p>
              <p className="full-url">{program.officialUrl}</p>
            </div>
          ) : (
            <p className="source-record">
              Fișă demonstrativă. Nu a fost verificată la un organizator.
            </p>
          )}
        </section>
      </article>
    </div>
  )
}

export default function App() {
  const search = useSyncExternalStore(subscribe, locationSnapshot)
  const params = new URLSearchParams(search)
  const selected = params.get("program")
  const inGovernance = params.get("view") === "guvernanta"
  const filters: Filters = {
    q: params.get("q") || "",
    language: params.get("language") || "",
    format: params.get("format") || "",
    audience: params.get("audience") || "",
    topic: params.get("topic") || "",
    realOnly: params.get("realOnly") === "1",
  }
  const [programs, setPrograms] = useState<Program[] | null>(null)
  const [failed, setFailed] = useState(false)
  const main = useRef<HTMLElement>(null)
  const previousSelection = useRef(selected)
  const catalogScroll = useRef(0)
  useEffect(() => {
    let active = true
    import("./data/programs")
      .then((data) => {
        if (active) setPrograms(data.programs)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [])
  useEffect(() => {
    const program = programs?.find((item) => item.id === selected)
    document.title = `${inGovernance ? "Feedback și guvernanță" : program ? program.title : selected ? "Program negăsit" : "Formări pentru profesori"} | Puntea Edu MD`
  }, [selected, programs, inGovernance])
  useEffect(() => {
    if (selected !== previousSelection.current) {
      main.current?.focus({ preventScroll: true })
      window.scrollTo({
        top: selected ? 0 : catalogScroll.current,
        behavior: "instant",
      })
      previousSelection.current = selected
    }
  }, [selected])
  const update = (key: keyof Filters, value: string | boolean) => {
    const next = new URLSearchParams(window.location.search)
    if (value) next.set(key, value === true ? "1" : (value as string))
    else next.delete(key)
    // Filter typing replaces the current entry; opening a program creates a Back destination.
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${next.size ? `?${next}` : ""}`
    )
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  const open = (id: string) => {
    if (!selected) catalogScroll.current = window.scrollY
    const next = programParams(search, id)
    navigate(next)
  }
  const back = () => {
    const next = catalogParams(search)
    navigate(next)
    main.current?.focus()
  }
  const reset = () => {
    const next = new URLSearchParams(search)
    Object.keys(emptyFilters).forEach((key) => next.delete(key))
    navigate(next)
  }
  const results = programs ? filterPrograms(programs, filters) : []
  const active = Object.values(filters).some(Boolean)
  const current = programs?.find((program) => program.id === selected)
  const topics = [...new Set(programs?.map((program) => program.topic))]
  return (
    <>
      <a href="#continut" className="skip-link">
        Sari la conținut
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a
            className="brand"
            href="/"
            onClick={(event) => {
              if (
                !event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey &&
                !event.altKey
              ) {
                event.preventDefault()
                navigate(new URLSearchParams())
              }
            }}
            aria-label="Puntea Edu MD — catalog"
          >
            <span className="brand-icon">
              <Radar size={25} aria-hidden="true" />
            </span>
            Puntea<span className="brand-light">Edu MD</span>
            <span className="beta">PROTOTIP</span>
          </a>
          <nav aria-label="Navigare principală">
            <a
              className={!selected && !inGovernance ? "nav-active" : ""}
              href="/"
              onClick={(event) => {
                event.preventDefault()
                back()
              }}
            >
              Catalog{" "}
              <span className="nav-count">{programs?.length ?? "…"}</span>
            </a>
            <a className={inGovernance ? "nav-active" : ""} href="?view=guvernanta">
              Feedback <span className="nav-count">M6</span>
            </a>
            <a href="#cum-verificam">
              Cum verificăm <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
          <span className="header-note">
            <span />
            Pentru profesorii din Moldova
          </span>
        </div>
      </header>
      <main id="continut" ref={main} tabIndex={-1}>
        {inGovernance ? (
          <GovernancePage sourceProgramId={params.get("sourceProgramId")} />
        ) : failed ? (
          <div className="shell empty-state" role="alert">
            <CircleHelp />
            <h1>Catalogul nu a putut fi încărcat</h1>
            <p>Verifică conexiunea și încearcă din nou.</p>
            <Button onClick={() => window.location.reload()}>
              Reîncarcă pagina
            </Button>
          </div>
        ) : !programs ? (
          <div className="shell loading-state" role="status" aria-live="polite">
            <p>Se încarcă programele de formare…</p>
            <div className="program-grid">
              {[1, 2, 3, 4].map((key) => (
                <Skeleton className="loading-card" key={key} />
              ))}
            </div>
          </div>
        ) : selected ? (
          current ? (
            <Detail
              key={current.id}
              program={current}
              programs={programs}
              back={back}
              open={open}
            />
          ) : (
            <div className="shell empty-state">
              <Search />
              <h1>Programul nu a fost găsit</h1>
              <p>Linkul poate fi incomplet. Explorează ofertele din catalog.</p>
              <Button onClick={back}>
                <ArrowLeft />
                Înapoi la catalog
              </Button>
            </div>
          )
        ) : (
          <>
            <section className="hero shell">
              <div className="hero-copy">
                <p className="eyebrow">
                  <span className="tiny-line" />
                  Formări pentru profesori / Radar Edu
                </p>
                <h1>
                  Următorul pas în
                  <br />
                  educația <span>ta.</span>
                </h1>
                <p className="hero-description">
                  Puntea Edu MD · catalog pilot de oportunități cu sursă, termen
                  și următorul pas. Găsește o formare, verifică cui se adresează
                  și compară termenul publicat cu perioada cursului.
                </p>
                <a href="#catalog" className="hero-cta">
                  Descoperă programele{" "}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a
                  className="demo-path"
                  href="?program=digiprof-a-b"
                  onClick={(event) => {
                    if (
                      !event.ctrlKey &&
                      !event.metaKey &&
                      !event.shiftKey &&
                      !event.altKey
                    ) {
                      event.preventDefault()
                      open("digiprof-a-b")
                    }
                  }}
                >
                  Încearcă fișa „Mi se potrivește?” →
                </a>
                <div className="hero-proof">
                  <ShieldCheck size={17} aria-hidden="true" />
                  <span>Surse la vedere</span>
                  <span className="proof-dot">·</span>
                  <span>Date fără presupuneri</span>
                </div>
              </div>
              <div className="radar-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <div className="radar-axis axis-h" />
                <div className="radar-axis axis-v" />
                <div className="radar-sweep" />
                <span className="radar-center">
                  <GraduationCap size={39} strokeWidth={1.6} />
                </span>
                <span className="orbit-dot dot-one" />
                <span className="orbit-dot dot-two" />
                <span className="art-label art-digital">
                  <span>
                    <Sparkles size={17} />
                  </span>
                  Competențe digitale
                </span>
                <span className="art-label art-growth">
                  <span>
                    <BookOpen size={17} />
                  </span>
                  Idei noi pentru clasă
                </span>
                <span className="radar-caption">
                  Oportunități pentru parcursul tău
                </span>
              </div>
            </section>
            <section
              className="catalog shell"
              id="catalog"
              aria-labelledby="catalog-title"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Explorează. Compară. Alege.</p>
                  <h2 id="catalog-title">
                    Programe de formare<span className="heading-dot">.</span>
                  </h2>
                </div>
                <span className="catalog-edition">
                  Ediție pilot <span>/</span> 2026
                </span>
              </div>
              <div className="filter-panel">
                <div className="search-row">
                  <label className="search-box">
                    <Search size={21} aria-hidden="true" />
                    <span className="sr-only">Caută după titlu sau temă</span>
                    <Input
                      type="search"
                      placeholder="Ce ai vrea să înveți? Caută o temă sau un program…"
                      value={filters.q}
                      onChange={(event) => update("q", event.target.value)}
                    />
                  </label>
                  <span className="filter-hint">
                    <SlidersHorizontal size={17} aria-hidden="true" />
                    Alege ce ți se potrivește
                  </span>
                </div>
                <div className="filter-row">
                  <FilterSelect
                    label="Limba de instruire"
                    value={filters.language}
                    values={["Română", "Rusă"]}
                    onChange={(value) => update("language", value)}
                  />
                  <FilterSelect
                    label="Format"
                    value={filters.format}
                    values={["Online", "Hibrid", "Cu prezență fizică"]}
                    onChange={(value) => update("format", value)}
                  />
                  <FilterSelect
                    label="Public-țintă"
                    value={filters.audience}
                    values={[
                      "Cadre didactice",
                      "Educație timpurie",
                      "Învățământ primar",
                      "Gimnaziu și liceu",
                      "Manageri școlari",
                      "Mentori",
                    ]}
                    onChange={(value) => update("audience", value)}
                  />
                  <label className="real-toggle">
                    <input
                      type="checkbox"
                      checked={filters.realOnly}
                      onChange={(event) =>
                        update("realOnly", event.target.checked)
                      }
                    />
                    <span>Doar anunțuri reale</span>
                  </label>
                </div>
              </div>
              <div className="topic-filters" aria-label="Filtre după temă">
                <button
                  className={!filters.topic ? "selected" : ""}
                  aria-pressed={!filters.topic}
                  onClick={() => update("topic", "")}
                >
                  Toate temele
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className={filters.topic === topic ? "selected" : ""}
                    aria-pressed={filters.topic === topic}
                    onClick={() =>
                      update("topic", filters.topic === topic ? "" : topic)
                    }
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <div className="catalog-notice">
                <Info size={18} aria-hidden="true" />
                <p>
                  <strong>Un catalog mic, cu informații clare.</strong>{" "}
                  {programs.filter((p) => !p.demo).length} anunțuri reale și{" "}
                  {programs.filter((p) => p.demo).length} exemple demonstrative,
                  marcate separat. Un termen depășit nu confirmă închiderea
                  înscrierii.
                </p>
              </div>
              <div className="results-line">
                <p role="status" aria-live="polite">
                  <strong>{results.length}</strong>{" "}
                  {results.length === 1 ? "program găsit" : "programe găsite"}
                  {active ? " pentru selecția ta" : " în catalog"}
                </p>
                {active && (
                  <Button
                    variant="ghost"
                    onClick={reset}
                    className="reset-button"
                  >
                    <X size={15} />
                    Resetează filtrele
                  </Button>
                )}
              </div>
              {results.length ? (
                <div className="program-grid">
                  {results.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      open={open}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">
                    <Search size={30} />
                  </span>
                  <h3>Niciun program pentru această căutare</h3>
                  <p>
                    Încearcă un termen mai general sau elimină câteva filtre.
                    <br />
                    Programele cu limbă ori format neprecizat nu apar în
                    filtrele respective.
                  </p>
                  <Button onClick={reset}>
                    Resetează căutarea <ArrowRight />
                  </Button>
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <section id="cum-verificam" className="method-section shell">
        <div className="method-intro">
          <span className="method-icon">
            <ShieldCheck size={27} />
          </span>
          <p className="eyebrow">Încredere prin transparență</p>
          <h2>
            Mai puține presupuneri.
            <br />
            Mai multă claritate.
          </h2>
          <p>
            Puntea Edu MD te ajută să compari anunțuri. Organizatorul confirmă
            condițiile finale și disponibilitatea locurilor.
          </p>
        </div>
        <div className="method-items">
          <div>
            <span>01</span>
            <div>
              <h3>Pornim de la sursă</h3>
              <p>
                Fișele reale au un anunț oficial și data consultării. Nu suntem
                un registru complet al ofertelor.
              </p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Separăm datele</h3>
              <p>
                Termenul de înscriere și perioada formării sunt câmpuri
                distincte. Ce nu știm rămâne neprecizat.
              </p>
            </div>
          </div>
          <div>
            <span>03</span>
            <div>
              <h3>Verifici înainte de a aplica</h3>
              <p>
                Un anunț accesibil sau un formular existent nu înseamnă
                înscriere deschisă. Consultă organizatorul.
              </p>
            </div>
          </div>
          <div>
            <span>04</span>
            <div>
              <h3>Următoarea etapă · planuri</h3>
              <p>
                Catalogul de formări / Radar Edu este primul pilot.
                Abonamentele, alertele, locurile disponibile, publicarea de
                către furnizori și legăturile cu modulele M2–M6 sunt planuri;
                integrările nu sunt confirmate.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="site-footer shell">
        <a className="brand footer-brand" href="#continut">
          <Radar size={23} aria-hidden="true" />
          Puntea<span className="brand-light">Edu MD</span>
        </a>
        <p>Un prim pas spre oportunități mai ușor de găsit.</p>
        <span>DigiEduHack Moldova · Prototip 2026</span>
        <span className="external-note">
          <ExternalLink size={13} aria-hidden="true" />
          Linkurile către organizatori se deschid în filă nouă.
        </span>
      </footer>
    </>
  )
}
