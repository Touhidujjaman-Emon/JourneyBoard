import React, { useState, useEffect, useCallback } from "react";

import {
  fetchComments,
  postComment,
  updateComment,
  deleteComment,
} from "../services/commentHelper";
import { buildCommentTree } from "../utils/buildCommentTree";
import { supabase } from "../services/supabase";
import Comment from "../features/userEngagement/Comment";
import getTotalCommentCount from "../utils/getTotalCommentCount";

const toggleEditInTree = (comments, commentId, isEditing = true) => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, isEditing };
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: toggleEditInTree(comment.replies, commentId, isEditing),
      };
    }
    return comment;
  });
};

export default function CommentSection({ itemId }) {
  const [tree, setTree] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
    });
  }, []);

  const loadComments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchComments(itemId);
    if (!error && data) {
      const withFlags = data.map((c) => ({ ...c, isEditing: false }));
      setTree(buildCommentTree(withFlags));
    }
    setLoading(false);
  }, [itemId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleEdit = async (commentId, newContent) => {
    if (typeof newContent === "string") {
      await updateComment(commentId, newContent);
      setTree((prev) => toggleEditInTree(prev, commentId, false));
      loadComments();
    } else if (newContent === null) {
      setTree((prev) => toggleEditInTree(prev, commentId, true));
    } else {
      setTree((prev) => toggleEditInTree(prev, commentId, false));
    }
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    loadComments();
  };

  const handleSubmitReply = async (parentId, content) => {
    if (!content.trim()) return;
    await postComment(itemId, parentId, content);
    loadComments();
  };

  const handlePostTopLevel = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await postComment(itemId, null, newComment);
    setNewComment("");
    loadComments();
  };

  // Calculate total comments
  const totalComments = getTotalCommentCount(tree);

  return (
    <div>
      <div className="mb-2 font-semibold">
        {totalComments} Comment{totalComments !== 1 ? "s" : ""}
      </div>
      <form onSubmit={handlePostTopLevel} className="mb-4">
        <textarea
          rows={3}
          maxLength={300}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Write a comment…"
        />
        <div className="text-right text-xs text-gray-500">
          {newComment.length} / 300
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Post Comment
        </button>
      </form>

      {loading ? (
        <p>Loading comments…</p>
      ) : (
        tree.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            userId={userId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            onSubmitReply={handleSubmitReply}
            depth={1}
          />
        ))
      )}
    </div>
  );
}
