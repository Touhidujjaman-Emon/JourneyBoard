import { supabase } from "./supabase";

export async function getRoadmapItems() {
  const { data, error } = await supabase.from("items").select("*");
  console.log(data);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}
