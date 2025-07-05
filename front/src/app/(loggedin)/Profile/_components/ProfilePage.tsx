"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { RecentSupporters } from "./RecentDonations";
export const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-5 w-[643px]">
      <div className="flex flex-col border rounded-2xl bg-white p-6 gap-2">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img
              src={user?.profile.avatarImage}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="font-bold text-[20px]">{user?.profile.name}</h1>
          </div>
          <Link href={"/AccountSettings"}>
            <Button variant={"secondary"}>Edit page</Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-[16px]">
            About {user?.profile.name}
          </h1>
          <p>{user?.profile.about}</p>
        </div>
      </div>
      <div className="flex flex-col border rounded-2xl bg-white p-6 gap-3">
        <h1 className="font-semibold text-[16px]">Social media URL</h1>
        <p>{user?.profile.socialMedia}</p>
      </div>
      <div className="flex flex-col border rounded-2xl bg-white p-6 gap-3">
        <h1 className="font-semibold text-[16px]">Recent Supporters</h1>
        <RecentSupporters />
      </div>
    </div>
  );
};
