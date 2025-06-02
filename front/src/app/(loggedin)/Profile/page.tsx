"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { HeaderSignedIn } from "../../(user)/_components/HeaderSignedIn";
import { HeaderWithPro } from "../Home/_components/HeaderWithProfile";
import { CoverImage } from "./_components/coverImage";
import { ProfilePage } from "./_components/ProfilePage";
import { DonatePage } from "./_components/DonatePage";

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  return (
    <div className="w-screen flex justify-center">
      <div className="w-[1440px] flex flex-col justify-center relative">
        <HeaderWithPro />
        <div className="w-[1440px] flex-col flex ">
          <CoverImage />
          <div className="w-full mt-[233px] relative z-10 justify-center flex gap-5">
            <ProfilePage />
            <DonatePage />
          </div>
        </div>
      </div>
    </div>
  );
}
