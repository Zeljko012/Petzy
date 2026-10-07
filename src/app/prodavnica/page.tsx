import type { Metadata } from "next";
import Link from "next/link";
import { KarticaProizvoda } from "@/components/KarticaProizvoda";
import { KategorijeNav } from "@/components/KategorijeNav";
import { IkonaStrelica } from "@/components/Ikonice";
import { KATEGORIJE, PROIZVODI } from "@/lib/katalog";

export const metadata: Metadata = {
  title: "Prodavnica",
  description:
    "Nosači za činije, kašičice za hranu, privesci, NFC privesci i držači kesica sa imenom tvog ljubimca.",
};

export default function ProdavnicaStranica() {
  return (
    <div className="omotac">
      <header className="stranica-glava">
        <h1>Sve za tvog drugara, sa njegovim imenom</h1>
        <p>Svaki proizvod pravimo po porudžbini, u bojama koje izabereš. Plaćaš pouzećem.</p>
      </header>
      <KategorijeNav />
      {KATEGORIJE.map((k) => {
        const proizvodi = PROIZVODI.filter((p) => p.kategorija === k.id);
        if (proizvodi.length === 0) return null;
        return (
          <section key={k.id} className="kategorija-sekcija" aria-labelledby={`kat-${k.id}`}>
            <div className="sekcija-glava">
              <div>
                <h2 id={`kat-${k.id}`}>{k.naziv}</h2>
                <p>{k.opis}</p>
              </div>
              <Link href={`/prodavnica/${k.id}`} className="link-strelica">
                Cela kategorija<span className="vizuelno-skriveno"> {k.naziv}</span> <IkonaStrelica />
              </Link>
            </div>
            <div className="mreza-proizvoda">
              {proizvodi.map((p) => (
                <KarticaProizvoda key={p.slug} proizvod={p} redni={PROIZVODI.indexOf(p)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
