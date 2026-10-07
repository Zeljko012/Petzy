import Link from "next/link";
import { KATEGORIJE, type KategorijaId } from "@/lib/katalog";

/* Navigacija kroz kategorije kao "pilule"; aktivna je teget. */
export function KategorijeNav({ aktivna }: { aktivna?: KategorijaId }) {
  return (
    <nav className="filteri" aria-label="Kategorije">
      <Link href="/prodavnica" className="filter" aria-current={aktivna ? undefined : "page"}>
        Sve
      </Link>
      {KATEGORIJE.map((k) => (
        <Link
          key={k.id}
          href={`/prodavnica/${k.id}`}
          className="filter"
          aria-current={aktivna === k.id ? "page" : undefined}
        >
          {k.naziv}
        </Link>
      ))}
    </nav>
  );
}
