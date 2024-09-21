import React, { useState } from "react";
import { Star } from "lucide-react";
import SeeMoreReviewModal from "../modal/SeeMoreReview";
import { formatDate } from "@/utils/format";

const CourseReview = ({ reviews }) => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6 mt-4 mb-4 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-semibold text-gray-600">No reviews yet</h2>
        <p className="text-gray-500 mt-2">
          Be the first to review this course!
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const reviewsToDisplay = reviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="my-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <div className="flex items-center">
          <Star className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" />
          <span className="text-2xl font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviewsToDisplay.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="bg-gray-800 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
                  {review.user?.username[0]?.toUpperCase()}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg">
                    {review.user.username}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {review.updated_at
                      ? formatDate(
                          new Date(review.updated_at),
                          "dd, mmmm, yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p
                className={`text-gray-700 ${
                  expandedReview === review.id ? "" : "line-clamp-3"
                }`}
              >
                {review.feedback}
              </p>
            </div>
          </div>
        ))}

        {reviews.length > 3 && (
          <button
          className="mt-4 text-blue-500 underline"
          onClick={() => setIsReviewModalOpen(true)}
          aria-label="See all reviews"
        >
          See All
        </button>
        )}
      </div>
      <SeeMoreReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviews={reviews}
        averageRating={averageRating}
      />
    </div>
  );
};

export default CourseReview;
