import React, { useState } from "react";
import Header from "@/components/layout/Header";
import DiscussionPost from "../components/DiscussionPost";
import CreateDiscussionModal from "../components/CreateDiscussionModal";
import UseFetchDiscussion from "../hooks/UseFetchDiscussion";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";

const DiscussionPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const { discussions, errors, loading, getDiscussion } = UseFetchDiscussion();
  console.log("data =========", discussions);

  const toggleCreateForm = () => setShowCreateForm(!showCreateForm);
  const toggleComments = (discussionId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [discussionId]: !prev[discussionId],
    }));
  };

  const handleReply = async (discussionId, commentId, replyContent) => {
    console.log(discussionId, replyContent, commentId);

    try {
      const res = await api.post(`comment/`, {
        discussion: discussionId,
        comment: replyContent,
        parent: commentId,
      });
      console.log(res);
      getDiscussion();
      displayToastAlert(200, "Comment added succussfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVote = async (id) => {
    try {
      const res = await api.post(`discussion/${id}/upvote/`);
      console.log(res);
      displayToastAlert(200, "Liked");
      getDiscussion()
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "facing some problem");
    }
  };

  const handleDownVote = async (id) => {
    try {
      const res = await api.post(`discussion/${id}/downvote/`);
      console.log(res);
      displayToastAlert(200, "Liked");
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "facing some problem");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl p-6 font-bold mb-6 text-center">
            Discussion Forum
          </h1>
          <button
            onClick={toggleCreateForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Discussion
          </button>
        </div>

        {discussions.map((discussion) => (
          <DiscussionPost
            key={discussion.id}
            discussion={discussion}
            onReply={handleReply}
            toggleComments={toggleComments}
            expanded={expandedComments[discussion.id]}
            onDownvote={handleDownVote}
            onUpvote={handleUpVote}
          />
        ))}
      </div>

      <CreateDiscussionModal show={showCreateForm} onClose={toggleCreateForm} />
    </div>
  );
};

export default DiscussionPage;
