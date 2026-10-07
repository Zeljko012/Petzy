import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { BOJE, type BojaId } from "./katalog";
import { formatRSD } from "./format";
import type { PodaciKupca } from "./validacija";

export type StavkaPorudzbine = {
  slug: string;
  naziv: string;
  ime: string;
  boje: { deo: string; boja: BojaId }[];
  kolicina: number;
  cena: number;
};

export type Porudzbina = {
  broj: string;
  vreme: string;
  kupac: PodaciKupca;
  stavke: StavkaPorudzbine[];
  medjuzbir: number;
  dostava: number;
  ukupno: number;
  placanje: "pouzece";
};

/*
  Lokalno se porudžbine čuvaju u .data/porudzbine (van gita). Na hostingu bez trajnog
  diska (npr. Vercel) taj upis nije pouzdan, zato je email glavni kanal: podesi
  RESEND_API_KEY, PORUDZBINE_EMAIL_ZA i PORUDZBINE_EMAIL_OD (vidi .env.example).
*/
const FOLDER = process.env.PORUDZBINE_FOLDER ?? path.join(process.cwd(), ".data", "porudzbine");

async function sacuvajNaDisk(p: Porudzbina): Promise<boolean> {
  try {
    await mkdir(FOLDER, { recursive: true });
    await writeFile(path.join(FOLDER, `${p.broj}.json`), JSON.stringify(p, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("[porudzbine] upis na disk nije uspeo", e);
    return false;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function tekstPorudzbine(p: Porudzbina): string {
  const k = p.kupac;
  const stavke = p.stavke
    .map((s) => {
      const boje = s.boje.map((b) => `${b.deo}: ${BOJE[b.boja].naziv}`).join(", ");
      const ime = s.ime ? ` | IME: ${s.ime}` : "";
      return `- ${s.kolicina} × ${s.naziv}${ime} | ${boje} | ${formatRSD(s.cena * s.kolicina)}`;
    })
    .join("\n");
  return [
    `Nova porudžbina ${p.broj} (${p.vreme})`,
    "",
    stavke,
    "",
    `Međuzbir: ${formatRSD(p.medjuzbir)}`,
    `Dostava: ${p.dostava ? formatRSD(p.dostava) : "besplatna"}`,
    `UKUPNO ZA NAPLATU POUZEĆEM: ${formatRSD(p.ukupno)}`,
    "",
    `Kupac: ${k.imePrezime}`,
    `Telefon: ${k.telefon}`,
    `Email: ${k.email || "nije upisan"}`,
    `Adresa: ${k.adresa}, ${k.postanskiBroj} ${k.grad}`,
    `Napomena: ${k.napomena || "nema"}`,
  ].join("\n");
}

async function posaljiEmail(p: Porudzbina): Promise<boolean> {
  const kljuc = process.env.RESEND_API_KEY;
  const za = process.env.PORUDZBINE_EMAIL_ZA;
  const od = process.env.PORUDZBINE_EMAIL_OD;
  if (!kljuc || !za || !od) return false;

  const tekst = tekstPorudzbine(p);
  try {
    const odgovor = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${kljuc}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: od,
        to: za.split(",").map((x) => x.trim()),
        reply_to: p.kupac.email || undefined,
        subject: `Porudžbina ${p.broj}: ${formatRSD(p.ukupno)} pouzećem`,
        text: tekst,
        html: `<pre style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">${escapeHtml(tekst)}</pre>`,
      }),
    });
    if (!odgovor.ok) console.error("[porudzbine] Resend greška", odgovor.status, await odgovor.text());
    return odgovor.ok;
  } catch (e) {
    console.error("[porudzbine] slanje emaila nije uspelo", e);
    return false;
  }
}

/* Porudžbina je primljena ako je bar jedan kanal uspeo (disk ili email). */
export async function primiPorudzbinu(p: Porudzbina): Promise<boolean> {
  const [disk, email] = await Promise.all([sacuvajNaDisk(p), posaljiEmail(p)]);
  return disk || email;
}
