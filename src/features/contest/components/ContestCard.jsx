import { formatDate } from '@/utils/format';
import React from 'react';
import { Link } from 'react-router-dom';

const ContestCard = ({ contest }) => {
  if(!contest){
    console.log('contest data is not getting in contest card');
    
    return <h2>contest is loading</h2>
  }
  console.log('contest card components redered');


  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {contest?.name}
        </h2>
        <span className="text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
          {contest.category?.name}
        </span>
      </div>
      <p className="text-gray-600 mb-4">
        {contest.description.length > 100
          ? contest.description.substring(0, 100) + '...'
          : contest.description}
      </p>
      <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
        <div>
          <span className="block">
            <strong>Start:</strong> {contest?.start_time ? formatDate(new Date(contest.start_time), 'dd, mmmm, yyyy') : 'N/A'}
          </span>
          <span className="block">
            <strong>End:</strong> {contest?.start_time ? formatDate(new Date(contest.end_time), 'dd, mmmm, yyyy') : 'N/A'}
          </span>
        </div>
        <div>
          <span className="block">
            <strong>Max Points:</strong> {contest.max_points}
          </span>
          <span className="block">
            <strong>Questions:</strong> {contest.total_questions}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/contest/${contest.id}`}
          className="text-white bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
        >
          View Details
        </Link>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            contest.status === 'ongoing'
              ? 'bg-green-100 text-green-600'
              : contest.status === 'scheduled'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default ContestCard;
