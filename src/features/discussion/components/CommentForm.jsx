import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import React, { useState } from "react";

const CommentForm = ({ discussion, getDiscussion }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      displayToastAlert(400, "Please type something...");
      return;
    }
    try {
      const res = await api.post("comment/", {
        discussion: discussion.id,
        comment: content,
      });
      setContent("");
      getDiscussion();
      console.log(res);
      console.log(discussion.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        rows="2"
        placeholder="Add a comment..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
