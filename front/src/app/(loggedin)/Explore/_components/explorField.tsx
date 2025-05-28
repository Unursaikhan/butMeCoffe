"use client";
import { useEffect, useState } from "react";
import { AllUser } from "./AllUsers";
import { SearchCreators } from "./SearchCreators";
import { api } from "@/axios";

type User = {
  id: number;
  profile: {
    name: string;
    avatarImage: string;
    socialMedia: string;
    about: string;
  };
};

export const ExploreField = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const getAllUsers = async () => {
    try {
      const response = await api.get("/user/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.profile.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 px-6 pt-6 h-[860px] flex-1">
      <SearchCreators search={search} setSearch={setSearch} />
      <AllUser users={filteredUsers} />
    </div>
  );
};
