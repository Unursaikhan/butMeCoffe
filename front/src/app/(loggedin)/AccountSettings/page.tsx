"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { HeaderWithPro } from "../Home/_components/HeaderWithProfile";
import { Menu } from "./_components/menu";
import { MyAccount } from "./_components/myaccount";

export default function Home() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="w-[1440px] flex flex-col ">
        <HeaderWithPro />
        <div className="flex flex-1 overflow-hidden mt-11 ">
          <div className="w-[250px] mx-20 overflow-y-auto ">
            <Menu />
          </div>
          <div className="flex-1 overflow-y-auto">
            <MyAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
