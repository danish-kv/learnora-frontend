import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import React, { useEffect, useState } from "react";

const CreateDiscussionModal = ({
  show,
  onClose,
  discussion,
  isEditing = false,
  getDiscussion,
}) => {
  console.log("discussion =========", discussion);
  const [discussionData, setDiscussionData] = useState({
    title: "",
    description: "",
    photo: "",
  });

  const resetModal = () => {
    setDiscussionData({
      title: "",
      description: "",
      photo: "",
    });
  };

  useEffect(() => {
    if (discussion && isEditing) {
      setDiscussionData({
        title: discussion?.title || "",
        description: discussion?.description || "",
        photo: discussion.photo || "",
      });
    } else {
      resetModal();
    }
  }, [discussion, isEditing]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", discussionData.title);
    formData.append("description", discussionData.description);
    if (discussionData.photo && typeof discussionData.photo !== "string") {
      formData.append("photo", discussionData.photo);
    }

    try {
      if (isEditing && discussion.id) {
        const res = await api.patch(`discussion/${discussion.id}/`, formData);
        displayToastAlert(200, "Discussion updated successfully");
        console.log(res);
        getDiscussion();
      } else {
        const res = await api.post("create-discussion/", formData);
        console.log(res);
        getDiscussion();
        displayToastAlert(200, "Discussion created successfully");
      }
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
          (statusCode === 429
            ? "Too Many Requests. Please try again later."
            : "Something went wrong.")
      );
    }
    onCLoseModal();
  };

  if (!show) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDiscussionData((prevState) => ({ ...prevState, photo: file }));
    }
  };

  const onCLoseModal = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Discussion" : "Create a New Post"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={discussionData.title}
              onChange={(e) =>
                setDiscussionData((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              placeholder="Enter post title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={discussionData.description}
              onChange={(e) =>
                setDiscussionData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
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
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            {discussionData.photo &&
              typeof discussionData.photo === "string" && (
                <p className="mt-2 text-gray-600">
                  Current file: {discussionData.photo.split("/").pop()}
                </p>
              )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCLoseModal}
              className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
