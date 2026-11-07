# Verificare locală · 7 noiembrie 2026

Browser Chromium integrat, Vite în dezvoltare și build de producție servit cu `pnpm preview`. Rezultate locale; nu reprezintă deployment public sau acceptare de către utilizatori.

## Comenzi

| Verificare | Rezultat |
| --- | --- |
| `pnpm build` | PASS: TypeScript și bundle Vite |
| `pnpm lint` | PASS |
| `pnpm test` | PASS: 8 teste, 0 eșecuri |
| `git diff --check` | PASS |

Testele automate acoperă termenul trecut/curent/viitor, miezul nopții în Moldova, separarea perioadei de termen, precizia de lună, căutarea fără diacritice, intersecția filtrelor, lipsa rezultatelor și separarea fixtures de sursele reale.

## Smoke-test în browser

| Scenariu | Rezultat observat |
| --- | --- |
| Catalog | 6 fișe: 4 reale + 2 demonstrative |
| Căutare „curriculum” | 2 rezultate după temă/titlu |
| Căutare + Online + Manageri școlari | O fișă: noul curriculum |
| Limba Română | Un exemplu demonstrativ; fără includerea limbilor necunoscute |
| Română + doar anunțuri reale | Fără rezultate; resetarea readuce cele 6 fișe |
| Rusă, Enter pe opțiune | Un exemplu demonstrativ |
| Detalii curriculum | Eligibilitate, sursă, 30 octombrie pentru înscriere și noiembrie–decembrie pentru formare |
| Înapoi la catalog | Filtrele se păstrează |
| Refresh pe link direct curriculum | Fișa se redeschide pe build-ul de producție |
| Detalii UPSC | Termen neprecizat, separat de perioada 23 noiembrie–19 decembrie 2026 |
| Back din browser | Revine în catalog |
| ID inexistent | Mesaj și revenire în catalog |
| Fișă demonstrativă directă | Marcaj fictiv și zero linkuri spre organizatori |
| Link organizator | Deschide anunțul MEC într-o filă nouă; pagina oficială se încarcă |
| Încărcare lentă | Chunk de date temporar interceptat pe build de producție: mesaj de încărcare și skeleton, fără „0 rezultate” prematur |
| Eșec de rețea și reîncercare | Eroare vizibilă după eșec indus; butonul reîncarcă și restabilește fișa după eliminarea interceptării |
| Lățimi 320, 390, 768, 1280 px | Fără depășire orizontală; o coloană pe telefon, două pe desktop |
| Consolă după restabilirea rețelei | Nicio eroare în snapshotul final |

Cele patru URL-uri externe au fost citite ca surse primare și au răspuns **HTTP 200** la verificarea separată prin GET. Nu au fost trimise formulare, cereri sau mesaje către organizatori. Interceptarea de rețea și dimensiunile de test au fost eliminate la final.

## Capturi

- [Catalog desktop, 1280 × 900](desktop-catalog.jpg)
- [Detalii mobile, 390 × 844](mobile-detail.jpg)

## Neverificat

Telefon fizic, Safari/iOS, Firefox, cititor de ecran, audit WCAG complet și teste cu profesori reali. Acceptarea înscrierilor, starea formularelor, locurile, prelungirile și modificările surselor după consultare trebuie confirmate la organizatori. Nu a fost realizat un deployment public.
