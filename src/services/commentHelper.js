import { supabase } from "./supabase";

export async function fetchComments(itemId) {
  try {
    const { data, error, status, statusText } = await supabase
      .from("comments_with_profiles")
      .select("*")
      .eq("item_id", itemId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(" fetchComments error:", { status, statusText, error });
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error(" fetchComments exception:", err);
    return { data: null, error: err };
  }
}

export async function postComment(itemId, parentId, content) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase.from("comments").insert([
      {
        item_id: itemId,
        parent_id: parentId,
        user_id: user.id,
        content,
      },
    ]);

    if (error) {
      console.error(" postComment error:", error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error(" postComment exception:", err);
    return { data: null, error: err };
  }
}

export async function updateComment(commentId, newContent) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .update({ content: newContent, edited_at: new Date().toISOString() })
      .eq("id", commentId);

    if (error) {
      console.error(" updateComment error:", error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error(" updateComment exception:", err);
    return { data: null, error: err };
  }
}

export async function deleteComment(commentId) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error(" deleteComment error:", error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error(" deleteComment exception:", err);
    return { data: null, error: err };
  }
}

export const getCommentCount = async (itemId) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("item_id", itemId);

  if (error) {
    console.error("Error getting comment count:", error.message);
    return 0;
  }

  return count;
};
