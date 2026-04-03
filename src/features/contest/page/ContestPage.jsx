import Header from "@/components/layout/Header";
import React, { useState } from "react";
import ContestCard from "../components/ContestCard";
import useFetchContest from "@/features/tutor/hooks/useFetchContest";
import SearchBar from "@/features/courses/components/SearchBar";
import Leaderboard from "../components/Leaderboard";
import useFetchGlobalLeaderboard from "../hooks/useFetchGlobalLeaderboard";
import { Trophy } from "lucide-react";
import Banner from "@/components/common/Banner";
import CardSkeleton from "@/skeleton/CardSkeleton";

const ContestPage = () => {
  const { contests, loading } = useFetchContest();
  const { participants } = useFetchGlobalLeaderboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Banner
        title="Expand Your Knowledge, Compete, and Win!"
        description="Join our exciting contests and challenge yourself to learn more."
        buttonText="Explore a Contest"
        icon={Trophy}
        gradient="bg-gradient-to-r from-green-600 to-emerald-600"
        onClick={() => console.log("Join Contest clicked")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          <main className="lg:flex-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              from="contest"
            />

            <div className="mb-6 lg:hidden">
              <button
                onClick={() => setLeaderboardOpen(!leaderboardOpen)}
                className="w-full bg-white text-emerald-600 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-emerald-50 transition duration-200"
              >
                {leaderboardOpen ? "Hide Leaderboard" : "Show Leaderboard"}
              </button>
            </div>

            <div className="lg:hidden mb-6">
              {leaderboardOpen && <Leaderboard participants={participants} />}
            </div>

            {loading ? (
              [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
            ) : (
              <>
                <div className="space-y-6">
                  {contests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                  ))}
                </div>
                {contests.length === 0 && (
                  <p className="text-center text-gray-500 mt-8">
                    No contests available
                  </p>
                )}
              </>
            )}
          </main>

          <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-8">
              <Leaderboard participants={participants} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
