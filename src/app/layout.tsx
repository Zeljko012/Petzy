import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Zaglavlje } from "@/components/Zaglavlje";
import { Podnozje } from "@/components/Podnozje";
import "@/styles/tokens.css";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petzy.rs"),
  title: {
    default: "Petzy | Oprema sa imenom tvog ljubimca",
    template: "%s | Petzy",
  },
  description:
    "Nosači za činije, kašičice za hranu, privesci, NFC privesci i držači kesica sa imenom tvog psa ili mačke. Biraš boje, vidiš izgled odmah, plaćaš pouzećem.",
  openGraph: {
    siteName: "Petzy",
    locale: "sr_RS",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF4E6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr-Latn" className={nunito.variable}>
      <body>
        <a className="preskoci" href="#sadrzaj">
          Preskoči na sadržaj
        </a>
        <Zaglavlje />
        <main id="sadrzaj">{children}</main>
        <Podnozje />
      </body>
    </html>
  );
}
