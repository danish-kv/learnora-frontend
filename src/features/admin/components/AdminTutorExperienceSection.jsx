import { formatDate } from "@/utils/format";
import React from "react";

const AdminTutorExperienceSection = ({ experiences }) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-5 text-gray-800">Experience</h3>
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-xl font-medium text-gray-700">{exp.position}</h4>
          <p className="text-lg text-gray-600">{exp.company_name}</p>
          <p className="text-sm text-gray-500">
            {exp.start_date
              ? formatDate(new Date(exp.start_date), "dd mmmm yyyy")
              : "N/A"}{" "}
            -{" "}
            {exp.end_date
              ? formatDate(new Date(exp.end_date), "dd MMMM, yyyy")
              : "Present"}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AdminTutorExperienceSection;
