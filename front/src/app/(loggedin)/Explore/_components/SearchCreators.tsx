import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchCreators = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium text-[20px]">Explore creators</h4>
      <div className="flex gap-1 pl-3 w-[250px] items-center border rounded-2xl">
        <Search className="w-4 h-4" />
        <Input
          className="border-none shadow-none"
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
