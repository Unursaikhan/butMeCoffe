"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { formatDistanceToNow } from "date-fns";

type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
  sender: {
    profile: {
      avatarImage: string;
      name: string;
      socialMedia: string;
    };
  };
};

export const AllDonation = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filterAmount, setFilterAmount] = useState<string | undefined>();

  const getAllDonations = async () => {
    try {
      const response = await api.get("/donation/get");
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching all donations:", error);
    }
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  const filteredDonations = filterAmount
    ? donations.filter((donation) => donation.amount === parseInt(filterAmount))
    : donations;

  return (
    <div className="flex gap-3 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[16px]">Recent transactions</h1>
        <Select onValueChange={setFilterAmount}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1$</SelectItem>
            <SelectItem value="2">2$</SelectItem>
            <SelectItem value="5">5$</SelectItem>
            <SelectItem value="10">10$</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex border rounded-2xl h-140 overflow-scroll flex-col gap-4 p-6">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <div className="flex flex-col gap-1" key={donation.id}>
              <div
                key={donation.id}
                className="rounded-2xl p-3 bg-white flex justify-between items-center "
              >
                <div className="flex items-center gap-3">
                  <img
                    src={donation.sender.profile.avatarImage}
                    alt={donation.sender.profile.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium text-[14px]">
                      {donation.sender.profile.name}
                    </div>
                    <div className="text-[12px] ">
                      {donation.sender.profile.socialMedia}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-1">
                  <div className="font-bold text-[16px]">
                    + {donation.amount}$
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(donation.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
              <div className="px-3 text-[14px] text-black">
                {donation.specialMessage}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No donations found.</p>
        )}
      </div>
    </div>
  );
};
