import type { Metadata } from "next";
import { Korpa } from "./Korpa";

export const metadata: Metadata = {
  title: "Korpa",
  robots: { index: false },
};

export default function KorpaStranica() {
  return (
    <div className="omotac">
      <header className="stranica-glava">
        <h1>Tvoja korpa</h1>
      </header>
      <Korpa />
    </div>
  );
}
