import React from "react";
import { Link } from "react-router-dom";
import TutorContestCard from "../../components/TutorContestCard";
import useFetchContest from "../../hooks/useFetchContest";
import PaginationComponent from "@/features/courses/components/Pagination";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import CardSkeleton from "@/skeleton/CardSkeleton";

const TutorContest = () => {
  const { contests, loading } = useFetchContest();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
          My Contests
        </h1>
        <Link to="/tutor/contest/create">
          <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-150 ease-in-out">
            Add New Contest
          </button>
        </Link>
      </div>

      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/tutor"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                Contest
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {contests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest) => (
                <TutorContestCard key={contest.id} contest={contest} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">You have no contests yet.</p>
              <p>Click "Add New Contest" to create your first contest.</p>
            </div>
          )}
        </>
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
