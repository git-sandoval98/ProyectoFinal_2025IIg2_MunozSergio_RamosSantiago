import { supabase } from "../supabase";

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")   
    .replace(/[^a-z0-9._-]/g, "");
}

export async function uploadImageToBucket(file, uid) {
  if (!file) throw new Error("No file");

  const clean = sanitizeFilename(file.name || "image");
  const path = `news/${uid}/${Date.now()}-${clean}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

  if (error) throw error;

  const { data: pub } = supabase.storage.from("images").getPublicUrl(path);
  return pub.publicUrl;
}
