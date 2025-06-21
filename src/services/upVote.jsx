import { useState, useEffect, useCallback } from "react";
import { upvoteItem, removeUpvote, fetchItemWithCount } from "./upVoteHelper";
import { supabase } from "./supabase";

export function useUpvotes(itemId) {
  const [count, setCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data: item, error: itemErr } = await fetchItemWithCount(itemId);
    if (itemErr) {
      setError(itemErr);
    } else {
      setCount(item.upvote_count);
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { count: userCount, error: countErr } = await supabase
          .from("upvotes")
          .select("*", { head: true, count: "exact" })
          .eq("item_id", itemId)
          .eq("user_id", user.id);

        if (countErr) {
          setError(countErr);
        } else {
          setHasUpvoted(userCount > 0);
        }
      } else {
        setHasUpvoted(false);
      }
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  }, [itemId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async () => {
    setError(null);
    setLoading(true);

    if (hasUpvoted) {
      await removeUpvote(itemId);
    } else {
      await upvoteItem(itemId);
    }

    await refresh();
  }, [itemId, hasUpvoted, refresh]);

  return { count, hasUpvoted, loading, error, toggle, refresh };
}
