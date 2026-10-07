/*
  PRIVREMENI KATALOG. Nazivi, cene, boje i opisi su probni dok ne stigne pravi spisak.
  Kada stignu fotografije, dodaj putanje u `slike` (npr. "/proizvodi/drzac-cinija-rucak/1.jpg").
*/

export type BojaId =
  | "koral"
  | "sunce"
  | "tirkiz"
  | "teget"
  | "krem"
  | "bela"
  | "grafit"
  | "zalfija"
  | "lavanda";

export type BojaProizvoda = {
  id: BojaId;
  naziv: string;
  /* Boja filamenta. Ovo je podatak o proizvodu, ne UI boja sajta. */
  hex: string;
};

export const BOJE: Record<BojaId, BojaProizvoda> = {
  koral: { id: "koral", naziv: "Koral", hex: "#FF6B35" },
  sunce: { id: "sunce", naziv: "Sunce", hex: "#FFC93C" },
  tirkiz: { id: "tirkiz", naziv: "Tirkiz", hex: "#2EC4B6" },
  teget: { id: "teget", naziv: "Teget", hex: "#1D3557" },
  krem: { id: "krem", naziv: "Krem", hex: "#F3E3CC" },
  bela: { id: "bela", naziv: "Bela", hex: "#FAFAF7" },
  grafit: { id: "grafit", naziv: "Grafit", hex: "#3A3F47" },
  zalfija: { id: "zalfija", naziv: "Žalfija", hex: "#9DB59A" },
  lavanda: { id: "lavanda", naziv: "Lavanda", hex: "#B7A3DD" },
};

export type Deo = {
  id: string;
  naziv: string;
  boje: BojaId[];
  podrazumevana: BojaId;
};

export type Ilustracija =
  | "cinija"
  | "drzac"
  | "drzac-mini"
  | "kutijica"
  | "privezak"
  | "privezak-kost"
  | "nfc"
  | "kasika"
  | "podmetac";

export type KategorijaId = "nosaci-za-cinije" | "kasicice-za-hranu" | "privesci" | "nfc-privesci" | "drzaci-kesica";

export type Kategorija = {
  id: KategorijaId;
  naziv: string;
  /* Kratak opis za stranicu kategorije, u tonu iz BRAND.md. */
  opis: string;
};

export const KATEGORIJE: Kategorija[] = [
  {
    id: "nosaci-za-cinije",
    naziv: "Nosači za činije",
    opis: "Mesto za ručak sa imenom tvog ljubimca, u bojama koje se uklapaju u tvoj dom.",
  },
  {
    id: "kasicice-za-hranu",
    naziv: "Kašičice za hranu",
    opis: "Tačna mera hrane svaki put, i kašičica koja se ne meša sa ostalim priborom.",
  },
  {
    id: "privesci",
    naziv: "Privesci sa imenom",
    opis: "Lagani privesci za ogrlicu, sa imenom tvog drugara.",
  },
  {
    id: "nfc-privesci",
    naziv: "NFC privesci",
    opis: "Privezak sa imenom i NFC čipom: ko nađe tvog ljubimca, prisloni telefon i vidi kako da te pozove.",
  },
  {
    id: "drzaci-kesica",
    naziv: "Držači kesica",
    opis: "Kesice za izmet uvek pri ruci, u kutijici sa imenom koja se kači na povodac.",
  },
];

export function nadjiKategoriju(id: string): Kategorija | undefined {
  return KATEGORIJE.find((k) => k.id === id);
}

export type Ljubimac = "pas" | "macka";

export type Proizvod = {
  slug: string;
  naziv: string;
  kratko: string;
  /* Opis prati obrazac iz BRAND.md: ime ljubimca, malo topline, jasna informacija. {ime} se menja imenom. */
  opis: string;
  cena: number;
  personalizovan: boolean;
  delovi: Deo[];
  ilustracija: Ilustracija;
  kategorija: KategorijaId;
  za: Ljubimac[];
  detalji: string[];
  izrada: string;
  novo?: boolean;
  slike: string[];
};

const SVE_BOJE: BojaId[] = ["koral", "sunce", "tirkiz", "teget", "krem", "bela", "grafit", "zalfija", "lavanda"];

export const PROIZVODI: Proizvod[] = [
  {
    slug: "cinija-sa-imenom",
    naziv: "Činija sa imenom",
    kratko: "Podignuta činija iz dva dela, ime utisnuto slovima.",
    opis:
      "{ime} ima svoju činiju, i to se vidi iz drugog kraja sobe. Gornji deo nosi ime ispisano reljefnim slovima, donji talasasti deo drži sve stabilno, a inox činija se vadi i pere za tren. Boje oba dela biraš sam.",
    cena: 2900,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Gornji deo", boje: SVE_BOJE, podrazumevana: "lavanda" },
      { id: "donji", naziv: "Donji deo i slova", boje: SVE_BOJE, podrazumevana: "krem" },
    ],
    ilustracija: "cinija",
    kategorija: "nosaci-za-cinije",
    za: ["pas", "macka"],
    detalji: [
      "Inox činija se vadi, pere se u mašini",
      "Podignuta, da ljubimac jede bez saginjanja do poda",
      "Ime reljefnim slovima, u boji donjeg dela",
      "Ime do 12 slova, ispisujemo velikim slovima",
    ],
    izrada: "Izrada 3 do 5 radnih dana",
    novo: true,
    slike: [],
  },
  {
    slug: "drzac-cinija-rucak",
    naziv: "Držač činija sa imenom",
    kratko: "Podignuti držač za dve činije, iz dva dela.",
    opis:
      "{ime} zaslužuje svoje mesto za ručak. Podignuti držač sa imenom, dve inox činije i dizajn koji se uklapa u tvoj dom, a ne krije u ćošku. Gornji i donji deo biraš u bojama koje ti se sviđaju.",
    cena: 3900,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Gornji deo", boje: SVE_BOJE, podrazumevana: "koral" },
      { id: "donji", naziv: "Donji deo", boje: SVE_BOJE, podrazumevana: "teget" },
    ],
    ilustracija: "drzac",
    kategorija: "nosaci-za-cinije",
    za: ["pas", "macka"],
    detalji: [
      "Dve inox činije od 750 ml, peru se u mašini",
      "Visina 12 cm, za srednje i velike pse",
      "Gumene stopice, ne klizi po pločicama",
      "Ime do 12 slova, utisnuto u gornji deo",
    ],
    izrada: "Izrada 3 do 5 radnih dana",
    slike: [],
  },
  {
    slug: "drzac-cinija-mini",
    naziv: "Mini držač činija sa imenom",
    kratko: "Niži držač za mačke i male pse, iz dva dela.",
    opis:
      "{ime} voli da jede bez saginjanja do poda. Niži držač sa imenom, dve inox činije i malo nagnuta ploča, da hrana ne beži u ćošak činije.",
    cena: 3200,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Gornji deo", boje: SVE_BOJE, podrazumevana: "tirkiz" },
      { id: "donji", naziv: "Donji deo", boje: SVE_BOJE, podrazumevana: "krem" },
    ],
    ilustracija: "drzac-mini",
    kategorija: "nosaci-za-cinije",
    za: ["macka", "pas"],
    detalji: [
      "Dve inox činije od 400 ml",
      "Visina 7 cm, nagib ploče 10°",
      "Za mačke i pse do 10 kg",
      "Ime do 12 slova, utisnuto u gornji deo",
    ],
    izrada: "Izrada 3 do 5 radnih dana",
    slike: [],
  },
  {
    slug: "kutijica-za-kesice",
    naziv: "Držač kesica sa imenom",
    kratko: "Kutijica za kesice za izmet, kači se na povodac.",
    opis:
      "{ime} je spreman za šetnju, a kesice su uvek tu. Kutijica se kači na povodac, rolna se menja za par sekundi, a ime je na poklopcu.",
    cena: 1200,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Poklopac", boje: SVE_BOJE, podrazumevana: "sunce" },
      { id: "donji", naziv: "Telo", boje: SVE_BOJE, podrazumevana: "teget" },
    ],
    ilustracija: "kutijica",
    kategorija: "drzaci-kesica",
    za: ["pas"],
    detalji: [
      "Odgovara standardnim rolnama kesica",
      "Karabiner za povodac uključen",
      "Ime do 12 slova na poklopcu",
    ],
    izrada: "Izrada 2 do 4 radna dana",
    slike: [],
  },
  {
    slug: "privezak-sa-imenom",
    naziv: "Privezak sa imenom",
    kratko: "Lagan privezak za ogrlicu, ime sa obe strane.",
    opis:
      "{ime} sada nosi svoje ime sa sobom. Lagan privezak za ogrlicu, ime sa jedne strane, a broj telefona po želji sa druge.",
    cena: 690,
    personalizovan: true,
    delovi: [{ id: "gornji", naziv: "Boja priveska", boje: SVE_BOJE, podrazumevana: "tirkiz" }],
    ilustracija: "privezak",
    kategorija: "privesci",
    za: ["pas", "macka"],
    detalji: ["Prečnik 3 cm, težina 4 g", "Metalna karika uključena", "Ime do 12 slova"],
    izrada: "Izrada 2 do 3 radna dana",
    slike: [],
  },
  {
    slug: "privezak-kost",
    naziv: "Privezak kost sa imenom",
    kratko: "Privezak u obliku koske, ime sa prednje strane.",
    opis:
      "{ime} nosi svoju kost, ali ovu ne zakopava. Lagan privezak za ogrlicu u obliku koske, sa imenom spreda i brojem telefona po želji pozadi.",
    cena: 790,
    personalizovan: true,
    delovi: [{ id: "gornji", naziv: "Boja priveska", boje: SVE_BOJE, podrazumevana: "sunce" }],
    ilustracija: "privezak-kost",
    kategorija: "privesci",
    za: ["pas"],
    detalji: ["Dužina 4,5 cm, težina 5 g", "Metalna karika uključena", "Ime do 12 slova"],
    izrada: "Izrada 2 do 3 radna dana",
    slike: [],
  },
  {
    slug: "nfc-privezak",
    naziv: "NFC privezak sa imenom",
    kratko: "Ime spreda, NFC čip unutra: prisloni telefon i vidi kontakt.",
    opis:
      "Ako {ime} ikad odluta, ko god ga nađe može da prisloni telefon uz privezak i odmah vidi kako da te pozove. Bez aplikacije, bez baterije, radi sa skoro svakim novijim telefonom.",
    cena: 1490,
    personalizovan: true,
    delovi: [{ id: "gornji", naziv: "Boja priveska", boje: SVE_BOJE, podrazumevana: "teget" }],
    ilustracija: "nfc",
    kategorija: "nfc-privesci",
    za: ["pas", "macka"],
    detalji: [
      "NFC čip ugrađen u privezak, bez baterije",
      "Podatke za kontakt menjaš kad god poželiš",
      "Radi sa većinom novijih Android i iPhone telefona",
      "Ime do 12 slova",
    ],
    izrada: "Izrada 3 do 5 radnih dana",
    slike: [],
  },
  {
    slug: "kasicica-za-hranu",
    naziv: "Kašičica za hranu sa imenom",
    kratko: "Kašika u obliku šape, drška u obliku koske sa imenom.",
    opis:
      "{ime} zna zvuk ove kašičice iz druge sobe. Kašika je u obliku šape, a na dršci u obliku koske stoji ime, da svaki obrok bude iste veličine i da kašičica uvek ima svoje mesto.",
    cena: 890,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Osnova i slova", boje: SVE_BOJE, podrazumevana: "koral" },
      { id: "donji", naziv: "Umetak", boje: SVE_BOJE, podrazumevana: "krem" },
    ],
    ilustracija: "kasika",
    kategorija: "kasicice-za-hranu",
    za: ["pas", "macka"],
    detalji: [
      "Kašika u obliku šape, jastučići u boji umetka",
      "Drška u obliku koske, ime u boji osnove",
      "Ime do 12 slova",
    ],
    izrada: "Izrada 2 do 4 radna dana",
    slike: [],
  },
  {
    slug: "podmetac-za-cinije",
    naziv: "Podmetač za činije",
    kratko: "Silikonski podmetač sa ivicom, bez imena.",
    opis:
      "Za one koji jedu sa entuzijazmom. Silikonski podmetač sa podignutom ivicom zadržava vodu i mrvice, a pere se pod mlazom za pola minuta.",
    cena: 1400,
    personalizovan: false,
    delovi: [
      { id: "gornji", naziv: "Boja", boje: ["koral", "tirkiz", "teget", "grafit", "zalfija"], podrazumevana: "zalfija" },
    ],
    ilustracija: "podmetac",
    kategorija: "nosaci-za-cinije",
    za: ["pas", "macka"],
    detalji: ["Dimenzije 48 × 30 cm", "Prehrambeni silikon", "Odgovara uz oba držača"],
    izrada: "Šaljemo u roku od 1 do 2 radna dana",
    slike: [],
  },
];

export function nadjiProizvod(slug: string): Proizvod | undefined {
  return PROIZVODI.find((p) => p.slug === slug);
}

export function podrazumevaneBoje(p: Proizvod): Record<string, BojaId> {
  return Object.fromEntries(p.delovi.map((d) => [d.id, d.podrazumevana]));
}

export function opisSaImenom(p: Proizvod, ime: string): string {
  const prikaz = ime.trim() || "Tvoj ljubimac";
  return p.opis.replaceAll("{ime}", prikaz);
}

/* Dostava: PRIVREMENE vrednosti, potvrditi sa kurirskom službom. */
export const DOSTAVA_CENA = 390;
export const BESPLATNA_DOSTAVA_OD = 6000;

export function cenaDostave(medjuzbir: number): number {
  return medjuzbir >= BESPLATNA_DOSTAVA_OD || medjuzbir === 0 ? 0 : DOSTAVA_CENA;
}

/* Alt tekst u stilu iz BRAND.md: "Držač činija sa imenom Maks, gornji deo koral, donji deo teget". */
export function altTekst(p: Proizvod, ime: string, boje: Record<string, BojaId>): string {
  const osnova = p.personalizovan && ime.trim() ? `${p.naziv.replace(/ sa imenom$/, "")} sa imenom ${ime.trim()}` : p.naziv;
  const delovi = p.delovi.map((d) => {
    const boja = BOJE[boje[d.id]]?.naziv.toLowerCase() ?? "";
    return p.delovi.length > 1 ? `${d.naziv.toLowerCase()} ${boja}` : boja;
  });
  return `${osnova}, ${delovi.join(", ")}`;
}

export function opisBoja(p: Proizvod, boje: Record<string, BojaId>): string {
  return p.delovi.map((d) => `${d.naziv}: ${BOJE[boje[d.id]]?.naziv ?? ""}`).join(" · ");
}
