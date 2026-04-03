import React, { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import api from "../../../services/api";
import Swal from "sweetalert2";

const ReviewModal = ({
  courseId,
  userId,
  showReviewModal,
  setShowReviewModal,
  rating,
  setRating,
  reviewToEdit,
  setReviewToEdit,
  refetch,
}) => {
  const [feedback, setFeedback] = useState("");

  console.log("edit data", reviewToEdit);
  console.log("edit data", reviewToEdit?.rating, reviewToEdit?.feedback);

  console.log("chehechkehc", rating, feedback);

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setFeedback(reviewToEdit.feedback);
    }
  }, [reviewToEdit, setRating]);

  if (!showReviewModal) return null;

  const handleSubmit = async () => {
    if (!rating || !feedback.trim()) {
      displayToastAlert(300, "Please provide a rating or write a review");
      return;
    }

    try {
      let res;
      if (reviewToEdit) {
        res = await api.patch(`reviews/${reviewToEdit.id}/`, {
          course: reviewToEdit.course,
          rating,
          feedback,
        });
        refetch()
      } else {
        res = await api.post("reviews/", {
          course: courseId,
          user: userId,
          rating,
          feedback,
        });
        refetch()
      }

      console.log(res);
      if (res.status === (reviewToEdit ? 200 : 201)) {
        Swal.fire(
          "Success",
          `${rating} Star Review submitted successfully`,
          "success"
        );
        setFeedback("");
        setRating(0);
        setShowReviewModal(false);
        setReviewToEdit(null);
        console.log(res);
      } else {
        displayToastAlert(400, "Failed to submit review. Please try again");
      }
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "An error occurred. Please try again");
    }
  };

  console.log(rating);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {reviewToEdit ? "Edit Review" : "Add Review"}
          </h3>
          <button
            onClick={() => {
              setShowReviewModal(false);
              setReviewToEdit(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2">Rating:</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  star <= rating ? "text-indigo-700" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <textarea
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Write your review here..."
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {reviewToEdit ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
