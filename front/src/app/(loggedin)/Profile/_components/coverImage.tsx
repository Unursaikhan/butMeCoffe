"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { CameraIcon, XIcon, CheckIcon } from "lucide-react";
import { useRef, useState } from "react";
import { api } from "@/axios";

const UPLOAD_PRESET = "Unuullr";
const CLOUD_NAME = "dm1u3mjr4";

export const CoverImage = () => {
  const { user, getUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setEditing(true);
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !user?.id) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      await api.put("/profile/edit", {
        userId: user.id,
        backGroundImage: data.secure_url,
      });

      await getUser();
      setEditing(false);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setPreviewUrl(null);
  };

  const currentImage = previewUrl || user?.profile.backGroundImage;
  const hasImage = currentImage && currentImage.trim() !== "";

  return (
    <div className="w-full h-[319px] top-14 absolute bg-[#F4F4F5] overflow-hidden rounded-xl">
      {hasImage && (
        <img
          src={currentImage}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div
        className={`absolute inset-0 z-10 ${
          hasImage
            ? "flex justify-end items-start p-4"
            : "flex items-center justify-center"
        }`}
      >
        {editing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={uploading}
            >
              <XIcon className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading}>
              <CheckIcon className="w-4 h-4 mr-1" />
              Save changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => fileInputRef.current?.click()}>
            <CameraIcon className="w-4 h-4 mr-1" />
            {hasImage ? "Change cover" : "Add a cover image"}
          </Button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
