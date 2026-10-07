import Link from "next/link";
import { altTekst, podrazumevaneBoje, type Proizvod } from "@/lib/katalog";
import { formatRSD } from "@/lib/format";
import { Ilustracija } from "./Ilustracija";

/* Primeri imena na karticama, da katalog ne izgleda kao jedno te isto. */
const PRIMERI = ["Maks", "Luna", "Bobi", "Mila", "Leo", "Cica"];

export function KarticaProizvoda({ proizvod: p, redni = 0 }: { proizvod: Proizvod; redni?: number }) {
  const boje = podrazumevaneBoje(p);
  const ime = p.personalizovan ? PRIMERI[redni % PRIMERI.length] : "";

  return (
    <article className="kartica">
      <div className="kartica-slika">
        <Ilustracija vrsta={p.ilustracija} boje={boje} ime={ime} opis={altTekst(p, ime, boje)} />
      </div>
      {p.novo && <span className="bedz">Novo</span>}
      <div className="kartica-telo">
        <h3>
          <Link href={`/proizvod/${p.slug}`}>{p.naziv}</Link>
        </h3>
        <p className="sporedno mali">{p.kratko}</p>
        <p className="kartica-cena">{formatRSD(p.cena)}</p>
      </div>
    </article>
  );
}
