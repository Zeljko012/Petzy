import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { IkonaStetoskop } from "@/components/Ikonice";
import { SAVETI, nadjiSavet } from "@/lib/saveti";
import { formatDatum } from "@/lib/format";

export function generateStaticParams() {
  return SAVETI.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/saveti/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = nadjiSavet(slug);
  return s ? { title: s.naslov, description: s.uvod } : {};
}

export default function SavetStranica({ params }: PageProps<"/saveti/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="omotac" aria-busy="true">
          <div className="tekst-stranica">
            <div className="kostur" style={{ height: "3rem", width: "85%" }} />
            <div className="kostur" style={{ height: "12rem" }} />
          </div>
        </div>
      }
    >
      <Sadrzaj params={params} />
    </Suspense>
  );
}

async function Sadrzaj({ params }: Pick<PageProps<"/saveti/[slug]">, "params">) {
  const { slug } = await params;
  const s = nadjiSavet(slug);
  if (!s) notFound();

  return (
    <div className="omotac">
      <nav className="mrvice" aria-label="Putanja">
        <ol>
          <li>
            <Link href="/saveti">Saveti</Link>
          </li>
          <li aria-current="page">{s.tema}</li>
        </ol>
      </nav>
      <article className="tekst-stranica">
        <h1>{s.naslov}</h1>
        <p className="clanak-meta">
          <span>{s.tema}</span>
          <span>{formatDatum(s.datum)}</span>
          <span>{s.minuta} min čitanja</span>
        </p>
        <p className="uvod">{s.uvod}</p>
        {s.sadrzaj.map((b, i) =>
          b.tip === "h2" ? (
            <h2 key={i}>{b.tekst}</h2>
          ) : b.tip === "p" ? (
            <p key={i}>{b.tekst}</p>
          ) : (
            <ul key={i}>
              {b.stavke.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ),
        )}
        {s.zdravlje && (
          <aside className="veterinar" aria-label="Napomena">
            <IkonaStetoskop />
            <p>
              Ovi saveti su opšti i ne zamenjuju pregled. Ako primetiš bilo šta što te brine, prava adresa je tvoj
              veterinar.
            </p>
          </aside>
        )}
      </article>
    </div>
  );
}
