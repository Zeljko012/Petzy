import type { Metadata } from "next";
import { Prodavnica } from "./Prodavnica";

export const metadata: Metadata = {
  title: "Prodavnica",
  description: "Držači činija, kutijice za kesice, poklopci za tegle i privesci sa imenom tvog ljubimca.",
};

export default function ProdavnicaStranica() {
  return (
    <div className="omotac">
      <header className="stranica-glava">
        <h1>Sve za tvog drugara, sa njegovim imenom</h1>
        <p>Svaki proizvod pravimo po porudžbini, u bojama koje izabereš. Plaćaš pouzećem.</p>
      </header>
      <Prodavnica />
    </div>
  );
}
