import Link from "next/link";
import { IkonaSapa } from "@/components/Ikonice";

export default function NijePronadjeno() {
  return (
    <div className="omotac">
      <div className="prazna-korpa">
        <IkonaSapa />
        <h1>Ova stranica je pobegla u šetnju.</h1>
        <p className="sporedno">Možda je link star, ili je stranica premeštena.</p>
        <Link href="/" className="dugme dugme-glavno">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
