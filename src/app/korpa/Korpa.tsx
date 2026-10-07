"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Ilustracija } from "@/components/Ilustracija";
import { IkonaSapa } from "@/components/Ikonice";
import { BESPLATNA_DOSTAVA_OD, altTekst, cenaDostave, nadjiProizvod, opisBoja } from "@/lib/katalog";
import { MAKS_KOLICINA, medjuzbir, promeniKolicinu, ukloniIzKorpe, useHidratisano, useKorpa } from "@/lib/korpa";
import { formatRSD } from "@/lib/format";

export function PraznaKorpa() {
  return (
    <div className="prazna-korpa">
      <IkonaSapa />
      <h2>Korpa čeka nešto za tvog drugara.</h2>
      <p className="sporedno">Izaberi proizvod, upiši ime ljubimca i vrati se ovde.</p>
      <Link href="/prodavnica" className="dugme dugme-glavno">
        Pogledaj proizvode
      </Link>
    </div>
  );
}

export function Rezime({ zbir, children }: { zbir: number; children?: ReactNode }) {
  const dostava = cenaDostave(zbir);
  const doBesplatne = BESPLATNA_DOSTAVA_OD - zbir;
  return (
    <aside className="rezime" aria-labelledby="rezime-naslov">
      <h2 id="rezime-naslov" className="vizuelno-skriveno">
        Rezime
      </h2>
      <dl>
        <div>
          <dt>Proizvodi</dt>
          <dd>{formatRSD(zbir)}</dd>
        </div>
        <div>
          <dt>Dostava</dt>
          <dd>{dostava ? formatRSD(dostava) : "Besplatna"}</dd>
        </div>
        <div className="ukupno">
          <dt>Ukupno</dt>
          <dd>{formatRSD(zbir + dostava)}</dd>
        </div>
      </dl>
      {doBesplatne > 0 && (
        <p className="mali sporedno">Besplatna dostava za porudžbine od {formatRSD(BESPLATNA_DOSTAVA_OD)}.</p>
      )}
      <p className="mali">Plaćaš pouzećem, kuriru kad paket stigne.</p>
      {children}
    </aside>
  );
}

export function Korpa() {
  const stavke = useKorpa();
  const hidratisano = useHidratisano();

  if (!hidratisano) return <p className="sporedno">Učitavam korpu…</p>;
  if (stavke.length === 0) return <PraznaKorpa />;

  return (
    <div className="korpa-raspored">
      <ul className="stavke" aria-label="Proizvodi u korpi">
        {stavke.map((s) => {
          const p = nadjiProizvod(s.slug);
          if (!p) return null;
          return (
            <li key={s.kljuc} className="stavka">
              <div className="stavka-slika">
                <Ilustracija vrsta={p.ilustracija} boje={s.boje} ime={s.ime} opis={altTekst(p, s.ime, s.boje)} />
              </div>
              <div className="stavka-telo">
                <h3>
                  <Link href={`/proizvod/${p.slug}`}>{p.naziv}</Link>
                </h3>
                {s.ime && (
                  <p>
                    Ime: <span className="ime-oznaka">{s.ime}</span>
                  </p>
                )}
                <p className="mali sporedno">{opisBoja(p, s.boje)}</p>
                <div className="stavka-red">
                  <div className="kolicina" role="group" aria-label={`Količina, ${p.naziv}`}>
                    <button
                      type="button"
                      onClick={() => promeniKolicinu(s.kljuc, s.kolicina - 1)}
                      disabled={s.kolicina <= 1}
                      aria-label="Smanji količinu"
                    >
                      −
                    </button>
                    <output aria-live="polite">{s.kolicina}</output>
                    <button
                      type="button"
                      onClick={() => promeniKolicinu(s.kljuc, s.kolicina + 1)}
                      disabled={s.kolicina >= MAKS_KOLICINA}
                      aria-label="Povećaj količinu"
                    >
                      +
                    </button>
                  </div>
                  <strong>{formatRSD(p.cena * s.kolicina)}</strong>
                </div>
                <div>
                  <button type="button" className="ukloni" onClick={() => ukloniIzKorpe(s.kljuc)}>
                    Ukloni<span className="vizuelno-skriveno"> {p.naziv}{s.ime ? `, ${s.ime}` : ""}</span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Rezime zbir={medjuzbir(stavke)}>
        <Link href="/porudzbina" className="dugme dugme-glavno dugme-puno">
          Nastavi na poručivanje
        </Link>
        <Link href="/prodavnica" className="link-strelica" style={{ justifySelf: "center" }}>
          Nastavi kupovinu
        </Link>
      </Rezime>
    </div>
  );
}
