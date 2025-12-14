"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

// Cloudinary upload info type
type CloudinaryUploadInfo = {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  url: string;
  thumbnail_url?: string;
};

export default function CloudinaryUploadWidget({ value, onChange }: Props) {
  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== "string") {
      const info = result.info as CloudinaryUploadInfo;
      onChange(info.secure_url);
    }
  };

  return (
    <div className="space-y-3">
      <CldUploadWidget
        uploadPreset="c-hygiene-products"
        onSuccess={handleSuccess}
        options={{
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 5000000, // 5MB
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#0C8033] transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-[#0C8033]"
          >
            <Upload size={20} />
            <span>फोटो अपलोड गर्नुहोस्</span>
          </button>
        )}
      </CldUploadWidget>

      {value && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={value}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="हटाउनुहोस्"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="text-sm text-gray-500 text-center">वा</div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="फोटो URL राख्नुहोस्"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent text-sm"
      />
    </div>
  );
}