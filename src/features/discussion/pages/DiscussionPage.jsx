import React, { useState } from "react";
import Header from "@/components/layout/Header";
import DiscussionPost from "../components/DiscussionPost";
import CreateDiscussionModal from "../components/CreateDiscussionModal";
import UseFetchDiscussion from "../hooks/UseFetchDiscussion";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import Swal from "sweetalert2";
import { MessageCircle } from "lucide-react";
import Banner from "@/components/common/Banner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiscussionSkeleton from "@/skeleton/DiscussionSkeleton";

const DiscussionPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [editDiscussion, setEditDiscussion] = useState(null);

  const { discussions, errors, loading, getDiscussion } = UseFetchDiscussion();
  console.log("data =========", discussions);

  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const toggleCreateForm = () => {
    if (!user){
      navigate('/login')
      displayToastAlert(300,'Please Login to create discussion...')
    }
    setShowCreateForm(!showCreateForm);
  }

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
    setEditDiscussion(discussion);
    toggleCreateForm();
  };


  if (loading) {
    return (
      <div>
        <Header />
        <Banner
          title="Join the Conversation"
          description="Share ideas, ask questions, and learn from your peers."
          buttonText="Start a Discussion"
          icon={MessageCircle}
          gradient="bg-gradient-to-r from-blue-600 to-teal-600"
          onClick={toggleCreateForm}
        />
        <DiscussionSkeleton />
      </div>
    );
  }
  
  return (
    <div>
      <Header />

      <Banner
        title="Join the Conversation"
        description="Share ideas, ask questions, and learn from your peers."
        buttonText="Start a Discussion"
        icon={MessageCircle}
        gradient="bg-gradient-to-r from-blue-600 to-teal-600"
        onClick={() => {
          console.log("Start Discussion clicked")
          toggleCreateForm()
        }}
      />

      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl p-6 font-bold mb-6 text-center">
            Discussion Forum
          </h1>
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
            getDiscussion={getDiscussion}
          />
        ))}
      </div>

      <CreateDiscussionModal
        show={showCreateForm}
        getDiscussion={getDiscussion}
        onClose={() => {
          setEditDiscussion(null);
          toggleCreateForm();
        }}
        discussion={editDiscussion}
        isEditing={!!editDiscussion}
      />
    </div>
  );
};

export default DiscussionPage;
