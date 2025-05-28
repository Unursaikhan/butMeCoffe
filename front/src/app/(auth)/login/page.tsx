"use client";
import { Logo } from "@/app/(user)/_assets/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Login } from "./_components/login";

export default function Home() {
  return (
    <div className="w-[1440px] flex gap-5  h-screen">
      <div className="flex-1 bg-amber-400 relative flex items-center justify-center">
        <Link href={"/"}>
          <div className="flex gap-2 absolute top-8 left-8">
            <Logo />
            <h1 className="font-bold text-[16px]">Buy Me Coffee</h1>
          </div>
        </Link>
        <div className="flex flex-col w-[455px] gap-10 items-center">
          <img src="/signupLogo.png" className="w-60 h-60" alt="" />
          <div className="flex flex-col gap-3">
            <h1 className="w-full font-bold text-[24px] text-center">
              Fund your creative work
            </h1>
            <p className="text-center">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1  relative flex items-center justify-center">
        <Link href="/signup">
          <Button className="absolute top-8 right-8 h-10" variant={"outline"}>
            Sign up
          </Button>
        </Link>
        <Login />
      </div>
    </div>
  );
}
