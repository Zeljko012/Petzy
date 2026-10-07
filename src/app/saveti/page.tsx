import type { Metadata } from "next";
import Link from "next/link";
import { SAVETI } from "@/lib/saveti";
import { formatDatum } from "@/lib/format";

export const metadata: Metadata = {
  title: "Saveti",
  description: "Provereni saveti o nezi, ishrani i dresuri pasa i mačaka. Za sve zdravstveno, upućujemo na veterinara.",
};

export default function SavetiStranica() {
  return (
    <div className="omotac">
      <header className="stranica-glava">
        <h1>Saveti iz komšiluka</h1>
        <p>
          Kratko i provereno, o nezi, ishrani i dresuri. Kad nešto ne znamo, kažemo ti da pitaš veterinara.
        </p>
      </header>
      <ul className="lista-saveta">
        {SAVETI.map((s) => (
          <li key={s.slug}>
            <Link href={`/saveti/${s.slug}`} className="savet-red">
              <span className="savet-tema">{s.tema}</span>
              <div>
                <h2 style={{ fontSize: "var(--h3)" }}>{s.naslov}</h2>
                <p>{s.uvod}</p>
              </div>
              <span className="savet-vreme">
                {formatDatum(s.datum)} · {s.minuta} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
