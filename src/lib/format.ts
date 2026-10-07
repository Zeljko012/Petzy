/* Cene u formatu "2.400 RSD": tačka za hiljade, bez decimala. */
export function formatRSD(iznos: number): string {
  const ceo = Math.round(iznos).toString();
  return `${ceo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD`;
}

const MESECI = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

/* Datumi u formatu "5. oktobar 2026." */
export function formatDatum(iso: string): string {
  const [g, m, d] = iso.split("-").map(Number);
  return `${d}. ${MESECI[m - 1]} ${g}.`;
}
