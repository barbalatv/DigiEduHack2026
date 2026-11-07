import type { Program } from "../lib/programs"

export const programs: Program[] = [
  {
    id: "digiprof-a-b",
    title: "DigiProf — competențe digitale, nivelurile A și B",
    organizer: "MEC · UPSC · Clasa Viitorului",
    topic: "Competențe digitale",
    audience: [
      "Cadre didactice",
      "Educație timpurie",
      "Învățământ primar",
      "Gimnaziu și liceu",
    ],
    languages: [],
    format: null,
    cost: "Gratuit",
    duration: null,
    certificate:
      "Pregătire pentru certificarea competențelor digitale; testarea este separată",
    registrationDeadline: "2026-10-30",
    coursePeriod: null,
    verifiedAt: "2026-11-07",
    demo: false,
    officialUrl:
      "https://www.mec.gov.md/ro/content/mec-invita-cadrele-didactice-sa-se-inscrie-la-programele-gratuite-de-formare-competentelor",
    sourceTitle: "MEC · Anunț din 13 octombrie 2026",
    description:
      "Formare în competențe digitale pentru cadrele didactice din Republica Moldova, bazată pe cadrul european DigCompEdu.",
    conditions: [
      "Se adresează cadrelor didactice din învățământul preșcolar, primar, gimnazial și liceal.",
      "Anunțul indică formulare distincte în funcție de nivelul de învățământ.",
    ],
    selfCheck: [
      {
        id: "teaching-level",
        question:
          "Ești cadru didactic în învățământul preșcolar, primar, gimnazial sau liceal din Republica Moldova?",
        evidence:
          "Publicul indicat de MEC cuprinde cadrele didactice din aceste patru niveluri din Republica Moldova.",
        sourceSection:
          "Paragraful introductiv · publicul programelor DigiProf A și B",
      },
    ],
    nextStep:
      "Consultă anunțul MEC și solicită confirmarea unei eventuale prelungiri înainte de completarea formularului corespunzător nivelului tău de învățământ.",
    caveat:
      "Limba, formatul și perioada cursului nu sunt precizate în anunț. Finalizarea formării nu este echivalentă cu obținerea automată a unui certificat de competențe digitale.",
  },
  {
    id: "curriculum-disciplinar",
    title: "Implementarea noului curriculum disciplinar",
    organizer: "Ministerul Educației și Cercetării",
    topic: "Curriculum și didactică",
    audience: ["Cadre didactice", "Manageri școlari"],
    languages: [],
    format: "Online",
    cost: null,
    duration: "16 ore",
    certificate: "Certificare la parcurgerea integrală; tipul nu este precizat",
    registrationDeadline: "2026-10-30",
    coursePeriod: { start: "2026-11", end: "2026-12" },
    verifiedAt: "2026-11-07",
    demo: false,
    officialUrl:
      "https://www.mec.gov.md/ro/content/formarea-cadrelor-didactice-pentru-implementarea-noului-curriculum-disciplinar",
    sourceTitle: "MEC · Anunț din 22 octombrie 2026",
    description:
      "Ateliere online în regim asincron despre arhitectura curriculară și schimbările conceptuale și metodologice ale noului curriculum disciplinar.",
    conditions: [
      "Pentru cadrele didactice și de conducere vizate de noul curriculum.",
      "Anunțul precizează participarea obligatorie pentru cadrele vizate.",
      "Certificarea presupune parcurgerea integrală a formării.",
    ],
    nextStep:
      "Citește anunțul MEC și confirmă posibilitatea înscrierii după termen. Calendarul detaliat urma să fie comunicat participanților prin e-mail.",
    caveat:
      "Noiembrie–decembrie reprezintă perioada formării, nu termenul de înscriere. Zilele exacte, limba și costul nu sunt precizate.",
  },
  {
    id: "upsc-informatica",
    title: "Informatică și tehnologii WEB — perfecționare",
    organizer: "UPSC · Centrul Formare Continuă și Leadership",
    topic: "Competențe digitale",
    audience: ["Cadre didactice"],
    languages: [],
    format: null,
    cost: null,
    duration: null,
    certificate: null,
    registrationDeadline: null,
    coursePeriod: { start: "2026-11-23", end: "2026-12-19" },
    verifiedAt: "2026-11-07",
    demo: false,
    officialUrl: "https://cfcl.upsc.md/inscriere-la-programe-de-perfectionare/",
    sourceTitle: "UPSC / CFCL · Lista programelor de perfecționare 2026",
    description:
      "Sesiunea din noiembrie–decembrie pentru disciplina „Informatica și tehnologii WEB”, listată în oferta de perfecționare UPSC.",
    conditions: [
      "Oferta este destinată perfecționării cadrelor didactice.",
      "Eligibilitatea detaliată și actele necesare trebuie confirmate cu CFCL.",
    ],
    nextStep:
      "Deschide lista UPSC, identifică disciplina și sesiunea 23.11–19.12.2026 și verifică instrucțiunile cu organizatorul înainte de înscriere.",
    caveat:
      "Datele afișate de UPSC sunt perioada cursului. Prezența unui link spre formular nu confirmă că înscrierea este deschisă. Nu deducem limba din limba paginii.",
  },
  {
    id: "inel-mentori",
    title: "Formarea mentorilor în leadership educațional",
    organizer: "INEL · MEC · UNICEF",
    topic: "Leadership și mentorat",
    audience: ["Manageri școlari", "Mentori"],
    languages: [],
    format: null,
    cost: null,
    duration: null,
    certificate: null,
    registrationDeadline: "2026-06-30",
    coursePeriod: null,
    verifiedAt: "2026-11-07",
    demo: false,
    officialUrl: "https://inel.md/ro/anunturi/apel-de-inscriere",
    sourceTitle: "INEL · Apel din 11 iunie 2026",
    description:
      "Apel pentru constituirea unei rețele de mentori care sprijină directorii aflați la început de carieră managerială. Exemplu istoric de selecție cu criterii publicate.",
    conditions: [
      "Minimum 5 ani de experiență managerială în educație.",
      "Disponibilitate pentru participare integrală și activități ulterioare de mentorat.",
      "Motivație pentru rolul de mentor. Selecția include analiza dosarului și interviu.",
    ],
    selfCheck: [
      {
        id: "management-experience",
        question: "Ai minimum 5 ani de experiență managerială în educație?",
        evidence:
          "INEL indică minimum cinci ani de experiență managerială în educație.",
        sourceSection: "Criterii de selecție · punctul 1",
      },
      {
        id: "full-participation",
        question:
          "Ești disponibil(ă) să participi integral la activitățile programului?",
        evidence:
          "Participarea integrală la activitățile programului este un criteriu publicat.",
        sourceSection: "Criterii de selecție · punctul 2",
      },
      {
        id: "mentor-motivation",
        question:
          "Ești motivat(ă) să îți asumi rolul de mentor în leadership educațional?",
        evidence:
          "Motivația pentru asumarea rolului de mentor în leadership este un criteriu publicat.",
        sourceSection: "Criterii de selecție · punctul 3",
      },
    ],
    nextStep:
      "Verifică apelul INEL și contactează organizatorul pentru informații despre o eventuală ediție viitoare; nu presupune că apelul istoric mai primește candidaturi.",
    caveat:
      "Apel istoric. Nu este confirmată o prelungire. Perioada, costul, limba, formatul și certificatul nu sunt precizate în această sursă.",
  },
  {
    id: "demo-incluziune",
    title: "O clasă pentru fiecare copil",
    organizer: "Organizator fictiv · Atelier Edu",
    topic: "Educație incluzivă",
    audience: ["Cadre didactice", "Învățământ primar"],
    languages: ["Română"],
    format: "Hibrid",
    cost: "Gratuit · exemplu",
    duration: "12 ore · exemplu",
    certificate: "Certificat de participare fictiv",
    registrationDeadline: null,
    coursePeriod: null,
    verifiedAt: null,
    officialUrl: null,
    sourceTitle: null,
    demo: true,
    description:
      "Exemplu fictiv de atelier despre adaptarea activităților la nevoile diferite ale elevilor. Toate informațiile sunt demonstrative.",
    conditions: [
      "Scenariu fictiv pentru cadre didactice din învățământul primar.",
      "Nu există înscriere sau ofertă reală asociată acestei fișe.",
    ],
    nextStep:
      "Revino în catalog și alege un anunț real pentru a consulta sursa organizatorului.",
    caveat:
      "Acest exemplu testează filtrele și afișarea datelor necunoscute. Nu reprezintă o oportunitate de formare.",
  },
  {
    id: "demo-evaluare",
    title: "Evaluare formativă, pas cu pas",
    organizer: "Organizator fictiv · Laborator Didactic",
    topic: "Curriculum și didactică",
    audience: ["Cadre didactice", "Gimnaziu și liceu"],
    languages: ["Rusă"],
    format: "Cu prezență fizică",
    cost: "250 MDL · exemplu",
    duration: "8 ore · exemplu",
    certificate: "Fără certificat · exemplu",
    registrationDeadline: null,
    coursePeriod: null,
    verifiedAt: null,
    officialUrl: null,
    sourceTitle: null,
    demo: true,
    description:
      "Exemplu fictiv de atelier despre feedback și evaluare formativă. Limba, formatul și costul servesc exclusiv testării filtrelor.",
    conditions: [
      "Scenariu fictiv pentru profesori de gimnaziu și liceu.",
      "Nu există înscriere sau ofertă reală asociată acestei fișe.",
    ],
    nextStep:
      "Revino în catalog și alege un anunț real pentru a consulta sursa organizatorului.",
    caveat:
      "Date demonstrative, fără sursă oficială. Nu efectua plăți și nu căuta un formular de înscriere pentru acest exemplu.",
  },
]
