/*
  PRIVREMENI saveti, da se vidi izgled bloga. Pre objave ih treba proveriti
  (po BRAND.md: svaki savet o zdravlju završava preporukom za veterinara, bez dijagnoza i doza).
*/

export type Blok = { tip: "p"; tekst: string } | { tip: "h2"; tekst: string } | { tip: "lista"; stavke: string[] };

export type Savet = {
  slug: string;
  naslov: string;
  tema: string;
  datum: string;
  minuta: number;
  uvod: string;
  zdravlje: boolean;
  sadrzaj: Blok[];
};

export const SAVETI: Savet[] = [
  {
    slug: "macka-ne-pije-dovoljno-vode",
    naslov: "Kako da tvoja mačka pije više vode",
    tema: "Mačke",
    datum: "2026-10-05",
    minuta: 4,
    uvod:
      "Mačke često ne piju dovoljno vode, a vlasnici to retko primete. Evo pet sitnica koje pomažu, a za sve što deluje ozbiljnije, prava adresa je tvoj veterinar.",
    zdravlje: true,
    sadrzaj: [
      {
        tip: "p",
        tekst:
          "Preci današnjih mačaka živeli su u suvim krajevima i veći deo vode dobijali su iz plena. Zato mnoge mačke i danas piju malo, čak i kad im je činija puna.",
      },
      { tip: "h2", tekst: "Pet sitnica koje pomažu" },
      {
        tip: "lista",
        stavke: [
          "Drži vodu dalje od hrane. Mnoge mačke ne vole da piju tamo gde jedu.",
          "Probaj širu i pliću činiju, da brkovi ne dodiruju ivice.",
          "Menjaj vodu svaki dan, a činiju peri češće nego što misliš da treba.",
          "Postavi dve ili tri činije po stanu, na mirnim mestima.",
          "Ako jede suvu hranu, razgovaraj sa veterinarom o tome da deo obroka bude vlažna hrana.",
        ],
      },
      { tip: "h2", tekst: "Kada da se zabrineš" },
      {
        tip: "p",
        tekst:
          "Ako mačka naglo počne da pije mnogo više ili mnogo manje nego inače, ili primetiš promene kod mokrenja, ne čekaj. To su stvari koje treba da pogleda veterinar.",
      },
    ],
  },
  {
    slug: "prva-nedelja-sa-stenetom",
    naslov: "Prva nedelja sa štenetom: šta je zaista važno",
    tema: "Psi",
    datum: "2026-09-28",
    minuta: 6,
    uvod:
      "Novo štene u kući znači mnogo uzbuđenja i malo sna. Evo šta možeš da pustiš, a na čemu vredi raditi od prvog dana.",
    zdravlje: true,
    sadrzaj: [
      {
        tip: "p",
        tekst:
          "Prvih par dana štene upoznaje novi svet: mirise, zvuke i ljude. Najviše mu pomaže kad je dan predvidiv, sa obrocima, šetnjama i spavanjem u isto vreme.",
      },
      { tip: "h2", tekst: "Na čemu da radiš od prvog dana" },
      {
        tip: "lista",
        stavke: [
          "Stalno mesto za hranu i vodu. Tu je i njegov držač činija, ako ga ima.",
          "Kratke, česte šetnje posle jela i buđenja.",
          "Ime. Izgovaraj ga veselo i nagradi svaki put kad se okrene.",
          "Mirno mesto za spavanje, gde ga niko ne budi.",
        ],
      },
      { tip: "h2", tekst: "Šta može da sačeka" },
      {
        tip: "p",
        tekst:
          "Komande, duge šetnje i upoznavanje sa drugim psima mogu da sačekaju da se štene opusti. Vakcinacije, čipovanje i plan ishrane dogovori sa veterinarom na prvom pregledu.",
      },
    ],
  },
  {
    slug: "kako-da-izaberes-cinije",
    naslov: "Inox, keramika ili plastika: koje činije da izabereš",
    tema: "Oprema",
    datum: "2026-09-15",
    minuta: 3,
    uvod:
      "Činija deluje kao najmanje važna stvar, a ljubimac iz nje jede dva puta dnevno, svaki dan. Evo kratkog poređenja.",
    zdravlje: false,
    sadrzaj: [
      {
        tip: "p",
        tekst:
          "Inox se najlakše čisti i ne puca kad padne. Keramika je teška i stabilna, ali se može okrnjiti. Plastika je lagana i jeftina, ali se vremenom izgrebe, a ogrebotine se teže peru.",
      },
      { tip: "h2", tekst: "Na šta da obratiš pažnju" },
      {
        tip: "lista",
        stavke: [
          "Veličina: činija treba da bude šira od njuške, da brkovi ne smetaju.",
          "Visina: većim psima prija kad ne moraju da se saginju do poda.",
          "Stabilnost: gumene stopice ili težak držač, da činija ne putuje po kuhinji.",
        ],
      },
    ],
  },
];

export function nadjiSavet(slug: string): Savet | undefined {
  return SAVETI.find((s) => s.slug === slug);
}
