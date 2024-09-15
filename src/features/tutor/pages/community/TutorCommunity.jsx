import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import TutorSidebar from "../../components/TutorSidebar";
import useFetchCommunity from "../../hooks/useFetchCommunity";
import TutorCommunityCard from "../../components/TutorCommunityCard";

const TutorCommunity = () => {
  const { communities, error, loading } = useFetchCommunity();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <TutorSidebar />
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold mb-4 sm:mb-0 text-gray-800">
                My Communities
              </h2>
              <Link to="/tutor/community/create">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center">
                  <Plus size={20} className="mr-2" />
                  Add New Community
                </button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="relative w-full sm:w-96 mb-4 sm:mb-0">
                <input
                  type="text"
                  placeholder="Search communities..."
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              Loading communities...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
              Error: {error}
            </div>
          ) : (
            <div
              className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"}
            >
              {filteredCommunities.map((community) => (
                <TutorCommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}

          {filteredCommunities.length === 0 && !loading && (
            <div className="text-center text-gray-600 mt-8 bg-white p-8 rounded-lg shadow-md">
              <p className="text-xl font-semibold mb-2">No communities found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorCommunity;
