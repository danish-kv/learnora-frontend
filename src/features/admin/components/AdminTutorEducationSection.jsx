import { formatDate } from "@/utils/format";
import React from "react";

const AdminTutorEducationSection = ({ education }) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-5 text-gray-800">Education</h3>
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-xl font-medium text-gray-700">
            {edu.highest_qualification}
          </h4>
          <p className="text-lg text-gray-600">{edu.name_of_institution}</p>
          <p className="text-sm text-gray-500">
            Year of Qualification:{" "}
            {edu.year_of_qualification
              ? formatDate(new Date(edu.year_of_qualification), "dd mmmm yyyy")
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AdminTutorEducationSection;
