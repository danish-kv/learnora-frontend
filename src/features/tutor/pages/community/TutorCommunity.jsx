import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "@/skeleton/CardSkeleton";
import { Search, Plus, Home, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useFetchCommunity from "../../hooks/useFetchCommunity";
import TutorCommunityCard from "../../components/TutorCommunityCard";

const TutorCommunity = () => {
  const { communities, error, loading } = useFetchCommunity();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="mb-8">
        <CardHeader className="space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight  text-gray-700">
              My Communities
            </h1>
            <Link to="/tutor/community/create">
              <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Community
              </Button>
            </Link>
          </div>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Link
                  to="/tutor"
                  className="flex items-center hover:text-indigo-600 transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">Communities</span>
              </li>
            </ol>
          </nav>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:max-w-sm pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <CardSkeleton />
      ) : error ? (
        <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
  );
};

export default TutorCommunity;
