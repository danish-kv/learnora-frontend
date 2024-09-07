import React, { useState } from "react";
import Header from "@/components/layout/Header";
import DiscussionPost from "../components/DiscussionPost";
import CreateDiscussionModal from "../components/CreateDiscussionModal";
import UseFetchDiscussion from "../hooks/UseFetchDiscussion";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import Swal from "sweetalert2";

const DiscussionPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const [editDiscussion, setEditDiscussion] = useState(null);

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
      getDiscussion();
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "facing some problem");
    }
  };

  const handleDownVote = async (id) => {
    try {
      const res = await api.post(`discussion/${id}/downvote/`);
      console.log(res);
      displayToastAlert(200, "Unliked");
      getDiscussion();
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "facing some problem");
    }
  };

  const handleDeleteDiscussion = async (discussion_id) => {
    const result = await Swal.fire({
      title: "Are You sure",
      text: "you don't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.delete(`discussion/${discussion_id}/`);
        displayToastAlert(200, "Discussion deleted succussfully");
        getDiscussion();
        console.log(res);
      } catch (error) {
        console.log(error);
        displayToastAlert(400, "Failed to delete discussion");
      }
    }
  };

  const handleEditDiscussion = (discussion) => {
    setEditDiscussion(discussion)
    toggleCreateForm()

  }

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
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
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
            onDelete={handleDeleteDiscussion}
            onEdit={handleEditDiscussion}
          />
        ))}
      </div>

      <CreateDiscussionModal
        show={showCreateForm}
        getDiscussion={getDiscussion}
        onClose={() => {
          setEditDiscussion(null);
          toggleCreateForm();
        }
      }
      discussion = {editDiscussion}
      isEditing={!!editDiscussion}
      />
    </div>
  );
};

export default DiscussionPage;
