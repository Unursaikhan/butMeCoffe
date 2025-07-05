"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const schema = z.object({
  successMessage: z.string().min(1, "Success message cannot be empty"),
});

type FormValues = z.infer<typeof schema>;

export const ChangeSuccessMessage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      successMessage: "",
    },
  });

  useEffect(() => {
    if (user?.profile?.successMessage) {
      form.setValue("successMessage", user.profile.successMessage);
    }
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    if (!user?.id) {
      toast.error("User not logged in.");
      return;
    }

    setLoading(true);
    try {
      await api.put(
        "/profile/success-message", // 👈 Updated route
        {
          userId: user.id, // 👈 Required by backend controller
          successMessage: data.successMessage,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Success message updated.");
    } catch {
      toast.error("Failed to update message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 border rounded-2xl">
      <h2 className="text-black font-bold text-[16px]">
        Change Success Message
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="successMessage"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Success Message</FormLabel>
                <FormControl>
                  <Input placeholder="Thank you for your support!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Message"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
