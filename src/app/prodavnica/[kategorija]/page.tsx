import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { KarticaProizvoda } from "@/components/KarticaProizvoda";
import { KategorijeNav } from "@/components/KategorijeNav";
import { KATEGORIJE, PROIZVODI, nadjiKategoriju } from "@/lib/katalog";

export function generateStaticParams() {
  return KATEGORIJE.map((k) => ({ kategorija: k.id }));
}

export async function generateMetadata({ params }: PageProps<"/prodavnica/[kategorija]">): Promise<Metadata> {
  const { kategorija } = await params;
  const k = nadjiKategoriju(kategorija);
  return k ? { title: k.naziv, description: k.opis } : {};
}

export default function KategorijaStranica({ params }: PageProps<"/prodavnica/[kategorija]">) {
  return (
    <div className="omotac">
      <Suspense
        fallback={
          <div aria-busy="true">
            <div className="stranica-glava">
              <div className="kostur" style={{ height: "3rem", width: "60%" }} />
            </div>
            <div className="kostur" style={{ height: "20rem" }} />
          </div>
        }
      >
        <Sadrzaj params={params} />
      </Suspense>
    </div>
  );
}

async function Sadrzaj({ params }: Pick<PageProps<"/prodavnica/[kategorija]">, "params">) {
  const { kategorija } = await params;
  const k = nadjiKategoriju(kategorija);
  if (!k) notFound();
  const proizvodi = PROIZVODI.filter((p) => p.kategorija === k.id);

  return (
    <>
      <header className="stranica-glava">
        <h1>{k.naziv}</h1>
        <p>{k.opis}</p>
      </header>
      <KategorijeNav aktivna={k.id} />
      <div className="mreza-proizvoda">
        {proizvodi.map((p) => (
          <KarticaProizvoda key={p.slug} proizvod={p} redni={PROIZVODI.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
