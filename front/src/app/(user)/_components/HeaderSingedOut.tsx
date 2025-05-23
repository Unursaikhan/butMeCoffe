import { Button } from "@/components/ui/button";
import { Logo } from "../_assets/Logo";
import Link from "next/link";

export const HeaderSignedOut = () => {
  return (
    <div className="w-[1440px] h-14 py-2 items-center justify-between px-20 text-black flex">
      <div className="flex gap-2">
        <Logo />
        <h1 className="font-bold text-[16px]">Buy Me Coffee</h1>
      </div>
      <div className="flex gap-3">
        <Link href="/signup">
          <Button>Sign up</Button>
        </Link>
        <Button variant="outline">Log in</Button>
      </div>
    </div>
  );
};
