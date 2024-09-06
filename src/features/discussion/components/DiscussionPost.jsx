import React, { useState } from "react";
import CommentForm from "./CommentForm";
import DiscussionComment from "./DiscussionComment";

const DiscussionPost = ({ discussion, onReply, toggleComments, expanded }) => {
  if (!discussion) {
    return <h1>discussion comming</h1>;
  }
  return (
    <div className="bg-white p-4 mb-8 shadow-md rounded-lg flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        {discussion.user?.profile ? (
          <img
            src={discussion.user.profile}
            alt={discussion.user.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {discussion.user?.username
              ? discussion.user.username[0].toUpperCase()
              : "?"}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg">{discussion.user?.username}</h3>
          <p className="text-sm text-gray-500">
            {new Date(discussion.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold">{discussion.title}</h3>
        <p className="text-gray-700">{discussion.description}</p>
      </div>

      {discussion.photo && (
        <div className="mt-4">
          <img
            src={discussion.photo}
            alt="Post"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 items-center">
          <button className="text-green-500 hover:text-green-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>

            <span className="ml-1">{discussion.upvoted_by?.length}</span>
          </button>
          <button className="text-red-500 hover:text-red-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

            <span className="ml-1">{discussion.downvoted_by?.length}</span>
          </button>
        </div>
        <button
          onClick={() => toggleComments(discussion.id)}
          className="text-gray-500 text-sm hover:text-blue-500"
        >
          {discussion.commented_discussion?.length} comments
        </button>
      </div>

      {expanded && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Comments</h4>
          {discussion.commented_discussion && discussion.commented_discussion.map((comment) => (
            <DiscussionComment
              key={comment.id}
              comment={comment}
              onReply={(commentId, replyContent) =>
                onReply(discussion.id, commentId, replyContent)
              }
            />
          ))}
          <CommentForm discussion={discussion} />
        </div>
      )}
    </div>
  );
};

export default DiscussionPost;
