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
import { useState } from "react";
import { api } from "@/axios";
import { EmailAndPassword } from "./emailPassword";
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});
export const Username = () => {
  const [step, setStep] = useState(1);
  const [userExists, setUserExists] = useState("");
  const [savedUsername, setSavedUsername] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await postAccount(values);
  };

  const postAccount = async ({ username }: { username: string }) => {
    try {
      const response = await api.post("/auth/user-exists", { username });

      if (response.data.exists) {
        setUserExists("User Already Exists");
        setStep(1);
      } else {
        setUserExists("User Available");
        setSavedUsername(username);
        setTimeout(() => setStep(2), 1000);
      }
    } catch {
      setUserExists("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col">
      {step === 1 ? (
        <div>
          <div className="py-6 flex flex-col gap-[6px]">
            <div className="text-[24px] font-semibold text-black">
              Create Your Account
            </div>
            <p className="text-[14px] text-muted-foreground">
              Choose a username for your page
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl className="w-[359px]">
                      <Input placeholder="Enter username here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
          {userExists && (
            <p
              className={`mt-4 text-center ${
                userExists === "User Already Exists"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {userExists}
            </p>
          )}
        </div>
      ) : (
        <EmailAndPassword username={savedUsername} />
      )}
    </div>
  );
};
