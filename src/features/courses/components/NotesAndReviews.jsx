import React, { useState } from "react";
import { FaEdit, FaStar, FaTrash, FaStickyNote } from "react-icons/fa";
import swal from "sweetalert";
import api from "../../../services/api";

const NotesAndReviews = ({
  handleNotesModal,
  handleReviewModal,
  reviews,
  setReviewToEdit,
  notes,
  setNoteToEdit,
  refetch,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  if (!reviews && !notes) {
    return null;
  }

  const handleDelete = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this review!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await api.delete(`reviews/${id}/`);
        console.log(res);

        if (res.status === 204) {
          swal("Poof! Your review has been deleted!", {
            icon: "success",
          });
          refetch();
        } else {
          swal("Failed to delete the review. Review not found.", {
            icon: "error",
          });
        }
        console.log(res);
      } catch (error) {
        console.log(error);
        swal("Failed to delete the review. Please try again later.", {
          icon: "error",
        });
      }
    }
  };

  const handleEditNote = (note) => {
    console.log("notes to edit :", note);

    setNoteToEdit(note);
    handleNotesModal();
  };

  const handleDeleteNote = async (id) => {
    console.log("note delete buttton clicked");
    try {
      const res = await api.delete(`notes/${id}/`);
      if (res.status === 204) {
        swal("Deleted", `${notes.content} has deleted!`, "success");
        refetch();
      } else {
        swal("Failed", "Could not delete the note", "error");
      }
      console.log(res);
    } catch (error) {
      console.log(error);

      swal("Failed", "An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-md shadow">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleNotesModal}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <FaEdit className="mr-2" /> Add Note
        </button>
        {!reviews.is_my_review && (
          <button
            onClick={handleReviewModal}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <FaStar className="mr-2" /> Add Review
          </button>
        )}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="flex items-center text-gray-600 hover:text-gray-700"
        >
          <FaStickyNote className="mr-2" />{" "}
          {showNotes ? "Hide Notes" : "Show Notes"}
        </button>
      </div>

      {/* Display reviews */}
      {reviews.map((review, index) => (
        <div key={review.id} className="mt-4 bg-gray-100 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">
                {review.is_my_review ? "My Review" : `Review #${index + 1}`}
              </h4>
              <p>{review.feedback}</p>
              <p className="text-gray-600 text-sm">
                {new Date(review.created_at).toLocaleDateString()}{" "}
                {new Date(review.created_at).toLocaleTimeString()}
              </p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {review.is_my_review && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setReviewToEdit(review);
                    handleReviewModal();
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <FaEdit className="ml-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="flex items-center text-red-600 hover:text-red-700"
                >
                  <FaTrash className="ml-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Display notes */}
      {showNotes && notes.length > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">My Notes</h4>
          <ul>
            {notes.map((note) => (
              <li
                key={note.id}
                className="mb-2 flex justify-between items-center"
              >
                <p>{note.content}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <FaEdit className="ml-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="flex items-center text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="ml-2" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesAndReviews;
