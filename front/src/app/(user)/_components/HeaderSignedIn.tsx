"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "../_assets/Logo";
import { useAuth } from "@/app/_providers/AuthProvider";

export const HeaderSignedIn = () => {
  const { signOut } = useAuth();
  return (
    <div className="w-[1440px] h-14 py-2 items-center justify-between px-20 text-black flex">
      <div className="flex gap-2">
        <Logo />
        <h1 className="font-bold text-[16px]">Buy Me Coffee</h1>
      </div>
      <div className="flex gap-3">
        <Button onClick={signOut}>Log out</Button>
      </div>
    </div>
  );
};
