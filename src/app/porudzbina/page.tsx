import type { Metadata } from "next";
import { FormaPorudzbine } from "./FormaPorudzbine";

export const metadata: Metadata = {
  title: "Poručivanje",
  robots: { index: false },
};

export default function PorudzbinaStranica() {
  return (
    <div className="omotac">
      <FormaPorudzbine />
    </div>
  );
}
