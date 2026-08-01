import { supabase } from "../lib/supabase";

const BUCKET = "indabax-files";

export async function uploadProjectDocument(file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `documents/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadVisualAssets(files: File[]) {
  const urls: string[] = [];

  for (const file of files) {
    const extension = file.name.split(".").pop();

    const fileName = `assets/${crypto.randomUUID()}.${extension}`;

    const response = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file);

    console.log(response);

    const { error } = response;

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    urls.push(data.publicUrl);
  }

  return urls;
}