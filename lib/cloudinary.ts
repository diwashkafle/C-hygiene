"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extract public_id from Cloudinary URL
 * Example: https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg
 * Returns: sample
 */
export async function getPublicIdFromUrl(url: string): Promise<string | null> {
  try {
      if (!url.includes("res.cloudinary.com")) {
      return null;
    }

    // Extract the public_id from the URL
    // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    
    if (uploadIndex === -1 || uploadIndex === parts.length - 1) {
      return null;
    }

    let publicIdPart = parts.slice(uploadIndex + 1).join("/");
    
    publicIdPart = publicIdPart.replace(/^v\d+\//, "");
    
    const publicId = publicIdPart.replace(/\.[^.]+$/, "");
    
    return publicId;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
}


export async function deleteCloudinaryImage(publicId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === "ok") {
      return { success: true };
    } else {
      return { success: false, error: `Failed to delete: ${result.result}` };
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}


export async function deleteCloudinaryImageByUrl(url: string): Promise<{ success: boolean; error?: string }> {
  const publicId = await getPublicIdFromUrl(url);
  
  if (!publicId) {
    return { success: true };
  }

  return deleteCloudinaryImage(publicId);
}