import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nama",
  description: "Petzy pravi opremu sa imenom tvog ljubimca i piše savete kojima možeš da veruješ.",
};

export default function ONama() {
  return (
    <div className="omotac">
      <article className="tekst-stranica">
        <p className="privremeno">Privremeni tekst, zameniti pravom pričom</p>
        <h1>Zašto pravimo Petzy</h1>
        <p className="uvod">
          Oprema za ljubimce je uglavnom bezlična plastika. Činija kao i svaka druga, kutijica kao i svaka druga. A
          tvoj ljubimac nije kao svaki drugi.
        </p>
        <p>
          Zato pravimo stvari sa imenom: držače činija, kutijice za kesice, poklopce i priveske, u bojama koje se
          uklapaju u tvoj dom, a ne kriju u ćošku. Svaki komad nastaje tek kad ga poručiš, i pre slanja ga
          proveravamo. Ako nije savršen, pravimo novi.
        </p>
        <h2>Saveti, ne reklame</h2>
        <p>
          Pored opreme pišemo i <Link href="/saveti">savete o nezi i dresuri</Link>. Kratko, provereno i bez
          straha. Kad je u pitanju zdravlje, ne glumimo veterinare: kažemo ti da pitaš svog.
        </p>
        <h2>Javi nam se</h2>
        <p>
          Najbrže nas nađeš na Instagramu <a href="https://instagram.com/petzy.rs">@petzy.rs</a>. Pošalji nam
          fotku svog drugara sa njegovim Petzy držačem, to nam ulepša dan.
        </p>
      </article>
    </div>
  );
}
