# Puntea Edu MD · verificare PR #2 · 7 noiembrie 2026

Rezultate **locale observate**, pe Chrome desktop cu viewport redimensionat, nu pe telefon fizic. Dezvoltare: `http://localhost:5173/`; build de producție: `pnpm preview --host 127.0.0.1 --port 4173 --strictPort`. Nu reprezintă deployment public, review independent sau acceptare de către profesori / organizatorii DigiEduHack.

## Comenzi

Din `web/`, Node 22.23.1 și pnpm 12.18.0:

| Verificare | Rezultat observat |
| --- | --- |
| `pnpm install --frozen-lockfile` | PASS, lockfile neschimbat |
| `pnpm build` | PASS, TypeScript + Vite, după ultimele modificări de cod |
| `pnpm lint` | PASS |
| `pnpm test` | PASS, 13 teste, 0 eșecuri |
| `git diff --check` | PASS |

Testele acoperă toate rezumatele autoverificării (răspunsuri lipsă, Nu știu, toate Da, Nu și amestec), condiții insuficiente, proveniența criteriilor, Plan B fără confirmare de înscriere, excluderea fixtures / surselor lipsă, prioritatea temei comune și filtrele în linkuri. Se păstrează testele pentru termene trecut/curent/viitor, perioade separate, precizia de lună, diacritice și filtre. Sunt acoperite trecerile peste miezul nopții în Chișinău atât vara, cât și iarna.

## Smoke-test pe build-ul de producție

| Scenariu | Rezultat observat |
| --- | --- |
| Catalog / identitate | Puntea Edu MD, secțiunea Formări pentru profesori / Radar Edu, 4 anunțuri reale + 2 exemple fictive |
| Intrare în demo | Link vizibil spre DigiProf și autoverificare; fișa se deschide |
| DigiProf: Da / Nu / Nu știu | Cele trei rezumate corecte, cu „De clarificat” și limitele eligibilității păstrate |
| Tastatură | Enter pentru linkuri, butoane și opțiunea Online; Space și săgeți pentru radio, rezumat actualizat |
| INEL: parțial / toate Da / Nu combinat cu Da | „Necesită confirmare” / „Criterii cunoscute îndeplinite” / „Există criterii cunoscute neîndeplinite” |
| Șterge răspunsurile | Revine la „Necesită confirmare”, fără selecții |
| Proveniența întrebărilor | DigiProf: paragraf introductiv; INEL: Criterii de selecție 1–3, fiecare cu link oficial |
| Plan B DigiProf | Mesaj explicit că nu există alternativă cu înscriere confirmată; UPSC prima sugestie pe aceeași temă, curriculum pe public comun; diferențe și termene la vedere |
| Alternativa UPSC | Termen neprecizat, perioadă 23 noiembrie–19 decembrie 2026; criterii insuficiente → „De clarificat”, fără radio sau Plan B de termen trecut |
| Căutare din Plan B | URL cu tema + `realOnly=1`, două rezultate reale, fără celelalte filtre |
| Înapoi la catalog | Tema și `realOnly` păstrate |
| Căutare `curriculum` + Online | Un rezultat, apoi detalii curriculum |
| Refresh pe fișa curriculum | Fișa rămâne accesibilă prin link direct |
| Back după refresh | Revine la catalog cu `q=curriculum&format=Online`, un rezultat |
| Copiază linkul fișei | Feedback de succes; inserarea prin Ctrl+V în căutarea locală a produs exact `http://127.0.0.1:4173/?program=digiprof-a-b`, fără filtre sau răspunsuri |
| Fără rezultate / reset | Inserarea acelui URL în căutare produce 0 rezultate; resetarea readuce catalogul |
| Sursă oficială | Linkul INEL deschide într-o filă nouă apelul oficial; titlul și documentul sunt accesibile. Nu s-a trimis niciun formular |
| Fișă fictivă | `demo-incluziune`: marcaj fictiv, 0 radio, 0 linkuri spre organizator, 0 acțiuni de partajare a unei oferte reale |
| ID absent | Mesaj „Programul nu a fost găsit”; butonul revine la catalog |
| Consolă | Nicio eroare sau avertizare în verificarea finală a filei de preview |

## Responsive / capturi

| Viewport | Observație |
| --- | --- |
| 320 × 844 | Catalog și DigiProf / Plan B utilizabile într-o coloană; `clientWidth = scrollWidth = 305` cu scrollbarul desktop de 15 px; fără overflow orizontal |
| 390 × 844 | Fișa DigiProf, radio și mesaje lizibile; `clientWidth = scrollWidth = 375`; fără overflow |
| 1280 × 900 | Catalog desktop și INEL cu panou de date lateral; `clientWidth = scrollWidth = 1265`; fără overflow |

La prima verificare de 320 px a fost observată o depășire de 15 px din cauza `body { min-width: 320px }` combinat cu scrollbarul desktop. Minimul a fost eliminat, build-ul refăcut și măsurătorile de mai sus repetate. Override-ul de viewport a fost resetat la final.

- [Intrare mobilă, 320 px](pr2-mobile-entry-320.jpg)
- [Autoverificare mobilă, 390 px](pr2-mobile-selfcheck-390.jpg)
- [Plan B mobil, 320 px](pr2-mobile-plan-b-320.jpg)
- [Catalog desktop, 1280 px](pr2-desktop-catalog-1280.jpg)
- [INEL desktop, 1280 px](pr2-desktop-inel-1280.jpg)

## Limite / verificări neefectuate

Publicarea este **PENDING**: nu există URL public verificat pentru această versiune și nu sunt disponibile credențiale Vercel/Netlify utilizabile. Configurația exactă este în [README](../README.md#publicare--pending). Preview-ul local nu este deployment public.

Nu s-au efectuat teste cu profesori reali, pe telefon fizic, Safari/Firefox, cititor de ecran sau audit WCAG complet. Refuzul clipboardului și fallbackul de copiere manuală au fost inspectate în cod, dar nu au fost induse în browser în această rundă. Încărcarea lentă a fost observată tranzitoriu; eroarea indusă de rețea și retry din PR #1 nu au fost repetate în PR #2.

Cele patru surse oficiale au fost recitite, fără confirmarea actuală a înscrierilor, locurilor sau prelungirilor. Nu sunt promise ediții viitoare ori integrări M2–M6. Evenimentul nu a primit o înscriere din partea acestei sesiuni. După P0 s-a oprit extinderea funcțiilor; publicarea și validarea cu utilizatori rămân prioritare.

Evidența istorică din PR #1 și capturile sale sunt păstrate separat în [SMOKE-PR1.md](SMOKE-PR1.md); nu sunt rezultate noi ale PR #2.
