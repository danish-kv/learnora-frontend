import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TutorSidebar from '../../components/TutorSidebar';
import TutorContestCard from '../../components/TutorContestCard';
import useFetchContest from '../../hooks/useFetchContest';
import PaginationComponent from '@/features/courses/components/Pagination';

const TutorContest = () => {
  const {contests, errors, loading} = useFetchContest()


  return (
    <div className="h-screen flex">
      <TutorSidebar />
      <div className="ml-64 flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">My Contest</h2>
          <Link to="/tutor/contest/create">
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Add New Contest
            </button>
          </Link>
        </div>
        { <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest, index) => (
            <TutorContestCard
              key={index}
              contest={contest}
              // onBlockToggle={handleBlock}
            />
          ))}
        </div> }
         {/* {contests.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        )}  */}
      </div>
    </div>
  );
};


export default TutorContest