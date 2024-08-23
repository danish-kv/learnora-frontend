import React from 'react'

const CourseDetailsMain = ({course}) => {
  if(!course){
    return null
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <p className="text-sm text-gray-600 mb-1">Course {'>'} {course.category.name} {'>'} {course.title}</p>
    <h1 className="text-3xl font-bold mb-2">
      {course.title}
    </h1>
    {/* <p className="text-gray-600 mb-4">
      Free Java Course with Certificate Online [2024]
    </p> */}
    {/* <div className="flex items-center mb-4">
      <span className="text-2xl font-bold mr-2">4.6</span>
      <div className="text-yellow-400 text-xl">★★★★☆</div>
      <span className="text-sm text-gray-600 ml-2">
        (2,939 ratings)
      </span>
    </div> */}
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <span className="mr-2">👤</span>
      <span>
        A course by {course.tutor.display_name}, {course.tutor.headline}
      </span>
    </div>
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <span>
        Last updated {course.updated_at.slice(0,7)}
      </span>
    </div>
  </div>
  )
}

export default CourseDetailsMain