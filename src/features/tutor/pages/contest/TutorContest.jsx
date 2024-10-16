import React from "react";
import { Link } from "react-router-dom";
import TutorContestCard from "../../components/TutorContestCard";
import useFetchContest from "../../hooks/useFetchContest";
import PaginationComponent from "@/features/courses/components/Pagination";

const TutorContest = () => {
  const { contests } = useFetchContest();

  return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-0">
                My Contests
              </h2>
              <Link to="/tutor/contest/create">
                <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-150 ease-in-out">
                  Add New Contest
                </button>
              </Link>
            </div>
            {contests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.map((contest, index) => (
                  <TutorContestCard key={index} contest={contest} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p className="text-xl">You have no contests yet.</p>
                <p>Click "Add New Contest" to create your first contest.</p>
              </div>
            )}
            {/* {contests.length > 0 && (
                <div className="mt-8">
                  <PaginationComponent
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    page={page}
                  />
                </div>
              )} */}
          </div>
  );
};

export default TutorContest;
