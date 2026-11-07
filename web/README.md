# Puntea Edu MD V1 · catalog pilot de formări

Catalog de oportunități cu sursă, termen și următorul pas. **Formări pentru profesori / Radar Edu** este primul pilot din Puntea Edu MD, construit peste catalogul din PR #1 (deja integrat în `main`). PR #2 continuă aceeași aplicație React + Vite + TypeScript. Interfață în română; componentele shadcn/ui folosesc în continuare **Base UI**.

Consolidarea ideii Radar Edu nu înseamnă respingerea implementării. Cele 18 idei finale sunt direcția produsului, nu 18 funcții deja livrate. Cele 11 legături intermodulare rămân neconfirmate; nu prezentăm integrări active. „Caută după problemă” rămâne în dezvoltare, fără promisiune în această versiune.

## Rulare

Din `web/`, cu Node.js 22.18+ și pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm preview
```

Testele folosesc runnerul Node și striparea nativă a tipurilor TypeScript, fără dependențe noi. `build` verifică și TypeScript.

## Parcursul principal

Caută după titlu, temă sau organizator (cu sau fără diacritice). Combină filtrele de limbă, format și public-țintă, o temă sau doar anunțurile reale. Deschide titlul ori „Detalii”, consultă condițiile publicate, termenul și perioada formării, apoi sursa organizatorului într-o filă nouă. Revenirea în catalog păstrează filtrele; Back din browser funcționează.

Pe DigiProf și INEL există **Fișa „Mi se potrivește?”**: răspunsuri opționale Da / Nu / Nu știu, cu sursă oficială, secțiune și reformulare pentru fiecare criteriu. Un Nu prevalează; răspunsurile lipsă / Nu știu necesită confirmare; toate Da înseamnă doar „Criterii cunoscute îndeplinite”. Nu este o decizie de eligibilitate sau admitere. INEL are și alte cerințe calitative, dosar și interviu, explicate în fișă. Celelalte două anunțuri reale afișează „De clarificat”, fără criterii inventate.

Răspunsurile există doar în starea React a fișei, fără backend, storage, URL sau telemetrie. Se șterg la schimbarea fișei, revenirea în catalog, refresh ori prin „Șterge răspunsurile”. Copierea distribuie doar URL-ul stabil al fișei (fără filtre și răspunsuri), cu mesaj de succes sau câmp selectabil pentru copiere manuală dacă browserul refuză clipboardul.

**Plan B după termen** apare exclusiv pentru un termen publicat depășit. Oferă până la două anunțuri reale cu sursă consultată, prioritizând tema comună, apoi publicul comun. Explică legătura și diferența; afișează separat termenul și perioada. Niciun anunț din pilot nu are înscriere curentă confirmată: această limită este explicită, inclusiv când există cursuri viitoare. Căutarea aceleiași teme este un link cu filtre în URL, fără salvare pe server; înlocuiește filtrele anterioare cu tema și „doar anunțuri reale”.

Filtrele sunt în query string. `/?program=curriculum-disciplinar` deschide direct fișa, inclusiv după refresh. Nu sunt necesare reguli de rescriere pentru rutele fișelor pe un host static; hostul trebuie să servească `web/dist/` la rădăcina site-ului.

Datele sunt încărcate asincron dintr-un modul local. Există skeleton de încărcare, stare fără rezultate, eroare cu reîncercare prin reîncărcarea paginii și stare pentru ID inexistent.

## Date și proveniență

Datele: `src/data/programs.ts`. Schema și regulile: `src/lib/programs.ts`. Sursele au fost citite din nou la **7 noiembrie 2026**. Data verificării înseamnă consultarea anunțului, nu confirmarea locurilor disponibile.

În PR #2 au fost recitite cele patru surse oficiale. Criteriul DigiProf provine din paragraful introductiv (cadre didactice din patru niveluri din Republica Moldova); cele trei întrebări INEL provin din „Criterii de selecție”, punctele 1–3. Nu s-a adăugat un program presupus deschis și nu s-a dedus disponibilitatea din formulare sau sesiuni viitoare.

| Fișă reală | Sursă oficială | Date confirmate |
| --- | --- | --- |
| DigiProf A și B | [MEC, 13.10.2026](https://www.mec.gov.md/ro/content/mec-invita-cadrele-didactice-sa-se-inscrie-la-programele-gratuite-de-formare-competentelor) | Publicul, gratuitatea, termenul 30.10.2026; pregătire pentru certificare, testare separată. |
| Noul curriculum disciplinar | [MEC, 22.10.2026](https://www.mec.gov.md/ro/content/formarea-cadrelor-didactice-pentru-implementarea-noului-curriculum-disciplinar) | Online asincron, 16 ore, noiembrie–decembrie 2026, termen 30.10.2026, certificare la parcurgere integrală. |
| Informatică și tehnologii WEB | [UPSC / CFCL, oferta 2026](https://cfcl.upsc.md/inscriere-la-programe-de-perfectionare/) | Disciplina și sesiunea 23.11–19.12.2026; termenul de înscriere este necunoscut. |
| Mentori în leadership educațional | [INEL, 11.06.2026](https://inel.md/ro/anunturi/apel-de-inscriere) | Apel istoric, criterii, minimum 5 ani experiență managerială, două etape de selecție, termen 30.06.2026. |

Temele și etichetele publicului sunt categorii editoriale; condițiile detaliate sunt în fișe. Nu deducem limba de instruire din limba paginii. Datele necunoscute sunt `null` / liste goale, afișate ca neprecizate. Filtrarea după o valoare cunoscută exclude fișele în care acel câmp este necunoscut.

**Două fișe sunt complet fictive:** „O clasă pentru fiecare copil” și „Evaluare formativă, pas cu pas”. Au organizatori fictivi și marcaj demonstrativ pe card și în detalii, fără dată de verificare, URL oficial sau înscriere. Permit testarea limbilor română/rusă și a formatelor hibrid/cu prezență fizică.

## Reguli și limite

- `registrationDeadline` este separat de `coursePeriod`. Precizia de lună nu inventează zile exacte.
- Termen trecut: „Termen publicat depășit”, fără afirmația „Închis”; prelungirea și acceptarea cererilor nu sunt confirmate.
- Termen necunoscut: „Termen neprecizat”. Termen viitor/curent: „Termen publicat”, fără promisiunea „Deschis”.
- Ziua curentă se calculează în `Europe/Chisinau`; afișarea datelor nu depinde de fusul browserului.
- Linkurile către organizatori sunt marcate și folosesc `noopener noreferrer`.

Rezultate și capturi: [qa/SMOKE.md](qa/SMOKE.md). Prototip static, date verificate manual, fără actualizare automată și fără a reprezenta un catalog național complet. Disponibilitatea înscrierii trebuie confirmată la organizator. Nu include autentificare, backend, AI, e-mail, administrare, parsare sau integrări M2–M6. `Modulul-1/` este neschimbat.

## Funcții livrate și etapa următoare

| Idee finală | Starea în acest pilot |
| --- | --- |
| Puntea Edu MD V1 / Radar Edu | Brand comun; catalogul de formări existent, fără rescriere |
| Fișa „Mi se potrivește?” | Autoverificare limitată la două surse cu criterii publicate; clarificări pentru restul |
| Plan B după termen | Anunțuri înrudite, diferențe explicate, filtru partajabil; zero promisiuni de înscriere |
| Calendar fără surprize | Doar câmpurile existente pentru perioadă și durată, fără sesiuni inventate sau export |
| Celelalte idei și M2–M6 | Planuri: fără alerte, conturi, locuri live, furnizori, sponsori sau integrări funcționale |

P0 este prioritatea acestei versiuni. Nu au fost implementate opționalele P1; următorii pași sunt publicarea și validarea cu profesori reali, nu extinderea funcțiilor.

## Publicare · PENDING

Nu există un deployment public verificat pentru PR #2 și nu a fost generat un URL public. Nu au fost găsite credențiale Vercel/Netlify utilizabile în mediul de lucru; configurația locală Netlify nu conține cont sau token. GitHub nu listează deployments, iar endpointul Pages răspunde 404. Preview-ul local nu reprezintă găzduire publică.

După autentificare, importă `barbalatv/DigiEduHack2026` în platforma aleasă. Pentru evaluarea PR #2 alege ramura `Vladimir/puntea-edu-pr2`; păstrează `main` pentru producție după review independent și merge.

| Setare | Vercel | Netlify |
| --- | --- | --- |
| Framework | Vite | Vite |
| Root / Base directory | `web` | `web` |
| Node.js | 22.x, minimum 22.18 | 22.x, minimum 22.18 |
| Instalare | `pnpm install --frozen-lockfile` | Instalarea pnpm a hostului, cu lockfile-ul din `web` |
| Build command | `pnpm build` | `pnpm install --frozen-lockfile && pnpm build` |
| Output / Publish directory | `dist` | `dist` relativ la base `web` (adică `web/dist` din repo) |
| Secrete ale aplicației | Niciunul | Niciunul |

Dacă hostul cere o versiune explicită pnpm, folosește `12.18.0`, versiunea verificată local. Nu sunt necesare reguli SPA pentru fișe: rutele sunt `/?program=...`, toate cu pathname `/`. Nu publica sursele în locul directorului construit `dist`.

Referințe pentru setări: [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build), [Netlify Vite](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/), [Netlify base/publish](https://docs.netlify.com/build/configure-builds/overview/).

După publicare: deschide URL-ul primit fără autentificare, verifică `/?program=digiprof-a-b` cu refresh, clipboardul pe HTTPS, Plan B și sursa oficială la 320/390 px. Înregistrează URL-ul și commitul publicat doar după observare. Programarea unei sesiuni cu profesori și înscrierea la eveniment rămân acțiuni ale echipei; nu au fost efectuate aici.

## Scenariu demonstrativ · 5 minute

1. **0:00–0:40** — Prezintă Puntea Edu MD: catalog pilot, nu acoperire universală. Radar Edu este secțiunea de formări. Arată limita de 4 anunțuri reale și cele 2 fixtures fictive.
2. **0:40–1:30** — Caută „competente digitale”, activează „Doar anunțuri reale”, deschide DigiProf. Arată termenul publicat 30 octombrie separat de perioada neprecizată și data consultării, care nu confirmă înscrieri.
3. **1:30–2:30** — În „Mi se potrivește?” arată proveniența, apoi Da, Nu, Nu știu și rezumatele. Explică limitele și șterge răspunsurile.
4. **2:30–3:30** — Deschide Plan B: UPSC are aceeași temă, curs 23 noiembrie–19 decembrie, dar termen neprecizat. Nu există alternativă cu înscriere confirmată. Urmează linkul UPSC și arată „De clarificat”.
5. **3:30–4:20** — Copiază linkul fișei; reîncarcă-l, revino în catalog și arată filtrele păstrate prin Back. Pe curriculum compară 30 octombrie cu noiembrie–decembrie și cele 16 ore.
6. **4:20–5:00** — Deschide sursa oficială, fără trimitere de formular. Încheie cu limitele pilotului, nevoia de confirmare la organizator și validarea cu utilizatori / publicarea încă de făcut dacă sunt pending.
