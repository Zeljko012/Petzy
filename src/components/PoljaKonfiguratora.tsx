"use client";

import { useId, type Ref } from "react";
import { BOJE, type BojaId, type Deo } from "@/lib/katalog";
import { MAKS_DUZINA_IMENA, brojZnakova } from "@/lib/validacija";
import { IkonaInfo } from "./Ikonice";

type ImeProps = {
  vrednost: string;
  onChange: (v: string) => void;
  greska?: string | null;
  inputRef?: Ref<HTMLInputElement>;
};

export function PoljeIme({ vrednost, onChange, greska, inputRef }: ImeProps) {
  /* useId, ne fiksni id: Next čuva prethodne stranice skrivene u DOM-u, pa bi se id ponavljao. */
  const poljeId = `ime-${useId()}`;
  const pomocId = `${poljeId}-pomoc`;
  const greskaId = `${poljeId}-greska`;
  const znakova = brojZnakova(vrednost.trim());

  return (
    <div className="polje">
      <label htmlFor={poljeId}>Kako se zove tvoj ljubimac?</label>
      <input
        ref={inputRef}
        id={poljeId}
        name="ime"
        className="polje-unos"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="words"
        spellCheck={false}
        placeholder="npr. Maks"
        value={vrednost}
        onChange={(e) => {
          /* Ne puštamo više od 13 znakova u polje, da greška bude vidljiva ali kucanje ne ode predaleko. */
          const niz = Array.from(e.target.value);
          onChange(niz.slice(0, MAKS_DUZINA_IMENA + 1).join(""));
        }}
        required
        aria-invalid={greska ? true : undefined}
        aria-describedby={`${pomocId}${greska ? ` ${greskaId}` : ""}`}
      />
      <div className="polje-pomoc" id={pomocId}>
        <span>Može i ćirilicom. Ispisujemo tačno kako upišeš.</span>
        <span className="brojac" data-pun={znakova > MAKS_DUZINA_IMENA} aria-live="polite">
          {znakova}/{MAKS_DUZINA_IMENA}
        </span>
      </div>
      {greska && (
        <p className="polje-greska" id={greskaId} role="alert">
          <IkonaInfo className="ikona-greske" />
          {greska}
        </p>
      )}
    </div>
  );
}

type BojeProps = {
  deo: Deo;
  izabrana: BojaId;
  onChange: (b: BojaId) => void;
  ime: string;
};

export function IzborBoje({ deo, izabrana, onChange, ime }: BojeProps) {
  const grupa = `${ime}-${deo.id}-${useId()}`;
  return (
    <fieldset className="boje-grupa">
      <legend>
        {deo.naziv}: <span>{BOJE[izabrana].naziv}</span>
      </legend>
      <div className="boje-niz">
        {deo.boje.map((id) => (
          <label key={id} className="boja-opcija" title={BOJE[id].naziv}>
            <input
              type="radio"
              name={grupa}
              value={id}
              checked={izabrana === id}
              onChange={() => onChange(id)}
            />
            <span className="boja-uzorak" style={{ background: BOJE[id].hex }} />
            <span className="vizuelno-skriveno">{BOJE[id].naziv}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
