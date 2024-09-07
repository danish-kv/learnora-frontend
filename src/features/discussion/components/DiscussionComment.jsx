import React, { useState } from 'react'

const DiscussionComment = ({ comment, onReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
  
    const handleReply = () => {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    };
  
    return (
      <div className="mt-4 border-l-2 border-gray-200 pl-4">
        <div className="flex items-center space-x-2">

        {comment.user?.profile ? (
          <img
            src={comment.user.profile}
            alt={comment.user.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {comment.user?.username
              ? comment.user.username[0].toUpperCase()
              : "?"}
          </div>
        )}
          <span className="font-semibold">{comment.user.username}</span>
        </div>
        <p className="mt-1">{comment?.comment}</p>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-indigo-500 text-sm mt-2"
        >
          Reply
        </button>
        {showReplyForm && (
          <div className="mt-2">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="2"
              placeholder="Write a reply..."
            />
            <button
              onClick={handleReply}
              className="mt-2 bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
            >
              Post Reply
            </button>
          </div>
        )}
        {comment.replies &&
          comment.replies.map((reply) => (
            <DiscussionComment key={reply.id} comment={reply} onReply={onReply} />
          ))}
      </div>
    );
  };
export default DiscussionComment
