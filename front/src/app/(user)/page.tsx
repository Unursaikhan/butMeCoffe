import Image from "next/image";
import { HeaderSignedOut } from "./_components/HeaderSingedOut";

export default function Home() {
  return (
    <div className="w-screen h-screen flex gap-5">
      <HeaderSignedOut />
    </div>
  );
}
