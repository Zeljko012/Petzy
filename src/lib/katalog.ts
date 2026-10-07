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
  | "zalfija";

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
};

export type Deo = {
  id: string;
  naziv: string;
  boje: BojaId[];
  podrazumevana: BojaId;
};

export type Ilustracija = "drzac" | "drzac-mini" | "kutijica" | "poklopac" | "privezak" | "podmetac";

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
  za: Ljubimac[];
  detalji: string[];
  izrada: string;
  novo?: boolean;
  slike: string[];
};

const SVE_BOJE: BojaId[] = ["koral", "sunce", "tirkiz", "teget", "krem", "bela", "grafit", "zalfija"];

export const PROIZVODI: Proizvod[] = [
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
    za: ["macka", "pas"],
    detalji: [
      "Dve inox činije od 400 ml",
      "Visina 7 cm, nagib ploče 10°",
      "Za mačke i pse do 10 kg",
      "Ime do 12 slova, utisnuto u gornji deo",
    ],
    izrada: "Izrada 3 do 5 radnih dana",
    novo: true,
    slike: [],
  },
  {
    slug: "kutijica-za-kesice",
    naziv: "Kutijica za kesice sa imenom",
    kratko: "Kači se na povodac, rolna kesica uvek pri ruci.",
    opis:
      "{ime} je spreman za šetnju, a kesice su uvek tu. Kutijica se kači na povodac, rolna se menja za par sekundi, a ime je na poklopcu.",
    cena: 1200,
    personalizovan: true,
    delovi: [
      { id: "gornji", naziv: "Poklopac", boje: SVE_BOJE, podrazumevana: "sunce" },
      { id: "donji", naziv: "Telo", boje: SVE_BOJE, podrazumevana: "teget" },
    ],
    ilustracija: "kutijica",
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
    slug: "poklopac-za-teglu",
    naziv: "Poklopac za teglu sa imenom",
    kratko: "Za teglu sa poslasticama, staje na standardne tegle.",
    opis:
      "{ime} tačno zna gde stoje poslastice. Poklopac sa imenom staje na standardnu teglu od 1 litra, a tegla ostaje zatvorena i kad neko radoznao pokuša da je otvori šapom.",
    cena: 1500,
    personalizovan: true,
    delovi: [{ id: "gornji", naziv: "Boja poklopca", boje: SVE_BOJE, podrazumevana: "koral" }],
    ilustracija: "poklopac",
    za: ["pas", "macka"],
    detalji: [
      "Za tegle prečnika otvora 82 mm",
      "Silikonski zaptivač uključen",
      "Tegla nije u kompletu",
      "Ime do 12 slova na vrhu poklopca",
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
    za: ["pas", "macka"],
    detalji: ["Prečnik 3 cm, težina 4 g", "Metalna karika uključena", "Ime do 12 slova"],
    izrada: "Izrada 2 do 3 radna dana",
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
