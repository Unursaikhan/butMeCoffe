import { useAuth } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { Logo } from "../../../(user)/_assets/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export const HeaderWithPro = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="w-[1440px] h-14 py-2 items-center justify-between px-20 text-black flex">
      <Link href={"/Home"}>
        <div className="flex gap-2">
          <Logo />
          <h1 className="font-bold text-[16px]">Buy Me Coffee</h1>
        </div>
      </Link>
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-4">
            {" "}
            <Image
              src={
                user?.profile?.avatarImage ||
                "http://res.cloudinary.com/dm1u3mjr4/image/upload/v1748853653/ovuzestg4yba7u8avzp9.png"
              }
              alt="Profile Preview"
              width={40}
              height={40}
              className="h-[40px] object-fit rounded-full w-[40px]"
            />
            {user?.profile?.name}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button onClick={signOut} className="w-40">
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
