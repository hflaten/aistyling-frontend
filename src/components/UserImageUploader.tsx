// src/components/UserImageUploader.tsx
import { ChangeEvent } from "react";

type UserImageUploaderProps = {
  onImageSelect: (file: File | null) => void;
};

export default function UserImageUploader({ onImageSelect }: UserImageUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageSelect(file);
  };

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">Upload your photo (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
}
