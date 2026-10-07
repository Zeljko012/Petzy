/* Pravila iz BRAND.md: najviše 12 znakova, latinica sa č ć š ž đ i ćirilica, bez emojija. */
export const MAKS_DUZINA_IMENA = 12;

const DOZVOLJENO_IME = /^[\p{Script=Latin}\p{Script=Cyrillic}0-9 .'-]+$/u;

export function brojZnakova(tekst: string): number {
  return Array.from(tekst).length;
}

/* Vraća poruku greške ili null ako je ime ispravno. */
export function proveriIme(sirovo: string): string | null {
  const ime = sirovo.trim();
  if (ime.length === 0) return "Upiši ime ljubimca, da znamo šta da ispišemo.";
  if (brojZnakova(ime) > MAKS_DUZINA_IMENA) return `Ime može imati najviše ${MAKS_DUZINA_IMENA} slova.`;
  if (!DOZVOLJENO_IME.test(ime)) return "Ime može da sadrži slova (i ćirilicu), brojeve, razmak i crticu, bez emojija.";
  return null;
}

export type PodaciKupca = {
  imePrezime: string;
  telefon: string;
  email: string;
  adresa: string;
  grad: string;
  postanskiBroj: string;
  napomena: string;
};

export type GreskeKupca = Partial<Record<keyof PodaciKupca, string>>;

export function proveriKupca(p: PodaciKupca): GreskeKupca {
  const g: GreskeKupca = {};
  if (p.imePrezime.trim().length < 3) g.imePrezime = "Upiši ime i prezime, da kurir zna kome nosi paket.";
  const cifre = p.telefon.replace(/[^\d+]/g, "");
  if (!/^\+?\d{8,15}$/.test(cifre)) g.telefon = "Upiši broj telefona, npr. 064 123 4567.";
  if (p.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim()))
    g.email = "Ova email adresa ne izgleda ispravno.";
  if (p.adresa.trim().length < 4) g.adresa = "Upiši ulicu i broj.";
  if (p.grad.trim().length < 2) g.grad = "Upiši mesto.";
  if (!/^\d{5}$/.test(p.postanskiBroj.trim())) g.postanskiBroj = "Poštanski broj ima 5 cifara, npr. 11000.";
  if (p.napomena.length > 500) g.napomena = "Napomena može imati najviše 500 znakova.";
  return g;
}
