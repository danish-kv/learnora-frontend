// ExperienceModal.jsx
import React from "react";
import Modal from "../components/Modal";

const ExperienceModal = ({
  isOpen,
  onClose,
  editExperience,
  onInputChange,
  onSave,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-semibold mb-4">Edit Experience</h2>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Position</label>
      <input
        type="text"
        name="position"
        value={editExperience.position || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Company</label>
      <input
        type="text"
        name="company_name"
        value={editExperience.company_name || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-medium">Start Date</label>
      <input
        type="date"
        name="start_date"
        value={editExperience.start_date || ""}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-medium">End Date</label>
      <input
        type="date"
        name="end_date"
        value={editExperience.end_date || ""}
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

export default ExperienceModal;
