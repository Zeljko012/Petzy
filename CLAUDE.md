@AGENTS.md

# Petzy sajt

Pre bilo kakvog rada na dizajnu, komponentama ili tekstu pročitaj `petzy-brend/BRAND.md` i `PRODUCT.md`.
Sve boje, font i oblici dolaze iz `src/styles/tokens.css` (CSS promenljive, kopija `petzy-brend/tokens.css`). Ne upisuj hex vrednosti direktno u komponente. Izuzetak su boje filamenta proizvoda u `src/lib/katalog.ts` (`BOJE`), jer su to podaci o proizvodu, ne UI boje.
Logo fajlovi su u `petzy-brend/logo/`, a ono što sajt koristi je kopirano u `public/brend/`. Ceo sajt je na srpskoj latinici (`lang="sr-Latn"`), cene u RSD (`formatRSD` u `src/lib/format.ts`).

## Kako je složeno

- Next.js 16 (App Router, `cacheComponents` + `partialPrefetching`). Pre pisanja koda proveri dokumentaciju u `node_modules/next/dist/docs/`.
- Katalog (privremen): `src/lib/katalog.ts`. Proizvodi imaju `delovi` (npr. gornji i donji deo), svaki sa dozvoljenim bojama.
- Pregled uživo: `src/components/Ilustracija.tsx` crta proizvod u izabranim bojama sa imenom. Kad stignu fotografije, ide u `slike` u katalogu.
- Korpa: `src/lib/korpa.ts` (localStorage, `useSyncExternalStore`).
- Porudžbina: server akcija `src/app/porudzbina/akcije.ts` ponovo proverava sve i računa cene na serveru; `src/lib/porudzbine.ts` snima u `.data/porudzbine/` i šalje mejl preko Resenda ako su podešene promenljive iz `.env.example`.
- Plaćanje je samo pouzećem.
- Materijal: svi 3D štampani delovi su od PLA plastike biljnog porekla. To je velika prednost brenda i prikazuje se na svakom proizvodu (polje `materijal` u katalogu, podrazumevano `pla`; drugi materijal ili delovi od inoksa idu u `materijal` / `materijalNapomena`). Ne pisati "biorazgradivo" ni "bezbedno za hranu" bez sertifikata.
- Next čuva prethodne stranice skrivene u DOM-u (Activity), zato u komponentama koje se ponavljaju koristi `useId` umesto fiksnih `id` vrednosti.
