import Link from "next/link";

export const Menu = () => {
  return (
    <div className="flex flex-col mx-20 gap-1 w-[250px]">
      <Link href={"/Home"}>
        <div className="bg-white flex h-9 items-center px-4 hover:bg-[#F4F4F5]">
          <p className="text-[14px] font-medium">Home</p>
        </div>
      </Link>
      <div className="bg-[#F4F4F5] flex items-center h-9 px-4 hover:bg-[#F4F4F5]">
        <p className="text-[14px] font-medium">Explore</p>
      </div>
      <Link href={"/ViewPage"}>
        <div className="bg-white flex items-center h-9 px-4 hover:bg-[#F4F4F5]">
          <p className="text-[14px] font-medium">View page</p>
        </div>
      </Link>
      <Link href={"/AccountSettings"}>
        <div className="bg-white flex items-center h-9 px-4 hover:bg-[#F4F4F5]">
          <p className="text-[14px] font-medium">Account settings</p>
        </div>
      </Link>
    </div>
  );
};
