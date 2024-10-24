import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { useParams } from "react-router-dom";

const NoteModal = ({
  showNoteModal,
  setShowNoteModal,
  currentTime,
  data,
  refetch,
  noteToEdit,
  setNoteToEdit,
}) => {

  const {id} = useParams()
  
  
  if (!showNoteModal) return null;
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    console.log(notes);

    if (!notes.trim()){
      displayToastAlert(300, 'Note content cannot be empty')
      return
    }

    
    try {
      if (noteToEdit) {
        const res = await api.patch(`notes/${noteToEdit.id}/`, {
          content: notes,
        });
        if (res.status === 200) {
          displayToastAlert(200, "Note updated successfully")
          setNoteToEdit("");
        } else {
          displayToastAlert(400, "Failed to update note . Please try again");
        }
        setShowNoteModal(false);
        setNotes("");
      } else {
        const res = await api.post("notes/", {
          user: data?.progress?.student?.id,
          content: notes,
          module_id : Number(id),
          timeline: currentTime,
        });

        console.log(res);
        setShowNoteModal(false);
        setNotes("");

        if (res.status === 201) {
          displayToastAlert(200, "Note added successfully");
        } else {
          displayToastAlert(400, "Failed to submit review. Please try again");
        }
      }
      
      refetch();
    } catch (error) {
      displayToastAlert(400, "Failed to submit review. Please try again");
      console.log(error);
    }
  };

  useEffect(() => {
    if (noteToEdit) {
      setNotes(noteToEdit.content);
    }
  }, [noteToEdit]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{noteToEdit ? "Edit Note" : "Add Note"}</h3>
          <button
            onClick={() => {
              setShowNoteModal(false);
              setNoteToEdit("");
              setNotes("");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <p className="mb-2">
          Time:{" "}
          {noteToEdit
            ? `${Math.floor(noteToEdit.timeline / 60)}:${
                noteToEdit.timeline % 60
              }`
            : `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`}
        </p>

        <textarea
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Write your note here..."
          value={notes}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
