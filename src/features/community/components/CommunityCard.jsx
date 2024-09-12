import React from "react";
import { Users, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CommunityCard = ({ community }) => {
  if (!community) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Banner Image */}
      <div className="relative h-40">
        {community.banner ? (
          <img
            src={community.banner}
            alt={`${community.name} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white">{community.name}</h3>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{community.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Users size={16} className="mr-1" />
            {community.participants.length} members
          </span>
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {new Date(community.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            {community.messageCount || 0} messages
          </span>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;