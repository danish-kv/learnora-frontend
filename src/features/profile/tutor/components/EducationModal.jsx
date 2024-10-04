// EducationModal.jsx
import React from "react";
import Modal from "../components/Modal";

const EducationModal = ({
  isOpen,
  onClose,
  editEducation,
  onInputChange,
  onSave,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-semibold mb-4">Edit Education</h2>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Qualification</label>
      <input
        type="text"
        name="highest_qualification"
        value={editEducation.highest_qualification || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Institution</label>
      <input
        type="text"
        name="name_of_institution"
        value={editEducation.name_of_institution || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Year of Qualification</label>
      <input
        type="date"
        name="year_of_qualification"
        value={editEducation.year_of_qualification || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <button
      onClick={onSave}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Save
    </button>
  </Modal>
);

export default EducationModal;
