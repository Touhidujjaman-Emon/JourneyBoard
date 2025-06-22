import React, { useState, useEffect, useCallback } from "react";
import { formatTime } from "../utils/timeFormatter";

import {
  fetchComments,
  postComment,
  updateComment,
  deleteComment,
} from "../services/commentHelper";
import { buildCommentTree } from "../utils/buildCommentTree";
import { supabase } from "../services/supabase";

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

function Comment({
  comment,
  userId,
  onEdit,
  onDelete,
  replyTo,
  setReplyTo,
  onSubmitReply,
}) {
  const isAuthor = comment.user_id === userId;
  const userName = comment.username
    ? comment.username.split("@")[0]
    : "Anonymous";

  const isReplying = replyTo?.id === comment.id;

  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);

  useEffect(() => {
    if (comment.isEditing) {
      setEditContent(comment.content);
    }
  }, [comment.isEditing, comment.content]);

  return (
    <div className="border rounded p-3 mb-2">
      <div className="flex justify-between text-sm text-gray-700">
        <span>
          <strong>{userName}</strong>
        </span>
        <span>{formatTime(comment.created_at)}</span>
      </div>

      {comment.isEditing ? (
        <>
          <textarea
            rows={3}
            maxLength={300}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border rounded p-2 mt-2"
            autoFocus
          />
          <div className="text-right text-xs text-gray-500">
            {editContent.length} / 300
          </div>
          <div className="mt-2 flex space-x-2 text-sm">
            <button
              onClick={() => onEdit(comment.id, editContent)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => onEdit(comment.id, undefined)} // cancel edit
              className="text-red-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="mt-2 text-gray-800">{comment.content}</p>
      )}

      <div className="mt-2 flex space-x-4 text-sm">
        <button
          onClick={() => setReplyTo({ id: comment.id, username: userName })}
          className="text-blue-500"
        >
          Reply
        </button>
        {isAuthor && !comment.isEditing && (
          <>
            {/* Pass null to enable edit mode */}
            <button
              onClick={() => onEdit(comment.id, null)}
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

      {isReplying && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitReply(replyTo.id, replyContent);
            setReplyContent("");
            setReplyTo(null);
          }}
          className="mt-3"
        >
          <textarea
            rows={2}
            maxLength={300}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder={`Replying to ${userName}...`}
            className="w-full border rounded p-2"
          />
          <div className="text-right text-xs text-gray-500">
            {replyContent.length} / 300
          </div>
          <div className="mt-1 flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
            >
              Post Reply
            </button>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-sm text-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-6 mt-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              userId={userId}
              onEdit={onEdit}
              onDelete={onDelete}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              onSubmitReply={onSubmitReply}
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

  return (
    <div>
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
          />
        ))
      )}
    </div>
  );
}
