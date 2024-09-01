import React from 'react';

const CourseDetailTutorData = ({ data }) => {
    if(!data){
        return null
    }
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm  p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Tutor</h2>
      <div className="flex items-start">
        <img 
          src={data.tutor.user.profile} 
          alt={data.tutor.user.username} 
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h3 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
            {data.tutor.display_name}
          </h3>
          <p className="text-gray-600 mb-2">{data.tutor.headline}</p>
        </div>
      </div>
      <div className="mt-4 text-gray-700">
        <p className="mb-2">{data.tutor.user.bio}</p>
      </div>
    </div>
  );
};

export default CourseDetailTutorData;