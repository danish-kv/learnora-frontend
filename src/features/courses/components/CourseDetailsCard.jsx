import React from 'react';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const CourseDetailsCard =  ({ course }) => {
  if (!course) {
    return null;
  }
  


  const handleLifeTimePurchase = async () => {
    try {
      const res = await api.post('stripe/course-purchase', {
        course_id : course.id,
        access_type : 'Lifetime'
      })
      console.log(res);
      

    window.location.href = res.data.url
    } catch (error) {
      console.log(error);
      
      
    }
    
  }


  const handleRentPurchase = async () => {

    try {
      
      const res = await api.post('stripe/course-purchase', {
        course_id : course.id,
        access_type : 'Rental'
      })
      console.log(res);

      window.location.href = res.data.url


    } catch (error) {

      console.log(error);
      
      
    }
    
  }

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
        <img
          src={course.thumbnail}
          alt="Course preview"
          className="w-full h-32 object-cover rounded-t-lg mb-4"
        />
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-xl font-bold text-gray-800">${course.price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${course.price + 100}</span>
            </div>
            <span className="text-sm text-green-600 font-semibold">
              50% Off
            </span>
          </div>
          {course.rental_price > 0 && (
            <div className="bg-blue-100 text-blue-700 text-sm p-2 rounded-md mt-2">
              <span className="font-semibold">Rent this course:</span> ${course.rental_price} for {course.rental_duration} days
            </div>
          )}
        </div>
        <div className="flex space-x-2 mb-4">
          <button onClick={handleLifeTimePurchase} className="w-full bg-purple-600 text-white py-2 rounded-md">
            Buy Course
          </button>
          {course.rental_price > 0 && (
            <button onClick={handleRentPurchase} className="w-full bg-blue-600 text-white py-2 rounded-md">
              Rent Course
            </button>
          )}
        </div>
        
        {/* <button className="w-full bg-purple-600 text-white py-2 rounded-md mb-4">
          Start Learning
        </button> */}
        <h4 className="font-semibold mb-2">This Course Includes:</h4>
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
            alt="Tutor"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">
            {course.tutor.headline}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
