import type { BojaId, Ilustracija as Vrsta } from "@/lib/katalog";
import { BOJE } from "@/lib/katalog";

/*
  Privremeni prikaz proizvoda dok ne stignu fotografije. Crta proizvod u izabranim
  bojama i ispisuje ime ljubimca Nunito fontom, pa služi i kao pregled uživo.
*/

type Props = {
  vrsta: Vrsta;
  boje: Record<string, BojaId>;
  ime?: string;
  opis: string;
  className?: string;
};

/* Boje materijala koji nisu filament (inox, metal). Podaci o proizvodu, ne UI boje. */
const INOX = "#C9D2DC";
const INOX_TAMNI = "#8D99A8";

function osvetljenost(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const kanal = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * kanal((n >> 16) & 255) + 0.7152 * kanal((n >> 8) & 255) + 0.0722 * kanal(n & 255);
}

/* Ime se ispisuje bojom koja ima bolji kontrast sa delom na kome stoji. */
function bojaImena(hex: string): string {
  return osvetljenost(hex) > 0.36 ? "var(--petzy-teget)" : "var(--petzy-krem)";
}

function senka(hex: string, procenat = 78): string {
  return `color-mix(in oklab, ${hex} ${procenat}%, black)`;
}

function velicinaFonta(ime: string, sirina: number, maks: number): number {
  const znakova = Math.max(Array.from(ime).length, 3);
  return Math.min(maks, sirina / (znakova * 0.62));
}

function Ime({ ime, x, y, sirina, maks, boja }: { ime: string; x: number; y: number; sirina: number; maks: number; boja: string }) {
  if (!ime) return null;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="var(--font)"
      fontWeight={800}
      fontSize={velicinaFonta(ime, sirina, maks)}
      fill={boja}
    >
      {ime}
    </text>
  );
}

/* Talasasta ivica između gornjeg i donjeg dela: naizmenični lukovi preko cele širine. */
function talas(od: number, do_: number, y: number, amplituda: number, lukova: number): string {
  const korak = (do_ - od) / lukova;
  let d = `Q${od + korak / 2} ${y - amplituda * 2} ${od + korak} ${y}`;
  for (let i = 2; i <= lukova; i++) d += ` T${od + korak * i} ${y}`;
  return d;
}

/*
  Podignuta činija iz dva dela (prema fotografiji uzorka): gornji deo sa reljefnim imenom,
  donji deo sa talasastom ivicom. Slova su u boji donjeg dela, kao na pravom proizvodu.
*/
function Cinija({ gornji, donji, ime }: { gornji: string; donji: string; ime: string }) {
  /* Ako su delovi skoro iste svetline, slova bi se izgubila; tada biramo kontrastnu boju. */
  const [a, b] = [osvetljenost(gornji), osvetljenost(donji)];
  const odnos = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  const slova = odnos >= 1.5 ? donji : bojaImena(gornji);
  const prikaz = ime.toLocaleUpperCase("sr");
  const znakova = Math.max(Array.from(prikaz).length, 3);
  const velicina = Math.min(40, 210 / (znakova * 0.86));

  return (
    <g>
      {/* donji deo: ceo trup, gornji deo se crta preko njega */}
      <path d="M72 76 L42 246 Q200 284 358 246 L328 76 Z" fill={donji} />
      <path d="M42 246 Q200 284 358 246 L356 236 Q200 272 44 236 Z" fill={senka(donji, 88)} />
      {/* gornji deo sa talasastom donjom ivicom */}
      <path d={`M72 76 L54 178 ${talas(54, 346, 178, 9, 8)} L328 76 Z`} fill={gornji} />
      {/* otvori za hvat sa strane */}
      <rect x="79" y="104" width="13" height="30" rx="6.5" fill={senka(gornji, 72)} transform="rotate(10 85 119)" />
      <rect x="308" y="104" width="13" height="30" rx="6.5" fill={senka(gornji, 72)} transform="rotate(-10 314 119)" />
      {/* obod i inox činija */}
      <ellipse cx="200" cy="76" rx="128" ry="22" fill={senka(gornji, 90)} />
      <ellipse cx="200" cy="74" rx="112" ry="17" fill={INOX_TAMNI} />
      <ellipse cx="200" cy="77" rx="100" ry="12" fill={INOX} />
      {prikaz && (
        <g fontFamily="var(--font)" fontWeight={800} fontSize={velicina} letterSpacing="0.14em" textAnchor="middle">
          <text x={202} y={140} dominantBaseline="central" fill={senka(gornji, 70)} opacity="0.55">
            {prikaz}
          </text>
          <text x={200} y={138} dominantBaseline="central" fill={slova}>
            {prikaz}
          </text>
        </g>
      )}
    </g>
  );
}

/*
  Kašičica za hranu, prema 3D modelu (pogled odozgo):
  duboka kašika u obliku šape (dva velika srednja prsta, dva bočna, širok jastučić dlana)
  i duga ravna drška u obliku koske. Crta se uspravno pa rotira, da drška ide udesno.
  "osnova" su zidovi, dno, obod drške i slova; "umetak" su jastučići i unutrašnjost koske.
*/
/* Unutrašnja ivica kašike (pre rotacije, centar šape u 0,0); obod se crta kao potez oko nje. */
const SAPA =
  "M0 86 C-20 96 -44 96 -56 84 C-76 90 -98 72 -92 44 C-88 30 -96 20 -100 0 C-110 -30 -92 -52 -66 -48 C-70 -78 -48 -100 -22 -96 C-12 -100 -4 -94 0 -86 C4 -94 12 -100 22 -96 C48 -100 70 -78 66 -48 C92 -52 110 -30 100 0 C96 20 88 30 92 44 C98 72 76 90 56 84 C44 96 20 96 0 86 Z";

const DRSKA_SPOLJA =
  "M-44 66 C-28 92 -18 120 -18 170 C-18 220 -24 250 -40 274 C-62 290 -30 324 -6 304 Q0 298 6 304 C30 324 62 290 40 274 C24 250 18 220 18 170 C18 120 28 92 44 66 Z";
const DRSKA_UNUTRA =
  "M-34 76 C-20 100 -11 124 -11 170 C-11 220 -17 252 -32 277 C-48 290 -28 312 -9 297 Q0 291 9 297 C28 312 48 290 32 277 C17 252 11 220 11 170 C11 124 20 100 34 76 Z";
const JASTUCE_DLANA =
  "M-60 36 C-62 4 -32 -8 0 -8 C32 -8 62 4 60 36 C58 58 46 68 31 62 C23 74 8 76 0 68 C-8 76 -23 74 -31 62 C-46 68 -58 58 -60 36 Z";
const JASTUCI_PRSTIJU = [
  { x: -26, y: -58, rx: 22, ry: 32, ugao: -6 },
  { x: 26, y: -58, rx: 22, ry: 32, ugao: 6 },
  { x: -75, y: -12, rx: 18, ry: 28, ugao: -20 },
  { x: 75, y: -12, rx: 18, ry: 28, ugao: 20 },
];

const RAZMERA = 0.82;
const DUBINA = 28;
const ZID = 8;

function Kasicica({ osnova, umetak, ime }: { osnova: string; umetak: string; ime: string }) {
  /* Ako su obe boje skoro iste svetline, ime ne bi moglo da se pročita; tada uzimamo kontrastnu. */
  const [a, b] = [osvetljenost(osnova), osvetljenost(umetak)];
  const odnos = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  const slova = odnos >= 1.5 ? osnova : bojaImena(umetak);
  const zid = senka(osnova, 72);

  /* Uspravni crtež: šapa u 0,0, drška ide nadole do y≈318. Posle rotacije drška ide udesno. */
  /* Dijagonalno, kao na fotografiji modela: šapa gore levo, drška ka dole desno. */
  const UGAO = -60;
  const cx = 124;
  const cy = 104;
  const t = (dy = 0, dx = 0) => `translate(${cx + dx} ${cy + dy}) rotate(${UGAO}) scale(${RAZMERA})`;
  const rad = (UGAO * Math.PI) / 180;
  const imeX = cx - 196 * RAZMERA * Math.sin(rad);
  const imeY = cy + 196 * RAZMERA * Math.cos(rad);
  const slojeviKasike = Array.from({ length: DUBINA / 2 + 1 }, (_, i) => DUBINA - i * 2);
  const nivoDrske = DUBINA - 6;
  const znakova = Math.max(Array.from(ime).length, 3);

  return (
    <g>
      <defs>
        <clipPath id="kasicica-otvor">
          <path d={SAPA} transform={t()} />
        </clipPath>
      </defs>

      {/* drška: tanka ploča, niža od oboda kašike */}
      <path d={DRSKA_SPOLJA} transform={t(nivoDrske + 6)} fill={zid} />
      <path d={DRSKA_SPOLJA} transform={t(nivoDrske)} fill={osnova} />
      <path d={DRSKA_UNUTRA} transform={t(nivoDrske)} fill={umetak} />
      {ime && (
        <text
          x={imeX}
          y={imeY + nivoDrske}
          transform={`rotate(${UGAO + 90} ${imeX} ${imeY + nivoDrske})`}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font)"
          fontWeight={800}
          fontStyle="italic"
          fontSize={Math.min(19, 132 / (znakova * 0.56))}
          fill={slova}
        >
          {ime}
        </text>
      )}

      {/* zidovi kašike: obris izvučen nadole */}
      {slojeviKasike.map((d) => {
        const boja = d === DUBINA ? senka(osnova, 60) : zid;
        return (
          <path
            key={d}
            d={SAPA}
            transform={t(d)}
            fill={boja}
            stroke={boja}
            strokeWidth={ZID * 2}
            strokeLinejoin="round"
          />
        );
      })}

      {/* obod i pogled u unutrašnjost */}
      <path
        d={SAPA}
        transform={t()}
        fill={senka(osnova, 66)}
        stroke={osnova}
        strokeWidth={ZID * 2}
        strokeLinejoin="round"
      />
      <g clipPath="url(#kasicica-otvor)">
        <path d={SAPA} transform={t(12)} fill={senka(osnova, 92)} />
        <g fill={umetak}>
          <path d={JASTUCE_DLANA} transform={`${t(12)} translate(0 42) scale(1.08) translate(0 -36)`} />
          {JASTUCI_PRSTIJU.map((p, i) => (
            <ellipse
              key={i}
              cx={p.x}
              cy={p.y}
              rx={p.rx}
              ry={p.ry}
              transform={`${t(12)} rotate(${p.ugao} ${p.x} ${p.y})`}
            />
          ))}
        </g>
      </g>
    </g>
  );
}

export function Ilustracija({ vrsta, boje, ime = "", opis, className }: Props) {
  const gornji = BOJE[boje.gornji ?? "koral"].hex;
  const donji = boje.donji ? BOJE[boje.donji].hex : gornji;
  const tekst = ime.trim();

  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={opis} className={className}>
      <ellipse cx="200" cy="268" rx="150" ry="14" fill="var(--petzy-teget)" opacity="0.08" />
      {vrsta === "cinija" && <Cinija gornji={gornji} donji={donji} ime={tekst} />}
      {vrsta === "drzac" && (
        <g>
          <path d="M70 160 H330 L352 256 Q352 262 346 262 H262 Q252 262 248 252 Q228 208 200 208 Q172 208 152 252 Q148 262 138 262 H54 Q48 262 48 256 Z" fill={donji} />
          <path d="M70 160 H330 L334 178 H66 Z" fill={senka(donji, 82)} />
          <path d="M66 84 Q70 76 80 76 H320 Q330 76 334 84 L362 118 H38 Z" fill={senka(gornji, 90)} />
          <ellipse cx="135" cy="98" rx="62" ry="15" fill={INOX_TAMNI} />
          <ellipse cx="135" cy="96" rx="56" ry="12" fill={INOX} />
          <ellipse cx="265" cy="98" rx="62" ry="15" fill={INOX_TAMNI} />
          <ellipse cx="265" cy="96" rx="56" ry="12" fill={INOX} />
          <path d="M38 118 H362 V150 Q362 166 346 166 H54 Q38 166 38 150 Z" fill={gornji} />
          <Ime ime={tekst} x={200} y={142} sirina={270} maks={34} boja={bojaImena(gornji)} />
        </g>
      )}
      {vrsta === "drzac-mini" && (
        <g>
          <path d="M84 186 H316 L332 256 Q332 262 326 262 H254 Q246 262 242 254 Q226 230 200 230 Q174 230 158 254 Q154 262 146 262 H74 Q68 262 68 256 Z" fill={donji} />
          <path d="M84 186 H316 L319 198 H81 Z" fill={senka(donji, 82)} />
          <path d="M80 112 Q84 102 94 102 H306 Q316 102 320 112 L346 146 H54 Z" fill={senka(gornji, 90)} />
          <ellipse cx="146" cy="124" rx="52" ry="13" fill={INOX_TAMNI} />
          <ellipse cx="146" cy="122" rx="46" ry="10" fill={INOX} />
          <ellipse cx="254" cy="124" rx="52" ry="13" fill={INOX_TAMNI} />
          <ellipse cx="254" cy="122" rx="46" ry="10" fill={INOX} />
          <path d="M54 146 H346 V176 Q346 192 330 192 H70 Q54 192 54 176 Z" fill={gornji} />
          <Ime ime={tekst} x={200} y={169} sirina={250} maks={30} boja={bojaImena(gornji)} />
        </g>
      )}
      {vrsta === "kutijica" && (
        <g>
          <path d="M186 44 Q200 22 214 44 L210 62 H190 Z" fill="none" stroke={INOX_TAMNI} strokeWidth="7" strokeLinejoin="round" />
          <circle cx="208" cy="162" r="98" fill={donji} />
          <circle cx="200" cy="156" r="92" fill={gornji} />
          <circle cx="200" cy="156" r="78" fill="none" stroke={senka(gornji, 86)} strokeWidth="3" />
          <Ime ime={tekst} x={200} y={158} sirina={140} maks={30} boja={bojaImena(gornji)} />
        </g>
      )}
      {vrsta === "privezak" && (
        <g>
          <circle cx="200" cy="58" r="20" fill="none" stroke={INOX_TAMNI} strokeWidth="6" />
          <circle cx="200" cy="160" r="96" fill={senka(gornji, 86)} />
          <circle cx="200" cy="156" r="96" fill={gornji} />
          <circle cx="200" cy="82" r="9" fill="var(--petzy-krem)" />
          <Ime ime={tekst} x={200} y={164} sirina={150} maks={36} boja={bojaImena(gornji)} />
        </g>
      )}
      {vrsta === "privezak-kost" && (
        <g>
          <circle cx="98" cy="96" r="16" fill="none" stroke={INOX_TAMNI} strokeWidth="6" />
          {[
            { fill: senka(gornji, 86), dy: 6 },
            { fill: gornji, dy: 0 },
          ].map(({ fill, dy }) => (
            <g key={dy} fill={fill} transform={`translate(0 ${dy})`}>
              <rect x="114" y="124" width="172" height="64" rx="12" />
              <circle cx="116" cy="126" r="32" />
              <circle cx="116" cy="186" r="32" />
              <circle cx="284" cy="126" r="32" />
              <circle cx="284" cy="186" r="32" />
            </g>
          ))}
          <circle cx="110" cy="114" r="7" fill="var(--petzy-krem)" />
          <Ime ime={tekst} x={200} y={156} sirina={150} maks={34} boja={bojaImena(gornji)} />
        </g>
      )}
      {vrsta === "nfc" && (
        <g>
          <circle cx="200" cy="44" r="18" fill="none" stroke={INOX_TAMNI} strokeWidth="6" />
          <rect x="104" y="64" width="192" height="192" rx="44" fill={senka(gornji, 86)} transform="translate(0 5)" />
          <rect x="104" y="64" width="192" height="192" rx="44" fill={gornji} />
          <circle cx="200" cy="86" r="8" fill="var(--petzy-krem)" />
          <Ime ime={tekst} x={200} y={156} sirina={150} maks={34} boja={bojaImena(gornji)} />
          <g fill="none" stroke={bojaImena(gornji)} strokeWidth="4" strokeLinecap="round" opacity="0.8">
            <path d="M188 204 Q194 212 188 220" />
            <path d="M198 198 Q208 212 198 226" />
            <path d="M208 192 Q222 212 208 232" />
          </g>
        </g>
      )}
      {vrsta === "kasika" && <Kasicica osnova={gornji} umetak={donji} ime={tekst} />}
      {vrsta === "podmetac" && (
        <g>
          <path d="M86 150 Q90 136 106 136 H294 Q310 136 314 150 L352 236 Q356 252 338 252 H62 Q44 252 48 236 Z" fill={senka(gornji, 84)} />
          <path d="M98 158 Q102 148 114 148 H286 Q298 148 302 158 L334 228 Q338 240 324 240 H76 Q62 240 66 228 Z" fill={gornji} />
          <ellipse cx="150" cy="196" rx="48" ry="16" fill="var(--petzy-teget)" opacity="0.1" />
          <ellipse cx="250" cy="196" rx="48" ry="16" fill="var(--petzy-teget)" opacity="0.1" />
        </g>
      )}
    </svg>
  );
}
