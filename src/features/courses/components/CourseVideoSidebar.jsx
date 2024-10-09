import React, { useState } from "react";
import {
  FaPlay,
  FaBook,
  FaCheck,
  FaLock,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { formatDuration } from "../../../utils/format";

const CourseVideoSidebar = ({
  modules,
  activeModule,
  handleModuleClick,
  onSidebarToggle,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    onSidebarToggle(newMinimizedState); 
  };

  if (isMinimized) {
    return (
      <button
        onClick={toggleMinimize}
        className="fixed bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 z-50"
      >
        <FaBars className="text-xl" />
      </button>
    );
  }

  return (
    <div
      className={`w-96 flex-shrink-0 transition-all duration-300 ease-in-out ${
        isMinimized ? "translate-x-full" : ""
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 z-40">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
          <button
            onClick={toggleMinimize}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {modules &&
            modules.map((module, index) => (
              <div
                key={module?.id}
                onClick={() => handleModuleClick(module)}
                className={`cursor-pointer p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
                  activeModule?.id === module?.id
                    ? "bg-indigo-50 border-l-4 border-indigo-500"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`font-semibold text-lg flex items-center transition-colors duration-200 ${
                      activeModule?.id === module?.id
                        ? "text-indigo-700"
                        : "text-gray-800"
                    }`}
                  >
                    {activeModule?.id === module?.id ? (
                      <FaPlay className="inline-block mr-3 text-indigo-500" />
                    ) : module.is_watched ? (
                      <FaCheck className="inline-block mr-3 text-green-500" />
                    ) : (
                      <FaLock className="inline-block mr-3 text-gray-400" />
                    )}
                    <span className="truncate">{module.title}</span>
                  </h3>
                  <span className="text-sm font-medium text-gray-500 ml-2">
                    {formatDuration(module.duration)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Module {index + 1} of {modules.length}
                </div>
              </div>
            ))}
        </div>

        {activeModule && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <FaBook className="mr-2 text-indigo-500" />
              Study Materials
            </h3>
            {activeModule.notes ? (
              <a
                href={activeModule.notes}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-indigo-50 p-3 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
              >
                <div className="font-medium mb-1">View Study Notes</div>
                <div className="text-sm text-indigo-600">
                  Supplementary material for {activeModule.title}
                </div>
              </a>
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg text-gray-600 italic">
                No study materials available for this module.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVideoSidebar;
