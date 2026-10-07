import Link from "next/link";
import { KarticaProizvoda } from "@/components/KarticaProizvoda";
import { ProbniSto } from "@/components/ProbniSto";
import { IkonaKamion, IkonaKist, IkonaKvacica, IkonaNovac, IkonaSrce, IkonaStrelica } from "@/components/Ikonice";
import { BESPLATNA_DOSTAVA_OD, KATEGORIJE, PROIZVODI, altTekst, nadjiProizvod, podrazumevaneBoje } from "@/lib/katalog";
import { Ilustracija } from "@/components/Ilustracija";
import { SAVETI } from "@/lib/saveti";
import { formatDatum, formatRSD } from "@/lib/format";

export default function Pocetna() {
  const drzac = nadjiProizvod("drzac-cinija-rucak")!;

  return (
    <>
      <section className="hero">
        <div className="omotac hero-mreza">
          <div>
            <h1>
              Oprema koja nosi <em>ime</em> tvog najboljeg drugara
            </h1>
            <p className="hero-uvod">
              Nosači za činije, kašičice, privesci i držači kesica sa imenom tvog psa ili mačke. Biraš boje, vidiš izgled odmah, a
              mi ga pravimo baš za vas.
            </p>
            <div className="hero-akcije">
              <Link href="/prodavnica" className="dugme dugme-sporedno">
                Pogledaj sve proizvode
              </Link>
            </div>
            <ul className="hero-cinjenice">
              <li>
                <IkonaKvacica /> Plaćaš pouzećem
              </li>
              <li>
                <IkonaKvacica /> Izrada za 3 do 5 dana
              </li>
              <li>
                <IkonaKvacica /> Ime i ćirilicom
              </li>
            </ul>
          </div>
          <ProbniSto proizvod={drzac} />
        </div>
      </section>

      <section className="sekcija" aria-labelledby="kako-radi">
        <div className="omotac">
          <div className="sekcija-glava">
            <h2 id="kako-radi">Od imena do vrata za nedelju dana</h2>
          </div>
          <ol className="koraci">
            <li className="korak">
              <h3>Upiši ime</h3>
              <p>Do 12 slova, latinicom ili ćirilicom. Odmah vidiš kako izgleda na proizvodu.</p>
            </li>
            <li className="korak">
              <h3>Izaberi boje</h3>
              <p>Nosači i kašičice su iz dva dela: biraš boju svakog dela, da se uklopi u tvoj dom.</p>
            </li>
            <li className="korak">
              <h3>Mi pravimo, ti plaćaš kad stigne</h3>
              <p>Izrađujemo po porudžbini i šaljemo kurirom. Plaćaš pouzećem, kuriru na vratima.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="sekcija" aria-labelledby="kategorije">
        <div className="omotac">
          <div className="sekcija-glava">
            <h2 id="kategorije">Šta pravimo</h2>
            <Link href="/prodavnica" className="link-strelica">
              Svi proizvodi <IkonaStrelica />
            </Link>
          </div>
          <div className="mreza-kategorija">
            {KATEGORIJE.map((k, i) => {
              const proizvodi = PROIZVODI.filter((p) => p.kategorija === k.id);
              const prvi = proizvodi[0];
              if (!prvi) return null;
              const boje = podrazumevaneBoje(prvi);
              const ime = ["Maks", "Luna", "Bobi", "Mila", "Leo"][i % 5];
              return (
                <Link key={k.id} href={`/prodavnica/${k.id}`} className="kategorija-plocica">
                  <div className="kartica-slika">
                    <Ilustracija vrsta={prvi.ilustracija} boje={boje} ime={ime} opis={altTekst(prvi, ime, boje)} />
                  </div>
                  <strong>{k.naziv}</strong>
                  <span className="mali sporedno">
                    {proizvodi.length === 1 ? "1 proizvod" : `${proizvodi.length} proizvoda`}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sekcija" aria-labelledby="proizvodi">
        <div className="omotac">
          <div className="sekcija-glava">
            <h2 id="proizvodi">Napravljeno za tvog ljubimca</h2>
          </div>
          <div className="mreza-proizvoda">
            {PROIZVODI.slice(0, 4).map((p, i) => (
              <KarticaProizvoda key={p.slug} proizvod={p} redni={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="traka" aria-labelledby="zasto">
        <div className="omotac traka-mreza">
          <div>
            <h2 id="zasto" className="vizuelno-skriveno">
              Zašto Petzy
            </h2>
            <p className="citat">
              Oprema za ljubimce je uglavnom bezlična plastika. <span>Mi pravimo stvari sa imenom,</span> koje
              izgledaju lepo u tvom domu.
            </p>
          </div>
          <ul className="traka-lista">
            <li>
              <IkonaKist />
              <h3>Svaki komad se pravi po porudžbini</h3>
              <p>Ne čeka u magacinu. Pre izrade proveravamo ime, a primerak koji nije savršen ne šaljemo.</p>
            </li>
            <li>
              <IkonaNovac />
              <h3>Plaćaš tek kad paket stigne</h3>
              <p>Pouzećem, kuriru na vratima. Bez kartica i bez uplata unapred.</p>
            </li>
            <li>
              <IkonaKamion />
              <h3>Dostava na kućnu adresu</h3>
              <p>Besplatna dostava za porudžbine od {formatRSD(BESPLATNA_DOSTAVA_OD)}.</p>
            </li>
            <li>
              <IkonaSrce />
              <h3>Saveti kojima možeš da veruješ</h3>
              <p>Pišemo o nezi i dresuri, a za sve zdravstveno upućujemo na veterinara.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="sekcija" aria-labelledby="saveti">
        <div className="omotac">
          <div className="sekcija-glava">
            <h2 id="saveti">Saveti iz komšiluka</h2>
            <Link href="/saveti" className="link-strelica">
              Svi saveti <IkonaStrelica />
            </Link>
          </div>
          <ul className="lista-saveta">
            {SAVETI.map((s) => (
              <li key={s.slug}>
                <Link href={`/saveti/${s.slug}`} className="savet-red">
                  <span className="savet-tema">{s.tema}</span>
                  <div>
                    <h3>{s.naslov}</h3>
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
      </section>
    </>
  );
}
