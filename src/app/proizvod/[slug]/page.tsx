import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Konfigurator } from "@/components/Konfigurator";
import { IkonaKamion, IkonaKist, IkonaKvacica, IkonaNovac } from "@/components/Ikonice";
import { BESPLATNA_DOSTAVA_OD, DOSTAVA_CENA, PROIZVODI, nadjiProizvod } from "@/lib/katalog";
import { formatRSD } from "@/lib/format";

export function generateStaticParams() {
  return PROIZVODI.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proizvod/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = nadjiProizvod(slug);
  if (!p) return {};
  return { title: p.naziv, description: `${p.kratko} ${formatRSD(p.cena)}, plaćanje pouzećem.` };
}

export default function ProizvodStranica({ params }: PageProps<"/proizvod/[slug]">) {
  return (
    <Suspense fallback={<KosturProizvoda />}>
      <Sadrzaj params={params} />
    </Suspense>
  );
}

function KosturProizvoda() {
  return (
    <div className="omotac" aria-busy="true">
      <div className="mrvice" />
      <div className="proizvod">
        <div className="prikaz-scena kostur" style={{ aspectRatio: "4 / 3" }} />
        <div className="proizvod-info">
          <div className="kostur" style={{ height: "3rem", width: "80%" }} />
          <div className="kostur" style={{ height: "2rem", width: "40%" }} />
          <div className="kostur" style={{ height: "18rem" }} />
        </div>
      </div>
    </div>
  );
}

async function Sadrzaj({ params }: Pick<PageProps<"/proizvod/[slug]">, "params">) {
  const { slug } = await params;
  const p = nadjiProizvod(slug);
  if (!p) notFound();

  return (
    <div className="omotac">
      <nav className="mrvice" aria-label="Putanja">
        <ol>
          <li>
            <Link href="/">Početna</Link>
          </li>
          <li>
            <Link href="/prodavnica">Prodavnica</Link>
          </li>
          <li aria-current="page">{p.naziv}</li>
        </ol>
      </nav>

      <Konfigurator proizvod={p}>
        <section aria-labelledby="detalji">
          <h2 id="detalji" className="vizuelno-skriveno">
            Detalji proizvoda
          </h2>
          <ul className="detalji-lista">
            {p.detalji.map((d) => (
              <li key={d}>
                <IkonaKvacica />
                {d}
              </li>
            ))}
          </ul>
        </section>
        <div className="info-blokovi">
          <div className="info-blok">
            <IkonaKist />
            <div>
              <strong>{p.izrada}</strong>
              <span className="sporedno mali">
                {p.personalizovan ? "Pravimo ga tek kad poručiš, sa imenom koje upišeš." : "Imamo ga spremnog za slanje."}
              </span>
            </div>
          </div>
          <div className="info-blok">
            <IkonaNovac />
            <div>
              <strong>Plaćanje pouzećem</strong>
              <span className="sporedno mali">Plaćaš kuriru kad paket stigne.</span>
            </div>
          </div>
          <div className="info-blok">
            <IkonaKamion />
            <div>
              <strong>Dostava {formatRSD(DOSTAVA_CENA)}</strong>
              <span className="sporedno mali">
                Besplatna za porudžbine od {formatRSD(BESPLATNA_DOSTAVA_OD)}.{" "}
                <Link href="/dostava-i-povracaj">Više o dostavi</Link>
              </span>
            </div>
          </div>
        </div>
      </Konfigurator>
    </div>
  );
}
