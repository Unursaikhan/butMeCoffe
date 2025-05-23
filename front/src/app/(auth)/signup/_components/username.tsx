"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
});
export const Username = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col">
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
          <Link href="/login">
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};
