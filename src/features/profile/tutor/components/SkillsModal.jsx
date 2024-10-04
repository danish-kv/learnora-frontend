// SkillsModal.jsx
import React from "react";
import Modal from "../components/Modal";

const SkillsModal = ({
  isOpen,
  onClose,
  editSkills,
  onInputChange,
  onSave,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-semibold mb-4">Edit Skills</h2>
    {editSkills.map((skill, index) => (
      <div key={index} className="mb-4">
        <label className="block mb-2 font-medium">Skill Name</label>
        <input
          type="text"
          value={skill.skill_name || ""}
          onChange={(e) => onInputChange(index, e.target.value)} // Pass index and value directly
          className="w-full border p-2 rounded"
        />
      </div>
    ))}
    <button
      onClick={onSave}
      className="bg-indigo-600 hover:indigo-700 text-white px-4 py-2 rounded"
    >
      Save
    </button>
  </Modal>
);

export default SkillsModal;
