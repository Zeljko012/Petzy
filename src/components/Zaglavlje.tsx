"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ukupnoKomada, useKorpa } from "@/lib/korpa";
import { IkonaKorpa, IkonaMeni, IkonaSapa, IkonaZatvori } from "./Ikonice";

const LINKOVI = [
  { href: "/prodavnica", naziv: "Prodavnica" },
  { href: "/saveti", naziv: "Saveti" },
  { href: "/o-nama", naziv: "O nama" },
];

function BrojUKorpi() {
  const komada = ukupnoKomada(useKorpa());
  const [pulsira, setPulsira] = useState(false);
  const prethodno = useRef(komada);

  useEffect(() => {
    if (komada > prethodno.current) {
      setPulsira(true);
      const t = window.setTimeout(() => setPulsira(false), 560);
      prethodno.current = komada;
      return () => window.clearTimeout(t);
    }
    prethodno.current = komada;
  }, [komada]);

  return (
    <>
      <span className="vizuelno-skriveno">Korpa, {komada === 1 ? "1 proizvod" : `${komada} proizvoda`}</span>
      {komada > 0 && (
        <span className={`korpa-broj${pulsira ? " pulsira" : ""}`} aria-hidden="true">
          <IkonaSapa />
          {komada}
        </span>
      )}
    </>
  );
}

export function Zaglavlje() {
  const putanja = usePathname();
  const [otvoren, setOtvoren] = useState(false);
  const [zaPutanju, setZaPutanju] = useState(putanja);

  /* Zatvori meni posle navigacije (podešavanje stanja tokom rendera, bez efekta). */
  if (zaPutanju !== putanja) {
    setZaPutanju(putanja);
    setOtvoren(false);
  }

  const aktivan = (href: string) => putanja === href || putanja.startsWith(`${href}/`);

  return (
    <header className="zaglavlje">
      <div className="omotac zaglavlje-red">
        <Link href="/" className="logo-link" aria-label="Petzy, početna">
          <Image src="/brend/petzy-logo.svg" alt="" width={128} height={37} priority unoptimized />
        </Link>

        <nav className="navigacija" aria-label="Glavna navigacija">
          <ul>
            {LINKOVI.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={aktivan(l.href) ? "page" : undefined}>
                  {l.naziv}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="zaglavlje-akcije">
          <Link href="/korpa" className="korpa-link" aria-current={putanja === "/korpa" ? "page" : undefined}>
            <IkonaKorpa />
            <BrojUKorpi />
          </Link>
          <button
            type="button"
            className="meni-dugme"
            aria-expanded={otvoren}
            aria-controls="mobilni-meni"
            onClick={() => setOtvoren((o) => !o)}
          >
            {otvoren ? <IkonaZatvori /> : <IkonaMeni />}
            <span className="vizuelno-skriveno">{otvoren ? "Zatvori meni" : "Otvori meni"}</span>
          </button>
        </div>
      </div>

      {otvoren && (
        <nav id="mobilni-meni" className="mobilni-meni" aria-label="Mobilni meni">
          <ul className="omotac">
            {LINKOVI.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={aktivan(l.href) ? "page" : undefined}>
                  {l.naziv}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
