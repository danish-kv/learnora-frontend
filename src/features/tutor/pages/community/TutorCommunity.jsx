import React from "react";
import TutorSidebar from "../../components/TutorSidebar";
import { Link } from "react-router-dom";
import useFetchCommunity from "../../hooks/useFetchCommunity";
import TutorCommunityCard from "../../components/TutorCommunityCard";

const TutorCommunity = () => {
  const { communities, error, loading } = useFetchCommunity();
  console.log(communities);

  return (
    <div className="h-screen flex">
      <TutorSidebar />
      <div className="ml-64 flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">My Community</h2>
          <Link to="/tutor/community/create">
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Add New Community
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"></div>
        {communities.map((community) => (
          <TutorCommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};
export default TutorCommunity;
