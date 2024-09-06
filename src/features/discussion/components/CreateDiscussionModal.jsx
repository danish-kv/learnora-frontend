import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import React, { useState } from "react";

const CreateDiscussionModal = ({ show, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await api.post("create-discussion/", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
      const errorData = error.response?.data || {};
      const statusCode = error.response?.status || 500;
      console.log(error.response?.data);

      displayToastAlert(
        400,
        errorData?.title?.[0] ||
          errorData?.description?.[0] ||
          errorData?.photo?.[0] ||
          (statusCode === 429 ? "Too Many Requests. Please try again later." : "Something went wrong."));
    }
    onClose();
  };

  if (!show) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="4"
            ></textarea>
          </div>

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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
