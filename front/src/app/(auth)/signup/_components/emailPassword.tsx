"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(2, { message: "Emailee bvten oruulna uu." })
    .max(50)
    .email({ message: "Emailee zuv oruulna uu!" }),
  password: z.string().min(3, {
    message: "password oruulna uu!",
  }),
});
interface Props {
  username: string;
}

export const EmailAndPassword = ({ username }: Props) => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await postAccount(values);
  };

  const postAccount = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await api.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      setAccount("Account created");
    } catch {
      setAccount("email exists or somthing went wrong try again!");
    }
  };

  return (
    <div>
      <div className="py-6 flex flex-col gap-[6px]">
        <div className="text-[24px] font-semibold text-black">
          Welcome, {username}
        </div>
        <p className="text-[14px] text-muted-foreground">
          Connect email and set a password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="w-[359px]">
                  <Input placeholder="Enter email here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
      {account && (
        <p
          className={`mt-4 text-center ${
            account === "User Already Exists"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {account}
        </p>
      )}
    </div>
  );
};
