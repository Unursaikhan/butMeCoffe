"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Coffee } from "lucide-react";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { toast } from "sonner";

type UserProfile = {
  id: number;
  username: string;
  profile: {
    name: string;
    avatarImage: string;
    backGroundImage: string;
    about: string;
    socialMedia: string;
    successMessage: string;
  };
};

interface UserDonationPageProps {
  user: UserProfile;
  fetchUser: () => Promise<void>;
}

export const UserDonationPage: React.FC<UserDonationPageProps> = ({
  user,
  fetchUser,
}) => {
  const { user: currentUser } = useAuth();

  const [amount, setAmount] = useState<number | null>(null);
  const [socialMediaUrl, setSocialMediaUrl] = useState<string>("");
  const [specialMessage, setSpecialMessage] = useState<string>("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (currentUser?.profile?.socialMedia) {
      setSocialMediaUrl(currentUser.profile.socialMedia);
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error("You must be signed in to donate.");
      return;
    }
    if (!amount) {
      toast.error("Please select an amount.");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/donation/donate",
        {
          amount,
          specialMessage,
          recipientId: user.id,
          senderId: currentUser.id,
          socialMedia: socialMediaUrl.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchUser();

      toast.success(`You donated $${amount} to ${user.profile.name}!`);
      setSpecialMessage("");
    } catch {
      toast.error("Failed to send donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[628px] p-6 gap-8 bg-white rounded-2xl border">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-[24px]">
          Buy {user.profile.name} a coffee
        </h1>
        <p className="text-sm text-gray-600">
          Select an amount, share your BuyMeCoffee or social link, and add a
          message.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-[14px]">Select amount:</p>
        <div className="flex gap-3">
          {[1, 2, 5, 10].map((amt) => {
            const isSelected = amount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`
                  w-20 h-10 flex justify-center items-center gap-2 rounded-[6px] 
                  ${isSelected ? "border-3 border-black" : "bg-[#F4F4F5]"} 
                  text-gray-800 hover:border-[#A8A8A8]
                `}
              >
                <Coffee className="w-4 h-4" />
                <span className="font-medium">${amt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[14px]">
            BuyMeCoffee or social account URL:
          </label>
          <Input
            placeholder="https://..."
            value={socialMediaUrl}
            onChange={(e) => setSocialMediaUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[14px]">Special message:</label>
          <Textarea
            placeholder="Type your message..."
            className="h-[80px]"
            value={specialMessage}
            onChange={(e) => setSpecialMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="flex">
        <Button className="w-full" disabled={loading} onClick={handleSubmit}>
          {loading ? "Processing..." : "Support"}
        </Button>
      </div>
    </div>
  );
};
