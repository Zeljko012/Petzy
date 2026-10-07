import type { Metadata } from "next";
import { BESPLATNA_DOSTAVA_OD, DOSTAVA_CENA } from "@/lib/katalog";
import { formatRSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dostava i povraćaj",
  description: "Kako i kada stiže tvoja porudžbina, plaćanje pouzećem i pravila povraćaja.",
};

export default function DostavaIPovracaj() {
  return (
    <div className="omotac">
      <article className="tekst-stranica">
        <p className="privremeno">Privremeni uslovi, proveriti pre lansiranja</p>
        <h1>Dostava i povraćaj</h1>
        <p className="uvod">Sve što treba da znaš pre nego što poručiš, bez sitnih slova.</p>

        <h2>Plaćanje</h2>
        <p>
          Za sada primamo samo plaćanje pouzećem: plaćaš gotovinom kuriru kad paket stigne. Ne tražimo karticu ni
          uplatu unapred.
        </p>

        <h2>Izrada i dostava</h2>
        <ul>
          <li>Personalizovane proizvode pravimo po porudžbini, obično za 3 do 5 radnih dana.</li>
          <li>Proizvode bez imena šaljemo za 1 do 2 radna dana.</li>
          <li>Kurir isporučuje na kućnu adresu u Srbiji, obično sledećeg radnog dana od slanja.</li>
          <li>
            Dostava je {formatRSD(DOSTAVA_CENA)}, a besplatna za porudžbine od {formatRSD(BESPLATNA_DOSTAVA_OD)}.
          </li>
        </ul>

        <h2>Povraćaj</h2>
        <p>
          Personalizovani proizvodi se rade po porudžbini i ne mogu se vratiti, osim ako stignu oštećeni. Ako se to
          desi, javi nam se u roku od 14 dana sa fotografijom i pravimo novi bez troška za tebe.
        </p>
        <p>
          Proizvode bez imena možeš da vratiš u roku od 14 dana od prijema, nekorišćene i u originalnom pakovanju.
        </p>
      </article>
    </div>
  );
}
