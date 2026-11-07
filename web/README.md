# Radar Edu · primul MVP

Catalog de formare pentru profesorii din Moldova, construit în proiectul existent React + Vite + TypeScript. Interfață în română; componentele shadcn/ui instalate folosesc în continuare **Base UI**, fără Radix.

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

Caută după titlu, temă sau organizator (cu sau fără diacritice). Combină filtrele de limbă, format și public-țintă, o temă sau doar anunțurile reale. Deschide titlul ori „Detalii”, verifică eligibilitatea, termenul și perioada formării, apoi consultă sursa organizatorului într-o filă nouă. Revenirea în catalog păstrează filtrele; Back din browser funcționează.

Filtrele sunt în query string. `/?program=curriculum-disciplinar` deschide direct fișa, inclusiv după refresh. Nu sunt necesare reguli de rescriere pentru rutele fișelor pe un host static; hostul trebuie să servească `web/dist/` la rădăcina site-ului.

Datele sunt încărcate asincron dintr-un modul local. Există skeleton de încărcare, stare fără rezultate, eroare cu reîncercare prin reîncărcarea paginii și stare pentru ID inexistent.

## Date și proveniență

Datele: `src/data/programs.ts`. Schema și regulile: `src/lib/programs.ts`. Sursele au fost citite din nou la **7 noiembrie 2026**. Data verificării înseamnă consultarea anunțului, nu confirmarea locurilor disponibile.

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
