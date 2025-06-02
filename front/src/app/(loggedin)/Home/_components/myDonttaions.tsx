"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { env } from "process";
type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
};
export const MyDontaions = () => {
  const [copied, setCopied] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const { user } = useAuth();
  const getMyDonations = async () => {
    try {
      const response = await api.get("/donation/getMy", {
        params: {
          userId: user?.id,
        },
      });

      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };
  useEffect(() => {
    getMyDonations();
  }, []);
  const totalAmount = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  const handleCopyLink = () => {
    const link = `${window.origin}/user/${user?.username}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-6 flex flex-col gap-3 border rounded-2xl">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image
            src={user?.profile?.avatarImage || "ASDASD"}
            alt="Profile Preview"
            width={48}
            height={48}
            className="h-[48px] object-fit rounded-full w-[48px]"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-[16px] text-black">
              {user?.profile?.name}
            </h1>
            <p className="text-[14px]">{user?.profile?.socialMedia}</p>
          </div>
        </div>
        <div>
          <Button onClick={handleCopyLink} variant="outline">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Share page link"}
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-[20px]">Earnings</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Last 30 Days</SelectItem>
              <SelectItem value="dark">Last 90 Days</SelectItem>
              <SelectItem value="system">Alltime</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h1 className="font-bold text-[36px]">{totalAmount}$</h1>
      </div>
    </div>
  );
};
