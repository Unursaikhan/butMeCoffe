"use client";

import React, { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RecentUserSupporters } from "./RecentUserSupporters";

type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  createdAt: string;
  sender: {
    profile: {
      name: string;
      avatarImage: string;
    } | null;
  };
};

type Profile = {
  name: string;
  about: string;
  avatarImage: string;
  socialMedia: string;
  backGroundImage: string;
  successMessage: string;
};

type UserProfile = {
  username: string;
  profile: Profile;
  receivedDonations: Donation[];
};

interface UserProfilePageProps {
  user: UserProfile;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
  const [showAll, setShowAll] = useState(false);
  const donations = user.receivedDonations;
  const shownDonations = showAll ? donations : donations.slice(0, 1);

  return (
    <div className="flex flex-col gap-5 w-[643px]">
      <div className="flex flex-col border rounded-2xl bg-white p-6 gap-2">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img
              src={user.profile.avatarImage}
              alt={user.profile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="font-bold text-[20px]">{user.profile.name}</h1>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-[16px]">
            About {user.profile.name}
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
        <RecentUserSupporters
          donations={user.receivedDonations}
          name={user.profile.name}
        />
      </div>
    </div>
  );
};
