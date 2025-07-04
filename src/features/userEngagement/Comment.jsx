import { useState, useEffect } from "react";
import { formatTime } from "../../utils/timeFormatter";
import FlatComment from "./FlatComment";

function Comment({
  comment,
  userId,
  onEdit,
  onDelete,
  replyTo,
  setReplyTo,
  onSubmitReply,
  depth = 1,
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
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 2;

  useEffect(() => {
    if (comment.isEditing) {
      setEditContent(comment.content);
    }
  }, [comment.isEditing, comment.content]);

  function flattenReplies(replies) {
    let flat = [];
    for (const reply of replies) {
      flat.push(reply);
      if (reply.replies && reply.replies.length > 0) {
        flat = flat.concat(flattenReplies(reply.replies));
      }
    }
    return flat;
  }

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
              onClick={() => onEdit(comment.id, undefined)}
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
          {depth < 2
            ? comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  userId={userId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  replyTo={replyTo}
                  setReplyTo={setReplyTo}
                  onSubmitReply={onSubmitReply}
                  depth={depth + 1}
                />
              ))
            : (() => {
                const flatReplies = flattenReplies(comment.replies);
                const visibleReplies = showAll
                  ? flatReplies
                  : flatReplies.slice(0, MAX_VISIBLE);
                return (
                  <>
                    {visibleReplies.map((reply) => (
                      <FlatComment
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
                    {!showAll && flatReplies.length > MAX_VISIBLE && (
                      <button
                        className="text-blue-500 text-sm mt-1"
                        onClick={() => setShowAll(true)}
                      >
                        View more replies ({flatReplies.length - MAX_VISIBLE})
                      </button>
                    )}
                  </>
                );
              })()}
        </div>
      )}
    </div>
  );
}

export default Comment;
