"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HeaderWithPro } from "../../Home/_components/HeaderWithProfile";
import { UserProfilePage } from "./_components/Profilepage";
import { UserDonationPage } from "./_components/UserDonationPage";

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
  id: number;
  username: string;
  profile: Profile;
  receivedDonations: Donation[];
};

export default function ProfilePage() {
  const Params = useParams();

  const { username } = Params;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/profile/getProByUsername/${username}`
      );
      if (!res.ok) throw new Error("User not found");
      const data: UserProfile = await res.json();
      setUser(data);
    } catch {
      router.push("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username, router]);

  if (loading) return <p>Loading…</p>;
  if (!user) return <p>User not found</p>;

  const hasImage =
    user.profile.backGroundImage && user.profile.backGroundImage.trim() !== "";

  return (
    <div className="w-screen flex justify-center">
      <div className="w-[1440px] flex flex-col justify-center relative">
        <HeaderWithPro />
        <div className="w-full h-[319px] absolute top-14 bg-[#F4F4F5] overflow-hidden rounded-xl">
          {hasImage && (
            <img
              src={user.profile.backGroundImage}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="w-full mt-[233px] gap-5 relative z-10 flex justify-center">
          <UserProfilePage user={user} />
          <UserDonationPage user={user} fetchUser={fetchUser} />
        </div>
      </div>
    </div>
  );
}
