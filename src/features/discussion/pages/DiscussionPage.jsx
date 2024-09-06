import React, { useState } from "react";
import Header from "@/components/layout/Header";

const Comment = ({ comment, onReply }) => {
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
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">{comment.user.name}</span>
      </div>
      <p className="mt-1">{comment.content}</p>
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-blue-500 text-sm mt-2"
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
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Post Reply
          </button>
        </div>
      )}
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
    </div>
  );
};

const DiscussionPage = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/50",
      },
      title: "How to learn React?",
      content: "I am new to React. Can anyone suggest good learning resources?",
      image: "https://via.placeholder.com/400",
      upvotes: 10,
      downvotes: 2,
      comments: [
        {
          id: 1,
          user: {
            name: "Jane Smith",
            avatar: "https://via.placeholder.com/50",
          },
          content: "I recommend the official React documentation!",
          replies: [],
        },
        {
          id: 2,
          user: {
            name: "Bob Johnson",
            avatar: "https://via.placeholder.com/50",
          },
          content:
            "Try some online courses on platforms like Udemy or Coursera.",
          replies: [],
        },
      ],
    },
    // ... (other discussion objects)
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const toggleComments = (discussionId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [discussionId]: !prev[discussionId],
    }));
  };

  const handleReply = (discussionId, commentId, replyContent) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              comments: addReplyToComment(
                discussion.comments,
                commentId,
                replyContent
              ),
            }
          : discussion
      )
    );
  };

  const addReplyToComment = (comments, commentId, replyContent) => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              user: {
                name: "Current User",
                avatar: "https://via.placeholder.com/50",
              },
              content: replyContent,
              replies: [],
            },
          ],
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, commentId, replyContent),
        };
      }
      return comment;
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-4xl p-4">
        <h1 className="text-3xl p-6 font-bold mb-6 text-center">
          Discussion Forum
        </h1>

        {/* Create New Discussion Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleCreateForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Post
          </button>
        </div>

        {/* Create New Discussion Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
              <form>
                {/* Title Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter post title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Content Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Content
                  </label>
                  <textarea
                    placeholder="What's on your mind?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows="4"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>

            {/* Custom Image Upload Field */}
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(e) => handleImageUpload(e)} // handleImageUpload is a function to preview or upload
              />
            </div>
          </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={toggleCreateForm}
                    className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Discussion List - Social Media Style */}
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={discussion.user.avatar}
                  alt={discussion.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {discussion.user.name}
                  </h3>
                  <p className="text-sm text-gray-500">Posted a discussion</p>
                </div>
              </div>

              {/* Post Title & Content */}
              <div>
                <h3 className="text-xl font-semibold">{discussion.title}</h3>
                <p className="text-gray-700">{discussion.content}</p>
              </div>

              {/* Post Image */}
              {discussion.image && (
                <div className="mt-4">
                  <img
                    src={discussion.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex justify-between items-center mt-4">
                {/* Upvote/Downvote */}
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
                    <span className="ml-1">{discussion.upvotes}</span>
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
                    <span className="ml-1">{discussion.downvotes}</span>
                  </button>
                </div>

                {/* Comment Count */}
                <button
                  onClick={() => toggleComments(discussion.id)}
                  className="text-gray-500 text-sm hover:text-blue-500"
                >
                  {discussion.comments.length} comments
                </button>
              </div>

              {/* Comments Section */}
              {expandedComments[discussion.id] && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Comments</h4>
                  {discussion.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      onReply={(commentId, replyContent) =>
                        handleReply(discussion.id, commentId, replyContent)
                      }
                    />
                  ))}
                  {/* Add new comment form */}
                  <div className="mt-4">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Add a comment..."
                    />
                    <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;
