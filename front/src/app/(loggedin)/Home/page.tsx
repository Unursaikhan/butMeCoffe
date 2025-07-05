"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Menu } from "./_components/Menu";
import { HeaderWithPro } from "./_components/HeaderWithProfile";
import { DonationField } from "./_components/donationField";

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  return (
    <div className="w-screen flex justify-center">
      <div className="w-[1440px] flex flex-col justify-center">
        <HeaderWithPro />
        <div className="w-[1440px] flex mt-11 px-20">
          <Menu />
          <DonationField />
        </div>
      </div>
    </div>
  );
}
