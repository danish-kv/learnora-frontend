import React, { useState } from "react";
import {
  FaEdit,
  FaStar,
  FaTrash,
  FaStickyNote,
  FaUserCircle,
  FaPlus,
} from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("reviews");

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
      } catch (error) {
        console.log(error);
        swal("Failed to delete the review. Please try again later.", {
          icon: "error",
        });
      }
    }
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    handleNotesModal();
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await api.delete(`notes/${id}/`);
      if (res.status === 204) {
        swal("Deleted", "The note has been deleted!", "success");
        refetch();
      } else {
        swal("Failed", "Could not delete the note", "error");
      }
    } catch (error) {
      console.log(error);
      swal("Failed", "An error occurred. Please try again.", "error");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Notes & Reviews</h2>
          <div className="space-x-2">
            <Button onClick={handleNotesModal} variant="outline">
              <FaPlus className="mr-2" /> Add Note
            </Button>
            {!reviews.some((review) => review.is_my_review) && (
              <Button onClick={handleReviewModal} variant="default">
                <FaStar className="mr-2" /> Add Review
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews">
            <div className="space-y-6 mt-4">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <FaUserCircle className="w-10 h-10 text-gray-400" />
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {review.is_my_review
                              ? "My Review"
                              : `Review #${index + 1}`}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(review.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          review.rating >= 4
                            ? "success"
                            : review.rating >= 3
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {review.rating}/5
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center p-4">
                    <p className="text-gray-700">{review.feedback}</p>

                    {review.is_my_review && (
                      <div className=" flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReviewToEdit(review);
                            handleReviewModal();
                          }}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(review.id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notes">
            <div className="space-y-4 mt-4">
              {notes &&
                notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <p className="text-gray-700">{note.content}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditNote(note)}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotesAndReviews;
