import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Search } from "lucide-react";
import useFetchNotes from "../hooks/useFetchNotes";
import { formatDate } from "@/utils/format";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";

const SavedNotes = () => {
  const { notes, getNotes } = useFetchNotes();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You really want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await api.delete(`notes/${id}/`);
          getNotes();
          displayToastAlert(200, "You have been successfully Deleted notes");
        } catch (error) {
          console.log(error);
          displayToastAlert(200, "There was an issue with deleting the note");
        }
      }
    });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note?.module?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Notes</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
          icon={<Search className="w-4 h-4" />}
        />
      </div>
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg">{note?.module?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{note.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Created:{" "}
                  {formatDate(new Date(note.created_at), "dd MMM yyyy")}
                </p>
                <p className="text-gray-500 text-sm">
                  Timeline: {note.timeline}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedNotes;
