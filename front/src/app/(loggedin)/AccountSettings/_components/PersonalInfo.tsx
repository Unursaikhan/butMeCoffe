"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

const UPLOAD_PRESET = "Unuullr";
const CLOUD_NAME = "dm1u3mjr4";

const profileSchema = z.object({
  photo: z.string().url("Must be a valid image URL."),
  name: z.string().min(2, "Please enter your name."),
  about: z.string().min(2, "Please enter info about yourself."),
  socialMedia: z.string().url("Enter a valid URL."),
});
type ProfileForm = z.infer<typeof profileSchema>;

export const EditProfileForm = () => {
  const { user, getUser } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: "",
      name: "",
      about: "",
      socialMedia: "",
    },
  });

  useEffect(() => {
    if (user?.profile) {
      const { avatarImage, name, about, socialMedia } = user.profile;
      setImagePreview(avatarImage);
      form.setValue("photo", avatarImage);
      form.setValue("name", name);
      form.setValue("about", about);
      form.setValue("socialMedia", socialMedia);
    }
  }, [user, form]);

  const uploadImage = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);
    setUploading(true);
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        fd
      );
      return data.url as string;
    } catch (err) {
      console.error("Image upload error:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setImagePreview(url);
      form.setValue("photo", url, { shouldValidate: true });
    }
  };

  const onSubmit = async (values: ProfileForm) => {
    try {
      await api.put("/profile/edit", {
        userId: user?.id,
        avatarImage: values.photo,
        name: values.name,
        about: values.about,
        socialMedia: values.socialMedia,
      });
      await getUser();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 border rounded-2xl">
      <h1 className="text-black font-bold text-[16px]">Personal info</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({}) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Add photo</FormLabel>
                <div className="relative w-40 h-40 border-dashed border-2 rounded-full flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Avatar Preview"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <CameraIcon className="w-12 h-12 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-[120px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>Social Media URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full">
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
