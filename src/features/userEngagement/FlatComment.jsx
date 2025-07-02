import { useState, useEffect } from "react";
import { formatTime } from "../../utils/timeFormatter";

function FlatComment({
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
    : comment.email
    ? comment.email.split("@")[0]
    : "Anonymous";
  const isReplying = replyTo?.id === comment.id;
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditContent(comment.content);
  }, [comment.content]);

  return (
    <div className="border rounded p-3 mb-2 bg-gray-50">
      <div className="flex justify-between text-sm text-gray-700">
        <span>
          <strong>{userName}</strong>
        </span>
        <span>{formatTime(comment.created_at)}</span>
      </div>
      {isEditing ? (
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
              onClick={() => {
                onEdit(comment.id, editContent);
                setIsEditing(false);
              }}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
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
        {isAuthor && !isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
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
            onSubmitReply(comment.id, replyContent);
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
    </div>
  );
}

export default FlatComment;
