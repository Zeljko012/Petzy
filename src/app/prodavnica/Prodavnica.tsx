"use client";

import { useState } from "react";
import { KarticaProizvoda } from "@/components/KarticaProizvoda";
import { PROIZVODI, type Ljubimac } from "@/lib/katalog";

const FILTERI: { id: Ljubimac | "svi"; naziv: string }[] = [
  { id: "svi", naziv: "Sve" },
  { id: "pas", naziv: "Za pse" },
  { id: "macka", naziv: "Za mačke" },
];

export function Prodavnica() {
  const [filter, setFilter] = useState<Ljubimac | "svi">("svi");
  const prikazani = filter === "svi" ? PROIZVODI : PROIZVODI.filter((p) => p.za.includes(filter));

  return (
    <>
      <div className="filteri" role="group" aria-label="Prikaži proizvode">
        {FILTERI.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filter"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.naziv}
          </button>
        ))}
      </div>
      <p className="vizuelno-skriveno" aria-live="polite">
        Prikazano proizvoda: {prikazani.length}
      </p>
      <div className="mreza-proizvoda">
        {prikazani.map((p) => (
          <KarticaProizvoda key={p.slug} proizvod={p} redni={PROIZVODI.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
