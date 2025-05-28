"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { HeaderWithPro } from "../Home/_components/HeaderWithProfile";
import { Menu } from "./_components/menu";

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  return (
    <div className="w-screen flex justify-center">
      <div className="w-[1440px] flex flex-col justify-center">
        <HeaderWithPro />
        <div className="w-[1440px] flex mt-11">
          <Menu />
        </div>
      </div>
    </div>
  );
}
