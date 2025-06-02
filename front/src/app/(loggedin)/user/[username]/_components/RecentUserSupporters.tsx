"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";

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

type RecentUserSupportersProps = {
  donations: Donation[];
  name: string;
};

export const RecentUserSupporters: React.FC<RecentUserSupportersProps> = ({
  donations,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedDonations = showAll ? donations : donations.slice(0, 1);

  if (displayedDonations.length === 0) {
    return (
      <div className="w-full border rounded-2xl p-6 ">
        <div className="flex flex-col gap-1 justify-center">
          <div className="p-[18px] w-full flex justify-center">
            <Heart className="fill-black" />
          </div>
          <p className="text-center font-semibold text-[16px]">
            Be the first one to support {name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {displayedDonations.map((donation, idx) => {
        const profile = donation.sender?.profile;
        if (!profile) return null;

        return (
          <div key={idx} className="flex gap-3 items-center">
            <div className="w-10">
              <img
                src={profile.avatarImage}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">
                {profile.name} bought a {donation.amount}$ coffee
              </p>
              <p className="w-135 text-sm text-gray-600">
                {donation.specialMessage}
              </p>
            </div>
          </div>
        );
      })}

      {donations.length > 1 && (
        <Button
          variant="outline"
          className="self-start w-full text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "See more"}
          {showAll ? <ChevronUp /> : <ChevronDown />}
        </Button>
      )}
    </div>
  );
};
