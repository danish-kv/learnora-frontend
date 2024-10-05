import React from "react";

const AdminTutorSkillsSection = ({ skills }) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-5 text-gray-800">Skills</h3>
    <div className="flex flex-wrap">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mr-3 mb-3"
        >
          {skill.skill_name}
        </span>
      ))}
    </div>
  </div>
);

export default AdminTutorSkillsSection;
