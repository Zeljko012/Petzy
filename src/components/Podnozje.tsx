import Image from "next/image";
import Link from "next/link";

export function Podnozje() {
  return (
    <footer className="podnozje">
      <div className="omotac">
        <div className="podnozje-mreza">
          <div>
            <Image
              src="/brend/petzy-logo-svetli.svg"
              alt="Petzy"
              width={140}
              height={40}
              className="podnozje-logo"
              unoptimized
            />
            <p className="podnozje-slogan">Za tvog najboljeg drugara</p>
            <p className="mali" style={{ marginTop: "var(--s-3)", maxWidth: "36ch" }}>
              Oprema sa imenom tvog ljubimca, pravimo je po porudžbini u Srbiji. Plaćaš pouzećem, kad paket stigne.
            </p>
          </div>
          <nav aria-label="Podnožje, prodavnica">
            <h2>Prodavnica</h2>
            <ul>
              <li>
                <Link href="/prodavnica">Svi proizvodi</Link>
              </li>
              <li>
                <Link href="/dostava-i-povracaj">Dostava i povraćaj</Link>
              </li>
              <li>
                <Link href="/korpa">Korpa</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Podnožje, Petzy">
            <h2>Petzy</h2>
            <ul>
              <li>
                <Link href="/saveti">Saveti</Link>
              </li>
              <li>
                <Link href="/o-nama">O nama</Link>
              </li>
              <li>
                <a href="https://instagram.com/petzy.rs" rel="noopener">
                  Instagram @petzy.rs
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="podnozje-dno">© Petzy · petzy.rs · Sve cene su u dinarima (RSD).</p>
      </div>
    </footer>
  );
}
