import { supabase } from "./supabase";

export async function upvoteItem(itemId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { data: null, error: userError };

  const userId = user.id;
  const { data, error } = await supabase
    .from("upvotes")
    .upsert(
      { user_id: userId, item_id: itemId },
      { onConflict: ["user_id", "item_id"] }
    );

  return { data, error };
}

export async function removeUpvote(itemId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { data: null, error: userError };

  const userId = user.id;
  const { data, error } = await supabase
    .from("upvotes")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId);

  return { data, error };
}

export async function fetchItemWithCount(itemId) {
  const { data: item, error: itemError } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (itemError) {
    return { data: null, error: itemError };
  }

  const { count, error: countError } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("item_id", itemId);

  if (countError) {
    return { data: null, error: countError };
  }

  return { data: { ...item, upvote_count: count }, error: null };
}
