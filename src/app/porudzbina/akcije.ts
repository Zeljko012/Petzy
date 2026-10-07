"use server";

import { randomBytes } from "node:crypto";
import { BOJE, cenaDostave, nadjiProizvod, type BojaId } from "@/lib/katalog";
import { primiPorudzbinu, type StavkaPorudzbine } from "@/lib/porudzbine";
import { proveriIme, proveriKupca, type GreskeKupca, type PodaciKupca } from "@/lib/validacija";

export type UlaznaStavka = {
  slug: string;
  ime: string;
  boje: Record<string, string>;
  kolicina: number;
};

export type RezultatPorudzbine =
  | { uspeh: true; broj: string; ukupno: number }
  | { uspeh: false; poruka: string; greske?: GreskeKupca };

const POLJA: (keyof PodaciKupca)[] = ["imePrezime", "telefon", "email", "adresa", "grad", "postanskiBroj", "napomena"];

function brojPorudzbine(): string {
  const d = new Date();
  const datum = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `PZ-${datum}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function posaljiPorudzbinu(stavkeUlaz: UlaznaStavka[], formData: FormData): Promise<RezultatPorudzbine> {
  const kupac = Object.fromEntries(
    POLJA.map((k) => [k, String(formData.get(k) ?? "").slice(0, 500)]),
  ) as PodaciKupca;

  const greske = proveriKupca(kupac);
  if (Object.keys(greske).length) {
    return { uspeh: false, poruka: "Proveri označena polja.", greske };
  }

  if (!Array.isArray(stavkeUlaz) || stavkeUlaz.length === 0 || stavkeUlaz.length > 30) {
    return { uspeh: false, poruka: "Korpa je prazna. Dodaj nešto za tvog drugara pa probaj ponovo." };
  }

  /* Cene i dozvoljene boje uvek uzimamo iz kataloga na serveru, nikad od pregledača. */
  const stavke: StavkaPorudzbine[] = [];
  for (const s of stavkeUlaz) {
    const p = typeof s?.slug === "string" ? nadjiProizvod(s.slug) : undefined;
    const kolicina = Number(s?.kolicina);
    if (!p || !Number.isInteger(kolicina) || kolicina < 1 || kolicina > 10) {
      return { uspeh: false, poruka: "Nešto u korpi više nije dostupno. Osveži korpu i probaj ponovo." };
    }
    const ime = p.personalizovan ? String(s.ime ?? "").trim() : "";
    if (p.personalizovan && proveriIme(ime)) {
      return { uspeh: false, poruka: `Ime za „${p.naziv}” nije ispravno. Izmeni ga u korpi.` };
    }
    const boje: StavkaPorudzbine["boje"] = [];
    for (const d of p.delovi) {
      const b = s.boje?.[d.id];
      if (!b || !(b in BOJE) || !d.boje.includes(b as BojaId)) {
        return { uspeh: false, poruka: `Boja za „${p.naziv}” nije dostupna. Izaberi je ponovo.` };
      }
      boje.push({ deo: d.naziv, boja: b as BojaId });
    }
    stavke.push({ slug: p.slug, naziv: p.naziv, ime, boje, kolicina, cena: p.cena });
  }

  const medjuzbir = stavke.reduce((z, s) => z + s.cena * s.kolicina, 0);
  const dostava = cenaDostave(medjuzbir);
  const porudzbina = {
    broj: brojPorudzbine(),
    vreme: new Date().toISOString(),
    kupac,
    stavke,
    medjuzbir,
    dostava,
    ukupno: medjuzbir + dostava,
    placanje: "pouzece" as const,
  };

  const primljena = await primiPorudzbinu(porudzbina);
  if (!primljena) {
    return {
      uspeh: false,
      poruka: "Porudžbina trenutno nije prošla, do greške je kod nas. Probaj ponovo za minut ili nam piši na Instagramu @petzy.rs.",
    };
  }

  return { uspeh: true, broj: porudzbina.broj, ukupno: porudzbina.ukupno };
}
