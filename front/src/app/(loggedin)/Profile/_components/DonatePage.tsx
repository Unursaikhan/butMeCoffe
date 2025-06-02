"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Coffee } from "lucide-react";

export const DonatePage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col w-[628px] p-6 gap-8 bg-white rounded-2xl border">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-[24px]">Buy {user?.profile.name}</h1>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[14px]">Select amount:</p>
          <div className="flex gap-3">
            <div className="w-18 h-10 flex justify-center gap-2 rounded-[6px] bg-[#F4F4F5] items-center">
              <Coffee />
              <p className="font-medium text-[14px]">$1</p>
            </div>
            <div className="w-18 h-10 flex justify-center gap-2 rounded-[6px] bg-[#F4F4F5] items-center">
              <Coffee />
              <p className="font-medium text-[14px]">$2</p>
            </div>
            <div className="w-18 h-10 flex justify-center gap-2 rounded-[6px] bg-[#F4F4F5] items-center">
              <Coffee />
              <p className="font-medium text-[14px]">$5</p>
            </div>
            <div className="w-18 h-10 flex justify-center gap-2 rounded-[6px] bg-[#F4F4F5] items-center">
              <Coffee />
              <p className="font-medium text-[14px]">$10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <p>Enter BuyMeCoffee or social acount URL:</p>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <p>Special message:</p>
          <Textarea />
        </div>
      </div>
      <Button className="w-full" variant={"secondary"}>
        Support
      </Button>
    </div>
  );
};
