import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import React, { useState } from "react";

const CommentForm = ({discussion}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("comment/", { discussion : discussion.id ,comment : content});
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
