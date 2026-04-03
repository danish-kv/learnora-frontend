import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Search, Users } from "lucide-react";
import CommunityCard from "../components/CommunityCard";
import useFetchCommunity from "@/features/tutor/hooks/useFetchCommunity";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import Banner from "@/components/common/Banner";
import { useSelector } from "react-redux";
import { displayToastAlert } from "@/utils/displayToastAlert";
import CardSkeleton from "@/skeleton/CardSkeleton";
import Swal from "sweetalert2";

const CommunityPage = () => {
  const { communities, error, loading } = useFetchCommunity();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const filteredCommunities = communities?.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinCommuntiy = async (slug, name) => {
    try {
      if (!user) {
        console.log("not user found");
        displayToastAlert(100, "Please login to continue...");
        return navigate("/login");
      }
      const res = await api.post(`community/${slug}/join/`);
      if (res.status === 200) {
        await Swal.fire(
          "Joined",
          `Successfully joined ${name} community`,
          "success"
        );
        navigate(`/community/${slug}`);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      const ErrorMessage =
        error?.response?.data?.error || "Failed to join to community";
      console.log(ErrorMessage);

      await Swal.fire("Error", ErrorMessage, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner
        title="Discover Your Community"
        description="Connect, learn, and grow with tutors and fellow students in our vibrant learning ecosystem."
        buttonText="Join Community"
        icon={Users}
        gradient="bg-gradient-to-r from-purple-600 to-pink-500"
        onClick={() => console.log("Join Community clicked")}
      />

      <div className="max-w-7xl mx-auto p-4">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">
            Explore Communities
          </h2>
          <div className="flex w-full md:w-auto space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search communities..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button> */}
          </div>
        </div>

        {/* Community List */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
          ) : (
            <>
              {filteredCommunities?.map((community) => (
                <CommunityCard
                  onJoin={handleJoinCommuntiy}
                  key={community.id}
                  community={community}
                />
              ))}
            </>
          )}
        </div>

        {filteredCommunities?.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No communities found
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
