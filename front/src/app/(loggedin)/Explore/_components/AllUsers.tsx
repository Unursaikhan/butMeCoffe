// components/AllUser.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { Usertype } from "@/app/_providers/AuthProvider";

export const AllUser = ({ users }: { users: Usertype[] }) => {
  return (
    <div className="flex flex-col gap-6 max-h-[880px] overflow-auto">
      {users.map((u) => (
        <div
          key={u.id}
          className="flex flex-col gap-3 p-6 border rounded-2xl min-h-[224px] transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={u.profile.avatarImage}
                alt={u.profile.name}
                className="w-10 h-10 object-cover rounded-full"
              />
              <Link
                href={`/user/${u.username}`}
                key={u.id}
                className="block hover:shadow-lg"
              >
                <h4 className="font-semibold text-[20px] hover:underline">
                  {u.profile.name}
                </h4>
              </Link>
            </div>
            <Link
              href={`/user/${u.username}`}
              key={u.id}
              className="block hover:shadow-lg"
            >
              <Button
                variant="secondary"
                className=" underline-offset-4 hover:underline"
                size="sm"
              >
                View profile
                <ExternalLinkIcon className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="font-semibold text-[16px]">
                About {u.profile.name}
              </h1>
              <p className="text-[14px] line-clamp-3">{u.profile.about}</p>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="font-semibold text-[16px]">Social media URL</h1>
              <p className="text-[14px] line-clamp-3">
                {u.profile.socialMedia}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
