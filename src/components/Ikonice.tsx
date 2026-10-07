/* Linijske ikonice zaobljenih krajeva (BRAND.md, sekcija 5). Dekorativne su, pa aria-hidden. */

type P = { className?: string };

const osnova = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function IkonaSapa({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <ellipse cx="6" cy="10" rx="2.2" ry="2.8" />
      <ellipse cx="10" cy="5.8" rx="2.2" ry="2.9" />
      <ellipse cx="14.4" cy="5.8" rx="2.2" ry="2.9" />
      <ellipse cx="18.4" cy="10" rx="2.2" ry="2.8" />
      <path d="M12.2 11.2c-2.9 0-6 3.6-6 6.2 0 1.8 1.4 2.6 3 2.6 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.6 0 3-.8 3-2.6 0-2.6-3.1-6.2-6-6.2Z" />
    </svg>
  );
}

export function IkonaKorpa({ className }: P) {
  return (
    <svg {...osnova} className={className} width="24" height="24">
      <path d="M5 8h14l-1.3 10.4a2 2 0 0 1-2 1.6H8.3a2 2 0 0 1-2-1.6L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function IkonaMeni({ className }: P) {
  return (
    <svg {...osnova} className={className} width="24" height="24">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IkonaZatvori({ className }: P) {
  return (
    <svg {...osnova} className={className} width="24" height="24">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IkonaKvacica({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export function IkonaStrelica({ className }: P) {
  return (
    <svg {...osnova} className={className} width="20" height="20">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IkonaKamion({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function IkonaNovac({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </svg>
  );
}

export function IkonaRuka({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="M12 3.5 14.3 8l5 .7-3.6 3.5.8 5L12 14.9 7.5 17.2l.8-5L4.7 8.7l5-.7L12 3.5Z" />
    </svg>
  );
}

export function IkonaInfo({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </svg>
  );
}

export function IkonaSrce({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
    </svg>
  );
}

export function IkonaStetoskop({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M10 12v2.5a5 5 0 0 0 10 0V13" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

export function IkonaKist({ className }: P) {
  return (
    <svg {...osnova} className={className}>
      <path d="M14.5 4.5 19.5 9.5 11 18l-5-5 8.5-8.5Z" />
      <path d="M6 13c-2 0-3 1.5-3 3.5V20h3.5c2 0 3.5-1 3.5-3" />
    </svg>
  );
}
