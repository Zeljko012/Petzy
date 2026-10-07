"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BOJE, altTekst, opisSaImenom, podrazumevaneBoje, type BojaId, type Proizvod } from "@/lib/katalog";
import { dodajUKorpu, MAKS_KOLICINA } from "@/lib/korpa";
import { formatRSD } from "@/lib/format";
import { proveriIme } from "@/lib/validacija";
import { Ilustracija } from "./Ilustracija";
import { IzborBoje, PoljeIme } from "./PoljaKonfiguratora";
import { IkonaInfo, IkonaKvacica, IkonaStrelica } from "./Ikonice";

type Props = {
  proizvod: Proizvod;
  /* Server deo stranice: detalji, dostava, plaćanje. Prikazuje se ispod konfiguratora. */
  children?: ReactNode;
};

export function Konfigurator({ proizvod: p, children }: Props) {
  const [ime, setIme] = useState("");
  const [boje, setBoje] = useState<Record<string, BojaId>>(() => podrazumevaneBoje(p));
  const [kolicina, setKolicina] = useState(1);
  const [pokusano, setPokusano] = useState(false);
  const [dodato, setDodato] = useState<string | null>(null);
  const imeRef = useRef<HTMLInputElement>(null);

  /* Nacrt sa početne stranice stiže kroz URL (?ime=Maks&gornji=koral&donji=teget). */
  useEffect(() => {
    const upit = new URLSearchParams(window.location.search);
    const izUrl = upit.get("ime");
    const bojeIzUrl = Object.fromEntries(
      p.delovi.flatMap((d) => {
        const b = upit.get(d.id);
        return b && b in BOJE && d.boje.includes(b as BojaId) ? [[d.id, b as BojaId]] : [];
      }),
    );
    /* eslint-disable react-hooks/set-state-in-effect -- jednokratno čitanje URL-a posle hidratacije */
    if (p.personalizovan && izUrl && !proveriIme(izUrl)) setIme(izUrl);
    if (Object.keys(bojeIzUrl).length) setBoje((s) => ({ ...s, ...bojeIzUrl }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [p]);

  const greskaImena = p.personalizovan ? proveriIme(ime) : null;
  /* Prazno ime prijavljujemo tek posle pokušaja; pogrešan znak ili predugo ime odmah. */
  const prikazanaGreska = greskaImena && (pokusano || ime.trim().length > 0) ? greskaImena : null;
  const prikazIme = ime.trim() || (p.personalizovan ? "Maks" : "");

  function dodaj() {
    setPokusano(true);
    if (greskaImena) {
      imeRef.current?.focus();
      return;
    }
    dodajUKorpu(p.slug, p.personalizovan ? ime : "", boje, kolicina);
    setDodato(p.personalizovan ? ime.trim() : p.naziv);
    setPokusano(false);
  }

  return (
    <div className="proizvod">
      <div className="proizvod-prikaz">
        <div className="prikaz-scena">
          <Ilustracija vrsta={p.ilustracija} boje={boje} ime={prikazIme} opis={altTekst(p, prikazIme, boje)} />
        </div>
        <p className="prikaz-napomena">
          {p.personalizovan
            ? ime.trim()
              ? "Ovako će izgledati. Pre izrade proveravamo svako ime."
              : "Upiši ime i gledaj kako se ispisuje."
            : "Prikaz boje. Prave fotografije stižu uskoro."}
        </p>
      </div>

      <div className="proizvod-info">
        <div>
          <h1>{p.naziv}</h1>
          <p className="proizvod-cena">{formatRSD(p.cena)}</p>
        </div>
        <p>{opisSaImenom(p, ime)}</p>

        <form
          className="konfigurator"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            dodaj();
          }}
        >
          {p.personalizovan && (
            <PoljeIme
              inputRef={imeRef}
              vrednost={ime}
              onChange={(v) => {
                setIme(v);
                setDodato(null);
              }}
              greska={prikazanaGreska}
            />
          )}

          {p.delovi.map((d) => (
            <IzborBoje
              key={d.id}
              deo={d}
              ime={p.slug}
              izabrana={boje[d.id]}
              onChange={(b) => {
                setBoje((s) => ({ ...s, [d.id]: b }));
                setDodato(null);
              }}
            />
          ))}

          {p.personalizovan && (
            <p className="napomena-personalizacija">
              <IkonaInfo />
              Personalizovani proizvodi se rade po porudžbini i ne mogu se vratiti, osim ako stignu oštećeni.
            </p>
          )}

          <div className="kupovina-red">
            <div className="kolicina" role="group" aria-label="Količina">
              <button
                type="button"
                onClick={() => setKolicina((k) => Math.max(1, k - 1))}
                disabled={kolicina <= 1}
                aria-label="Smanji količinu"
              >
                −
              </button>
              <output aria-live="polite">{kolicina}</output>
              <button
                type="button"
                onClick={() => setKolicina((k) => Math.min(MAKS_KOLICINA, k + 1))}
                disabled={kolicina >= MAKS_KOLICINA}
                aria-label="Povećaj količinu"
              >
                +
              </button>
            </div>
            <button type="submit" className="dugme dugme-glavno dugme-puno">
              Dodaj u korpu
            </button>
          </div>

          <div aria-live="polite">
            {dodato && (
              <div className="potvrda-dodavanja">
                <span style={{ display: "inline-flex", gap: "var(--s-2)", alignItems: "center" }}>
                  <IkonaKvacica className="ikona-potvrde" />
                  {p.personalizovan ? `Dodato u korpu, sa imenom ${dodato}.` : "Dodato u korpu."}
                </span>
                <Link href="/korpa" className="link-strelica">
                  Idi u korpu <IkonaStrelica />
                </Link>
              </div>
            )}
          </div>
        </form>

        {children}
      </div>
    </div>
  );
}
