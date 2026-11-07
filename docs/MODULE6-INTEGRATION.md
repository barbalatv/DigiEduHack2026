# Modulul 6 — feedback și guvernanță · primul slice

## Ce este verificat
- Întrebarea oficială M6: cum pot practicienii influența dezvoltarea serviciilor, programelor, pilotărilor și cercetărilor?
- Ecosistemul DigiEduHack are 6 module. M1 = oportunități, M2 = expertiză, M3 = comunități, M4 = coordonare, M5 = evidență, M6 = feedback și guvernanță.
- Puntea Edu MD are un catalog M1 în \`web/\`. Pe ramura PR #2 există fișa "Mi se potrivește?" și Plan B.
- **Nu a fost obținut un export complet al Canvas/Dosar/ideilor M1–M6** din aplicația Google Apps Script. Browser tab text expune numai învelișul Apps Script. Nu avem documentație/API autorizat.

## Scenariu vertical demonstrabil
1. Deschide catalogul M1 și fișa \`?program=upsc-informatica\`.
2. Apasă legătura "Testează feedback" pentru a deschide \`?view=guvernanta&sourceProgramId=upsc-informatica\`.
3. Scrie o problemă și un rezultat dorit: apare o propunere locală, înregistrată doar în memoria React.
4. Deschide propunerea, vezi legătura către M1, simulează un răspuns justificat.
5. Revino la fișa reală. Niciun formular nu a fost trimis către organizatori.

## Contract de integrare (proiectat, neconfirmat de platformă)
\`SnapshotEnvelope\` cu \`schemaVersion=puntea-edu-snapshot/v1\`, \`exportedAt\` și \`modules: [{id, items: [{externalId, title, description?, url?}]}]\`.
\`GovernanceRecord\` referă elementele din alte module prin \`{moduleId, entityType, entityId, title, provenance, url?}\`. O referință fără ID este exemplu, nu legătură operațională. \`origin\` distinge fixture, local și export.

### Proprietate și siguranță
- Nicio scriere în aplicația oficială și nicio promisiune de integrare live.
- Nu se colectează nume, e-mail, date personale sau informații despre elevi.
- Toate răspunsurile din prototip sunt simulate. Pentru decizii reale va fi necesar un emitent autorizat, o justificare, o dată și o cale de contestare/revizuire.
- Datele se pierd la refresh: nu există backend, conturi, storage sau telemetrie.
- La importul real, păstrează proveniența/URL/data capturii, nu transforma notițe sau idei în hotărâri oficiale, nu extrage informații private de la organizatori.

## Pasul următor (blocant pentru integrare reală)
Un agent care poate interacționa cu browserul trebuie să inspecteze fiecare pagină M1–M6, Harta comună, Canvas, Dosar, Idei, Legături, Notițe și Test, apoi să creeze un snapshot reproductibil. Dacă platforma nu permite exportul, citește doar conținutul vizibil și salvează rezultatul manual cu URL/captură/ora; nu încerca acces neautorizat la script sau Google Sheets.

După snapshot: deduplicare pe IDs sursă, harta legăturilor între module, selecție de 2–3 necesități reale, măcar un test cu practician, și integrarea doar a elementelor confirmate.

## Verificare
Din \`web/\`: \`pnpm install --frozen-lockfile && pnpm build && pnpm lint && pnpm test\`; smoke M1 -> M6 -> form -> răspuns fictiv -> M1, Back/refresh, lățimi 320/390/1280. Aceste verificări nu sunt afirmate ca executate în mediul curent.
