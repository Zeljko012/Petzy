"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { PraznaKorpa, Rezime } from "../korpa/Korpa";
import { Ilustracija } from "@/components/Ilustracija";
import { IkonaInfo, IkonaNovac } from "@/components/Ikonice";
import { altTekst, cenaDostave, nadjiProizvod } from "@/lib/katalog";
import { isprazniKorpu, medjuzbir, useHidratisano, useKorpa, type StavkaKorpe } from "@/lib/korpa";
import { formatRSD } from "@/lib/format";
import { proveriKupca, type GreskeKupca, type PodaciKupca } from "@/lib/validacija";
import { posaljiPorudzbinu } from "./akcije";

type Polje = {
  id: keyof PodaciKupca;
  oznaka: string;
  tip?: string;
  autoComplete: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  obavezno: boolean;
  pomoc?: string;
};

const P: Record<keyof PodaciKupca, Polje> = {
  imePrezime: { id: "imePrezime", oznaka: "Ime i prezime", autoComplete: "name", obavezno: true },
  telefon: {
    id: "telefon",
    oznaka: "Broj telefona",
    tip: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    obavezno: true,
    pomoc: "Kurir te zove pre dostave.",
  },
  email: {
    id: "email",
    oznaka: "Email (nije obavezno)",
    tip: "email",
    autoComplete: "email",
    inputMode: "email",
    obavezno: false,
    pomoc: "Ako ga upišeš, javljamo ti kad paket krene.",
  },
  adresa: { id: "adresa", oznaka: "Ulica i broj", autoComplete: "street-address", obavezno: true },
  postanskiBroj: {
    id: "postanskiBroj",
    oznaka: "Poštanski broj",
    autoComplete: "postal-code",
    inputMode: "numeric",
    obavezno: true,
  },
  grad: { id: "grad", oznaka: "Mesto", autoComplete: "address-level2", obavezno: true },
  napomena: { id: "napomena", oznaka: "Napomena (nije obavezno)", autoComplete: "off", obavezno: false },
};

function UnosnoPolje({ polje, greska }: { polje: Polje; greska?: string }) {
  const pomocId = `${polje.id}-pomoc`;
  const greskaId = `${polje.id}-greska`;
  const opisano = [polje.pomoc && pomocId, greska && greskaId].filter(Boolean).join(" ") || undefined;
  const zajednicko = {
    id: polje.id,
    name: polje.id,
    className: "polje-unos",
    autoComplete: polje.autoComplete,
    required: polje.obavezno,
    "aria-invalid": greska ? true : undefined,
    "aria-describedby": opisano,
  } as const;

  return (
    <div className="polje">
      <label htmlFor={polje.id}>{polje.oznaka}</label>
      {polje.id === "napomena" ? (
        <textarea {...zajednicko} maxLength={500} placeholder="npr. zvoni na interfon 12" />
      ) : (
        <input {...zajednicko} type={polje.tip ?? "text"} inputMode={polje.inputMode} />
      )}
      {polje.pomoc && (
        <p className="polje-pomoc" id={pomocId}>
          {polje.pomoc}
        </p>
      )}
      {greska && (
        <p className="polje-greska" id={greskaId}>
          <IkonaInfo />
          {greska}
        </p>
      )}
    </div>
  );
}

function MiniStavke({ stavke }: { stavke: StavkaKorpe[] }) {
  return (
    <ul className="mini-stavke" aria-label="Šta poručuješ">
      {stavke.map((s) => {
        const p = nadjiProizvod(s.slug);
        if (!p) return null;
        return (
          <li key={s.kljuc} className="mini-stavka">
            <div className="stavka-slika">
              <Ilustracija vrsta={p.ilustracija} boje={s.boje} ime={s.ime} opis={altTekst(p, s.ime, s.boje)} />
            </div>
            <div>
              <strong>
                {s.kolicina} × {p.naziv}
              </strong>
              {s.ime && <div>Ime: {s.ime}</div>}
            </div>
            <span>{formatRSD(p.cena * s.kolicina)}</span>
          </li>
        );
      })}
    </ul>
  );
}

type Uspeh = { broj: string; ukupno: number; imena: string[] };

function Hvala({ uspeh }: { uspeh: Uspeh }) {
  const imena = uspeh.imena;
  return (
    <section className="hvala" aria-labelledby="hvala-naslov">
      <Image src="/brend/petzy-znak.svg" alt="" width={88} height={88} className="hvala-znak" unoptimized />
      <h1 id="hvala-naslov" tabIndex={-1} ref={(el) => el?.focus()}>
        {imena.length ? "Hvala! Krećemo sa izradom." : "Hvala! Porudžbina je primljena."}
      </h1>
      {imena.length > 0 && (
        <p className="hvala-imena">
          Ispisujemo: <strong>{imena.join(", ")}</strong>
        </p>
      )}
      <p className="broj-porudzbine">Broj porudžbine: {uspeh.broj}</p>
      <p>
        Pozvaćemo te ili ti pisati ako nešto treba da proverimo. Kad paket stigne, kuriru plaćaš{" "}
        <strong>{formatRSD(uspeh.ukupno)}</strong>.
      </p>
      <Link href="/saveti" className="dugme dugme-sporedno">
        Dok čekaš, pročitaj neki savet
      </Link>
    </section>
  );
}

export function FormaPorudzbine() {
  const stavke = useKorpa();
  const hidratisano = useHidratisano();
  const [greske, setGreske] = useState<GreskeKupca>({});
  const [porukaGreske, setPorukaGreske] = useState<string | null>(null);
  const [uspeh, setUspeh] = useState<Uspeh | null>(null);
  const [saljem, startTransition] = useTransition();
  const formaRef = useRef<HTMLFormElement>(null);

  if (uspeh) return <Hvala uspeh={uspeh} />;
  const zbir = medjuzbir(stavke);
  const ukupno = zbir + cenaDostave(zbir);
  if (!hidratisano) return <p className="sporedno stranica-glava">Učitavam porudžbinu…</p>;
  if (stavke.length === 0) return <PraznaKorpa />;

  function fokusirajPrvuGresku(g: GreskeKupca) {
    const prvo = (Object.keys(P) as (keyof PodaciKupca)[]).find((k) => g[k]);
    if (prvo) formaRef.current?.querySelector<HTMLElement>(`#${prvo}`)?.focus();
  }

  function posalji(formData: FormData) {
    if (saljem) return;
    const kupac = Object.fromEntries(
      (Object.keys(P) as (keyof PodaciKupca)[]).map((k) => [k, String(formData.get(k) ?? "")]),
    ) as PodaciKupca;
    const g = proveriKupca(kupac);
    setGreske(g);
    setPorukaGreske(null);
    if (Object.keys(g).length) {
      fokusirajPrvuGresku(g);
      return;
    }

    const snimak = stavke;
    startTransition(async () => {
      const r = await posaljiPorudzbinu(
        snimak.map(({ slug, ime, boje, kolicina }) => ({ slug, ime, boje, kolicina })),
        formData,
      );
      if (r.uspeh) {
        const imena = [...new Set(snimak.map((s) => s.ime).filter(Boolean))];
        setUspeh({ broj: r.broj, ukupno: r.ukupno, imena });
        isprazniKorpu();
        window.scrollTo({ top: 0 });
      } else {
        setGreske(r.greske ?? {});
        setPorukaGreske(r.poruka);
        if (r.greske) fokusirajPrvuGresku(r.greske);
      }
    });
  }

  return (
    <>
      <header className="stranica-glava">
        <h1>Poručivanje</h1>
        <p>Još samo adresa. Plaćaš pouzećem, kad paket stigne.</p>
      </header>
      <div className="korpa-raspored">
        <form
          ref={formaRef}
          className="forma-porudzbine"
          noValidate
          onSubmit={(e) => {
            /* onSubmit umesto action: React posle action-a briše polja, a ovde ih čuvamo ako nešto ne valja. */
            e.preventDefault();
            posalji(new FormData(e.currentTarget));
          }}
        >
          {porukaGreske && (
            <p className="greska-forme" role="alert">
              {porukaGreske}
            </p>
          )}
          <fieldset className="forma-grupa">
            <legend>Kome šaljemo</legend>
            <UnosnoPolje polje={P.imePrezime} greska={greske.imePrezime} />
            <div className="dva-polja">
              <UnosnoPolje polje={P.telefon} greska={greske.telefon} />
              <UnosnoPolje polje={P.email} greska={greske.email} />
            </div>
          </fieldset>
          <fieldset className="forma-grupa">
            <legend>Adresa za dostavu</legend>
            <UnosnoPolje polje={P.adresa} greska={greske.adresa} />
            <div className="dva-polja uze-prvo">
              <UnosnoPolje polje={P.postanskiBroj} greska={greske.postanskiBroj} />
              <UnosnoPolje polje={P.grad} greska={greske.grad} />
            </div>
            <UnosnoPolje polje={P.napomena} greska={greske.napomena} />
          </fieldset>
          <fieldset className="forma-grupa">
            <legend>Plaćanje</legend>
            <div className="nacin-placanja">
              <IkonaNovac />
              <div>
                <strong>Pouzećem</strong>
                <p className="mali sporedno">Plaćaš gotovinom kuriru kad paket stigne. Za sada je ovo jedini način plaćanja.</p>
              </div>
            </div>
          </fieldset>
          <button type="submit" className="dugme dugme-glavno dugme-puno" disabled={saljem} aria-disabled={saljem}>
            {saljem ? "Šaljem porudžbinu…" : `Poruči · ${formatRSD(ukupno)} pouzećem`}
          </button>
          <p className="mali sporedno" style={{ textAlign: "center" }}>
            Klikom na „Poruči” prihvataš <Link href="/dostava-i-povracaj">uslove dostave i povraćaja</Link>.
          </p>
        </form>
        <Rezime zbir={zbir}>
          <MiniStavke stavke={stavke} />
          <Link href="/korpa" className="link-strelica" style={{ justifySelf: "start" }}>
            Izmeni korpu
          </Link>
        </Rezime>
      </div>
    </>
  );
}
