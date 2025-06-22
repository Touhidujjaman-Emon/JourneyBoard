import React, { useState, useEffect, useCallback } from "react";
import {
  fetchComments,
  postComment,
  updateComment,
  deleteComment,
} from "../services/commentHelper";
import { buildCommentTree } from "../utils/buildCommentTree";
import { supabase } from "../services/supabase";

function Comment({ comment, userId, onReply, onEdit, onDelete }) {
  const isAuthor = comment.user_id === userId;
  const userName =
    comment.user?.full_name || comment.user?.email || "Anonymous";

  return (
    <div className="border rounded p-3 mb-2">
      <div className="flex justify-between text-sm text-gray-700">
        <span>
          <strong>{userName}</strong>
        </span>
        <span>{new Date(comment.created_at).toLocaleString()}</span>
      </div>

      {comment.isEditing ? (
        <textarea
          rows={3}
          defaultValue={comment.content}
          onBlur={(e) => onEdit(comment.id, e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
      ) : (
        <p className="mt-2 text-gray-800">{comment.content}</p>
      )}

      <div className="mt-2 flex space-x-4 text-sm">
        <button onClick={() => onReply(comment.id)} className="text-blue-500">
          Reply
        </button>
        {isAuthor && (
          <>
            <button
              onClick={() => onEdit(comment.id)}
              className="text-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-6 mt-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              userId={userId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ itemId }) {
  const [tree, setTree] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [content, setContent] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await postComment(itemId, replyTo, content);
    setContent("");
    setReplyTo(null);
    loadComments();
  };

  const handleEdit = async (commentId, newContent) => {
    if (typeof newContent === "string") {
      await updateComment(commentId, newContent);
      loadComments();
    } else {
      setTree((prev) =>
        prev.map((node) =>
          node.id === commentId ? { ...node, isEditing: true } : node
        )
      );
    }
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    loadComments();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        {replyTo && (
          <div className="text-sm text-gray-600 mb-2">
            Replying to comment ID {replyTo}{" "}
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-red-500 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Write a comment…"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {replyTo ? "Post Reply" : "Post Comment"}
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
            onReply={setReplyTo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
