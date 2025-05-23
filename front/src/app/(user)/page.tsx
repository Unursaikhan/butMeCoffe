import Image from "next/image";
import { HeaderSignedOut } from "./_components/HeaderSingedOut";

export default function Home() {
  return (
    <div className="w-screen flex justify-center">
      <HeaderSignedOut />
    </div>
  );
}
