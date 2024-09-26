import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import ContestCard from "../components/ContestCard";
import useFetchContest from "@/features/tutor/hooks/useFetchContest";
import SearchBar from "@/features/courses/components/SearchBar";
import Leaderboard from "../components/Leaderboard";
import useFetchGlobalLeaderboard from "../hooks/useFetchGlobalLeaderboard";
import { LucideTrophy, Trophy, TrophyIcon } from "lucide-react";
import { TrophySpin } from "react-loading-indicators";
import Banner from "@/components/common/Banner";

const ContestPage = () => {
  const { contests, errors, loading } = useFetchContest();

  const {participants} = useFetchGlobalLeaderboard()
  const [searchQuery, setSearchQuery] = useState("");

  

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
        <div className="flex space-x-8">
          <main className="flex-1">
            <SearchBar
              // searchQuery={searchQuery}
              // onSearchChange={handleSearchChange}
              from={"contest"}
            />
            {contests &&
              contests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))}
          </main>
          <aside className="w-64 flex-shrink-0">
            {contests.length > 0 ? (
              <Leaderboard participants={participants} />
            ) : (
              <p>No contest available</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
