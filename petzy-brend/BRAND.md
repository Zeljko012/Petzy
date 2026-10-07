# Petzy — knjiga brenda

> Za Claude Code: ovaj fajl je obavezan izvor za sav dizajn i sav tekst na sajtu. Pre bilo kakve izmene izgleda, komponente ili teksta, proveri pravila odavde. Boje, font i oblici su već definisani u `tokens.css` — koristi CSS promenljive odatle, nikad ne upisuj hex vrednosti direktno u komponente.

## 1. Osnovno

| | |
|---|---|
| Ime | Petzy (u logou malim slovima: `petzy`) |
| Domen | petzy.rs |
| Društvene mreže | @petzy.rs (Instagram, TikTok, Facebook) |
| Slogan | Za tvog najboljeg drugara |
| Tržište | Srbija i region (Hrvatska, BiH, Crna Gora) |
| Kupci | Svi vlasnici pasa i mačaka, i ljudi koji kupuju poklon za njih |

**Šta je Petzy:** platforma za vlasnike ljubimaca koja spaja personalizovanu opremu sa imenom ljubimca (držači činija, kutijice za kesice, poklopci za tegle, privesci) i korisne savete o nezi i dresuri.

**Po čemu se razlikujemo:** oprema za ljubimce je uglavnom bezlična plastika. Petzy pravi stvari sa imenom ljubimca, koje izgledaju lepo u domu, uz savete kojima se može verovati.

**Osećaj brenda:** toplo i porodično, jarko i veselo.

## 2. Boje

Paleta „Sunčano dvorište".

| Boja | Hex | CSS promenljiva | Za šta |
|---|---|---|---|
| Koral | `#FF6B35` | `--petzy-koral` | Znak, CTA dugmad, akcenti, ikonice |
| Tamni koral | `#B8461B` | `--petzy-koral-tamni` | Linkovi i koral tekst na svetloj pozadini |
| Sunce | `#FFC93C` | `--petzy-sunce` | Bedževi, popusti, oznaka „novo" |
| Tirkiz | `#2EC4B6` | `--petzy-tirkiz` | Sekundarni akcenti, ilustracije |
| Teget | `#1D3557` | `--petzy-teget` | Tekst, naslovi, tamne sekcije, footer |
| Krem | `#FFF4E6` | `--petzy-krem` | Glavna pozadina sajta |
| Belo | `#FFFFFF` | `--petzy-belo` | Kartice proizvoda, forme |
| Siva | `#5B6B82` | `--petzy-siva` | Sporedni tekst, napomene |

**Pravila čitljivosti (provereno po WCAG):**

- Tekst je uvek teget na kremu ili belom (kontrast 11:1).
- Koral (`#FF6B35`) **nikad** za običan tekst na svetloj pozadini, jer je kontrast samo 2,6:1. Za koral tekst i linkove koristi tamni koral (`#B8461B`, 4,9:1).
- CTA dugme: koral pozadina, teget tekst, **bold, najmanje 18px** (kontrast 4,4:1 važi samo za veliki tekst).
- Na sunce-žutoj i tirkiznoj pozadini tekst je teget.
- Na teget pozadini tekst je krem.

**Odnos boja na stranici:** otprilike 70% krem i belo, 20% teget, 10% koral, uz povremeno sunce i tirkiz. Koral mora da ostane poseban, zato ga ne koristi za velike površine.

## 3. Tipografija

**Font:** Nunito (Google Fonts, besplatan). Zaobljen i topao, podržava sva naša slova (č, ć, š, ž, đ) i ćirilicu.

| Upotreba | Težina | Veličina |
|---|---|---|
| H1 | 800 | 40px (mobilni 32px) |
| H2 | 700 | 28px |
| H3 | 700 | 20px |
| Tekst | 400 | 16px, prored 1,6 |
| Mali tekst | 400 | 14px |
| Dugmad | 700 | 18px |

- Font se učitava sa `subset=latin-ext,cyrillic`, jer bez toga č, ć, š, ž, đ ne rade.
- Težina 800 samo za H1. Logo nije tekst, uvek se koristi fajl iz `logo/`.
- Naslovi u običnoj rečenici („Držač činija sa imenom"), nikad SVA VELIKA SLOVA.

## 4. Logo

Znak: ručno nacrtana šapa u koral krugu. Ime: `petzy` u Nunito ExtraBold, teget.

| Fajl | Kada |
|---|---|
| `logo/petzy-logo.svg` / `.png` | Glavni logo: header, ambalaža, dokumenti |
| `logo/petzy-logo-svetli.svg` | Na teget ili tamnoj pozadini (footer) |
| `logo/petzy-znak.svg` | Favicon, male površine, nalepnice |
| `logo/petzy-instagram-profilna.png` | Profilna slika na mrežama (1080×1080) |
| `logo/petzy-logo-jednobojni.svg` | Graviranje, pečati, štampa u jednoj boji |
| `logo/petzy-sapa-za-3d.svg` | Reljef ili utisnut znak na 3D štampanim proizvodima |

**Pravila:**

- Slobodan prostor oko logoa najmanje polovina prečnika kruga.
- Najmanja veličina: ceo logo 120px širine, sam znak 24px.
- Ne menjaj boje, ne rastežu se proporcije, ne dodaju se senke, okviri ni efekti.
- Logo ne ide na šarenu fotografiju bez mirne podloge.
- Favicon na sajtu: `petzy-znak.svg`.

## 5. Oblici i vizuelni stil

- **Sve je zaobljeno:** kartice 20px, polja 12px, dugmad kao pilule. Bez oštrih uglova.
- **Senke meke i retke:** samo kartice proizvoda, `--senka` iz tokena.
- **Šapa kao motiv štedljivo:** kao znak, kao sitan detalj (npr. pored broja stavki u korpi), nikad kao šara po celoj pozadini.
- **Ikonice:** jednostavne, linijske, zaobljenih krajeva.

**Fotografije:**

- Pravi ljubimci u pravom domu, prirodno dnevno svetlo, topli tonovi.
- Proizvod u upotrebi (pas jede iz svog držača), ne samo na beloj pozadini.
- Ime ljubimca na proizvodu uvek čitljivo na fotografiji.
- Bez generičkih stock fotografija i bez AI fotografija ljubimaca kao prikaza stvarnog proizvoda.

## 6. Ton komunikacije

Petzy zvuči kao **komšija koji ima psa i mačku i uvek zna dobar savet**: topao, malo duhovit, pouzdan. Ne kao prodavnica, ne kao veterinar.

**Četiri osobine:**

- **Topao, ne sladunjav.** Sa ljubavlju, bez preteranog „mezimčići-cicići" tona.
- **Duhovit, ne klovnovski.** Šala gde ima smisla, ne u svakoj rečenici.
- **Pouzdan.** Saveti su provereni, a kad nešto ne znamo, kažemo „pitaj veterinara".
- **Lični.** Ljubimac je uvek po imenu.

**Pravila:**

- Obraćanje sa **„ti"**, nikad „Vi".
- Ljubimac je član porodice: „tvoj Maks", ne „vaš pas".
- Emoji: najviše jedan-dva po objavi (najčešće 🧡 🐾). **Na sajtu, u opisima proizvoda i u UI bez emojija.**
- Latinica, ekavica, bez lokalizama koje u regionu ne razumeju.
- Bez straha i pritiska: bez „ako ne kupiš…", bez lažnih odbrojavanja i lažne hitnosti.
- Bez zdravstvenih tvrdnji koje ne možemo da dokažemo: ne „antibakterijsko", ne „leči", ne „preporučuju veterinari" bez stvarnog veterinara.

**Obrazac:** ime ljubimca → malo topline → jasna informacija.

### Primeri

**Opis proizvoda**
> Maks zaslužuje svoje mesto za ručak. Podignuti držač sa njegovim imenom, dve inox činije i dizajn koji se uklapa u tvoj dom, a ne krije u ćošku.

**Instagram objava**
> Ponedeljak. Ti piješ kafu, Luna gleda u praznu činiju kao da nije jela od prošle godine 🐾 Kod koga je isto?

**Odgovor u porukama**
> Ćao! Naravno, ime može i sa ćirilicom. Javi nam kako se zove tvoj drugar i koju boju želiš, pa ti šaljemo izgled pre izrade 🧡

**Kašnjenje porudžbine**
> Izvini, Bobijev držač kasni dan duže, jer smo prvi primerak odbacili, nije bio savršen. Stiže u četvrtak, a u paketu te čeka mali poklon.

**Savet na blogu**
> Mačke često ne piju dovoljno vode, a vlasnici to retko primete. Evo pet sitnica koje pomažu, a za sve što deluje ozbiljnije, prava adresa je tvoj veterinar.

### Tekstovi na sajtu

| Umesto | Piši |
|---|---|
| Dodaj u korpu | Dodaj u korpu (ostaje, jasno je) |
| Pošalji | Poruči |
| Unesite ime | Kako se zove tvoj ljubimac? |
| Greška! | Ime može imati najviše 12 slova. |
| Korpa je prazna | Korpa čeka nešto za tvog drugara. |
| Uspešno ste poručili! | Hvala! Krećemo sa izradom Maksovog držača. |

## 7. Pravila za sajt (za Claude Code)

**Jezik i format:**

- `<html lang="sr-Latn">`, ceo sajt na srpskoj latinici.
- Cene u dinarima, format `2.400 RSD` (tačka za hiljade, bez decimala).
- Datumi: `5. oktobar 2026.`

**Personalizacija (srž brenda):**

- Svaki personalizovan proizvod ima polje **„Ime ljubimca"**, obavezno.
- Dozvoljena slova uključuju č, ć, š, ž, đ i ćirilicu. Validacija: najviše 12 znakova, bez emojija.
- **Pregled uživo:** dok kupac kuca ime i bira boje, prikazuju se na slici proizvoda, ime ispisano Nunito fontom.
- Ispod polja: „Personalizovani proizvodi se rade po porudžbini i ne mogu se vratiti, osim ako stignu oštećeni."
- Plaćanje: za sada **samo pouzećem**, za sve proizvode, i personalizovane i bez imena (odluka vlasnika, oktobar 2026; zamenjuje raniju verziju po kojoj su se personalizovani proizvodi plaćali unapred).
- Svaki personalizovan proizvod u korpi ima izbor boje za svaki deo (npr. gornji i donji deo držača činija), a pregled uživo prikazuje i ime i izabrane boje.

**Dizajn:**

- Mobile first: većina kupaca dolazi sa Instagrama, sa telefona.
- Pozadina sajta krem, kartice proizvoda bele.
- Jedno glavno CTA dugme po ekranu (koral), ostala dugmad sekundarna (teget okvir).
- Dodirne površine najmanje 44px, vidljiv fokus za tastaturu, alt tekst na svim slikama (sa imenom proizvoda, npr. „Držač činija sa imenom Maks, koral").
- Animacije retke i blage, uz poštovanje `prefers-reduced-motion`.

**Sadržaj:**

- Blog i saveti: svaki savet o zdravlju završava preporukom za veterinara. Bez dijagnoza i doza lekova.
- Opisi proizvoda prate obrazac iz sekcije 6.
- Bez lažnih recenzija, lažnih brojača („još 2 komada!") i iskačućih prozora koji blokiraju sadržaj.
