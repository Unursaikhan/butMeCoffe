import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export const AllUser = ({ users }: { users: any[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {users.map((user) => (
        <div
          className="flex flex-col gap-3 p-6 border rounded-2xl min-h-[224px]"
          key={user.id}
        >
          <div key={user.id} className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={user.profile.avatarImage}
                  alt={user.profile.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <h4 className="font-semibold text-[20px]">
                  {user.profile.name}
                </h4>
              </div>
            </div>
            <Button variant={"secondary"}>
              View profile
              <ExternalLinkIcon />
            </Button>
          </div>
          <div className="flex gap-5">
            <div className="flex-5 flex flex-col gap-2">
              <div className="h-9 flex items-center">
                <h1 className="font-semibold text-[16px]">
                  About {user.profile.name}
                </h1>
              </div>
              <div className="text-[14px]">{user.profile.about}</div>
            </div>
            <div className="flex-4 flex flex-col gap-2">
              <div className="h-9 flex items-center">
                <h1 className="font-semibold text-[16px]">Social media URL</h1>
              </div>
              <div className="text-[14px]">{user.profile.socialMedia}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
