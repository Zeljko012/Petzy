"use client";

import Link from "next/link";
import { useState } from "react";
import { altTekst, podrazumevaneBoje, type BojaId, type Proizvod } from "@/lib/katalog";
import { proveriIme } from "@/lib/validacija";
import { Ilustracija } from "./Ilustracija";
import { IzborBoje, PoljeIme } from "./PoljaKonfiguratora";

/* Interaktivni pregled na početnoj: kupac odmah vidi ime svog ljubimca na držaču. */
export function ProbniSto({ proizvod: p }: { proizvod: Proizvod }) {
  const [ime, setIme] = useState("");
  const [boje, setBoje] = useState<Record<string, BojaId>>(() => podrazumevaneBoje(p));

  const cisto = ime.trim();
  const greska = cisto ? proveriIme(cisto) : null;
  const prikaz = cisto || "Maks";
  const upit = new URLSearchParams({ ...(cisto && !greska ? { ime: cisto } : {}), ...boje });

  return (
    <div className="probni-sto">
      <div className="probni-sto-scena">
        <span className="probni-sto-oznaka">{cisto ? "Tvoj držač" : "Probaj sa imenom svog ljubimca"}</span>
        <Ilustracija vrsta={p.ilustracija} boje={boje} ime={prikaz} opis={altTekst(p, prikaz, boje)} />
      </div>
      <div className="probni-sto-kontrole">
        <PoljeIme vrednost={ime} onChange={setIme} greska={greska} />
        {p.delovi.map((d) => (
          <IzborBoje
            key={d.id}
            deo={d}
            ime="probni"
            izabrana={boje[d.id]}
            onChange={(b) => setBoje((s) => ({ ...s, [d.id]: b }))}
          />
        ))}
        <Link href={`/proizvod/${p.slug}?${upit.toString()}`} className="dugme dugme-glavno dugme-puno">
          {cisto && !greska ? `Napravi držač sa imenom ${cisto}` : "Napravi svoj držač"}
        </Link>
      </div>
    </div>
  );
}
