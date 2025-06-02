"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/axios";
import { useAuth } from "@/app/_providers/AuthProvider";

const formSchema = z.object({
  firstname: z.string().min(2, "Firstname must match."),
  lastname: z.string().min(2, "Lastname must match."),
  cardnumber: z.string().min(15, "Invalid card number."),
  month: z.string().nonempty("Invalid month."),
  year: z.string().nonempty("Invalid year."),
  cvc: z.string().min(3, "Invalid CVC."),
  country: z.string().min(3, "Select country to continue."),
});

type FormValues = z.infer<typeof formSchema>;

export const EditPaymentDetails = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bankCardId, setBankCardId] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      cardnumber: "",
      month: "",
      year: "",
      cvc: "",
      country: "",
    },
  });

  useEffect(() => {
    if (!user?.id) return;

    const fetchBankCard = async () => {
      try {
        const res = await api.get(`/bank/user/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = res.data;

        if (!data) return;

        setBankCardId(data.id);

        const [month, year] = data.expiryDate.split("/");

        form.reset({
          firstname: data.firstName,
          lastname: data.lastName,
          cardnumber: data.cardNumber,
          month,
          year,
          cvc: data.CVC,
          country: data.country,
        });
      } catch {
        toast.error("Failed to load payment details.");
      }
    };

    fetchBankCard();
  }, [user, form]);

  const onSubmit = async (values: FormValues) => {
    if (!bankCardId) {
      toast.error("No bank card to update.");
      return;
    }

    setLoading(true);
    try {
      await api.put(
        `/bank/${bankCardId}`,
        {
          country: values.country,
          firstName: values.firstname,
          lastName: values.lastname,
          cardNumber: values.cardnumber,
          CVC: values.cvc,
          expiryDate: `${values.month}/${values.year}`,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Payment details updated successfully.");
    } catch {
      toast.error("Failed to update payment details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-black font-bold text-[16px]">Payment details</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select country</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cardnumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter card number</FormLabel>
                <FormControl>
                  <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Expires (Month)</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, "0");
                          return (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = (
                            new Date().getFullYear() + i
                          ).toString();
                          return (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
