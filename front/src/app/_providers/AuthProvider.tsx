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
import { api, setAuthToken } from "@/axios";

export type Usertype = {
  id: string;
  email: string;
  image: string;
  profile: {
    id: number;
    image: string;
    name: string;
    avatarImage: string;
    backGroundImage: string;
    socialMedia: string;
    about: string;
    successMessage: string;
  };
  bankcards: {
    id: number;
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
  }[];
  username: string;
};
type AuthContextType = {
  user?: Usertype;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user?: Usertype) => void;
  getUser: () => Promise<void>;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Usertype>();
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
    setAuthToken(null);
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/");
  };
  const getUser = async () => {
    try {
      const { data } = await api.get(`/auth/refresh`);
      setUser(data);
    } catch {}
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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
