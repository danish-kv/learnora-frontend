import React, { useState } from 'react';
import SyllabusItem from './SyllabusItem';

const CourseModules = ({course}) => {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  if(!course){
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Syllabus</h2>
        <button 
          className="text-indigo-600 font-semibold text-sm" 
          onClick={toggleExpandAll}
        >
          {expandAll ? 'Collapse all sections' : 'Expand all sections'}
        </button>
      </div>
      {/* <p className="text-sm text-gray-500 mb-6">14 lessons • 13 projects • 13 quizzes</p> */}
      <p className="text-sm text-gray-500 mb-6">{Object.keys(course.modules).length} lessons</p>
      {course.modules.map((module,index) => (

      <SyllabusItem
        number={index+1}
        title={module.title}
        description={module.description}
        expandAll={expandAll}
      />
      ))}
      
    </div>
  );
};

export default CourseModules;
