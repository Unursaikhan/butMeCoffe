import { Logo } from "../_assets/Logo";

export const HeaderSignedOut = () => {
  return (
    <div className="w-screen h-14 py-2 items-center justify-between px-20 text-black flex">
      <div className="flex gap-2">
        <Logo />
        <h1 className="font-bold text-[16px]">Buy Me Coffee</h1>
      </div>
    </div>
  );
};
