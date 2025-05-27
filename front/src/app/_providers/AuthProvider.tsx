"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Username } from "../(auth)/signup/_components/username";
import { api, setAuthToken } from "@/axios";

type User = {
  id: string;
  email: string;
  image: string;
  profile: {
    id: number;
  };
  backcard: {
    id: number;
  };
  username: string;
};
type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user?: User) => void;
  getUser: () => Promise<void>;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-in`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/");
      return data.user;
    } catch {
      toast.error("Failed to log in");
      return undefined;
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-up`, {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/");
  };
  const getUser = async () => {
    try {
      const { data } = await api.get(`/auth/refresh`);
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, setUser, getUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
