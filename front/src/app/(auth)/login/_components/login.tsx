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
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_providers/AuthProvider";
const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Emailee bvten oruulna uu." })
    .max(50)
    .email({ message: "Emailee zuv oruulna uu!" }),
  password: z.string().min(3, {
    message: "password oruulna uu!",
  }),
});
export const Login = () => {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values.email, values.password);
      if (!user) return;
      else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="py-6 flex flex-col gap-[6px]">
        <div className="text-[24px] font-semibold text-black">Welcome back</div>
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
                  <Input placeholder="Enter username here" {...field} />
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
    </div>
  );
};
