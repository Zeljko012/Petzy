"use client";

import { useSyncExternalStore } from "react";
import { BOJE, nadjiProizvod, type BojaId } from "./katalog";

export type StavkaKorpe = {
  kljuc: string;
  slug: string;
  ime: string;
  boje: Record<string, BojaId>;
  kolicina: number;
};

const KLJUC_SKLADISTA = "petzy-korpa-v1";
const MAKS_KOLICINA = 10;
const PRAZNO: StavkaKorpe[] = [];

let stavke: StavkaKorpe[] = PRAZNO;
let ucitano = false;
const slusaoci = new Set<() => void>();

function jeIspravna(s: unknown): s is StavkaKorpe {
  if (!s || typeof s !== "object") return false;
  const x = s as StavkaKorpe;
  const p = typeof x.slug === "string" ? nadjiProizvod(x.slug) : undefined;
  return (
    !!p &&
    typeof x.ime === "string" &&
    Number.isInteger(x.kolicina) &&
    x.kolicina > 0 &&
    !!x.boje &&
    p.delovi.every((d) => d.boje.includes(x.boje[d.id]) && x.boje[d.id] in BOJE)
  );
}

function ucitaj() {
  if (ucitano || typeof window === "undefined") return;
  ucitano = true;
  try {
    const sirovo = window.localStorage.getItem(KLJUC_SKLADISTA);
    const niz: unknown = sirovo ? JSON.parse(sirovo) : [];
    stavke = Array.isArray(niz) ? niz.filter(jeIspravna) : PRAZNO;
  } catch {
    stavke = PRAZNO;
  }
}

function sacuvaj(nove: StavkaKorpe[]) {
  stavke = nove;
  try {
    window.localStorage.setItem(KLJUC_SKLADISTA, JSON.stringify(nove));
  } catch {
    /* privatni režim ili pun storage: korpa radi do osvežavanja stranice */
  }
  slusaoci.forEach((f) => f());
}

function pretplati(f: () => void) {
  slusaoci.add(f);
  const naDrugomTabu = (e: StorageEvent) => {
    if (e.key !== KLJUC_SKLADISTA) return;
    ucitano = false;
    ucitaj();
    f();
  };
  window.addEventListener("storage", naDrugomTabu);
  return () => {
    slusaoci.delete(f);
    window.removeEventListener("storage", naDrugomTabu);
  };
}

function snimak() {
  ucitaj();
  return stavke;
}

export function useKorpa(): StavkaKorpe[] {
  return useSyncExternalStore(pretplati, snimak, () => PRAZNO);
}

export function kljucStavke(slug: string, ime: string, boje: Record<string, BojaId>): string {
  const b = Object.keys(boje)
    .sort()
    .map((k) => `${k}:${boje[k]}`)
    .join(",");
  return `${slug}|${ime.trim()}|${b}`;
}

export function dodajUKorpu(slug: string, ime: string, boje: Record<string, BojaId>, kolicina = 1) {
  ucitaj();
  const kljuc = kljucStavke(slug, ime, boje);
  const postojeca = stavke.find((s) => s.kljuc === kljuc);
  if (postojeca) {
    sacuvaj(
      stavke.map((s) =>
        s.kljuc === kljuc ? { ...s, kolicina: Math.min(MAKS_KOLICINA, s.kolicina + kolicina) } : s,
      ),
    );
  } else {
    sacuvaj([...stavke, { kljuc, slug, ime: ime.trim(), boje, kolicina: Math.min(MAKS_KOLICINA, kolicina) }]);
  }
}

export function promeniKolicinu(kljuc: string, kolicina: number) {
  ucitaj();
  if (kolicina <= 0) return ukloniIzKorpe(kljuc);
  sacuvaj(stavke.map((s) => (s.kljuc === kljuc ? { ...s, kolicina: Math.min(MAKS_KOLICINA, kolicina) } : s)));
}

export function ukloniIzKorpe(kljuc: string) {
  ucitaj();
  sacuvaj(stavke.filter((s) => s.kljuc !== kljuc));
}

export function isprazniKorpu() {
  sacuvaj(PRAZNO);
}

export function ukupnoKomada(s: StavkaKorpe[]): number {
  return s.reduce((zbir, x) => zbir + x.kolicina, 0);
}

export function medjuzbir(s: StavkaKorpe[]): number {
  return s.reduce((zbir, x) => zbir + (nadjiProizvod(x.slug)?.cena ?? 0) * x.kolicina, 0);
}

export { MAKS_KOLICINA };

const bezPretplate = () => () => {};

/* false na serveru i tokom hidratacije, true posle; sprečava da se prazna korpa trepne pre učitavanja. */
export function useHidratisano(): boolean {
  return useSyncExternalStore(
    bezPretplate,
    () => true,
    () => false,
  );
}
