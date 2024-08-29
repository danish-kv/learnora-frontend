import React, { useState, useEffect } from "react";

const ModuleItems = ({ number, title, description, expandAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(expandAll);
  }, [expandAll]);

  return (
    <div className="border-b border-gray-200">
      <div
        className="flex items-center justify-between py-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium mr-4">
            {number}
          </span>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <p className="pl-10 pb-4 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default ModuleItems;
