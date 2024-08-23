import React from 'react'

const CourseDetailsCard = ({course}) => {
    if(!course){
        return null
    }
  return (
    <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <img
                src={course.thumbnail}
                alt="Course preview"
                className="w-full h-32 object-cover rounded-t-lg mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold">{course.price}</span>
                <span className="text-sm text-gray-500 line-through">{course.price + 100}</span>
                <span className="text-sm text-green-600 font-semibold">
                  50% Off
                </span>
              </div>
              <div className="flex items-center mb-2">
                {/* <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm text-gray-600">4.7 (55947 ratings)</span> */}
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-md mb-4">
                Start Learning
              </button>
              <h4 className="font-semibold mb-2">This Course included</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Money Back Guarantee
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Access on all devices
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  {course.modules.length} Modules
                </li>
              </ul>
              <div className="flex items-center mt-4">
                <img
                  src={course.tutor.user.profile}
                  alt="tutor"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">
                  {course.tutor.headline}
                </span>
              </div>
            </div>
          </div>
  )
}

export default CourseDetailsCard