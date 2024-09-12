import React from 'react';

// Define the CommunityCard component
const TutorCommunityCard = ({ community }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img
        className="w-full h-48 object-cover"
        src={community.banner}
        alt={community.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
        <p className="text-gray-600 mb-4">{community.description}</p>
        <div className="flex items-center justify-between text-gray-800">
          <span className="text-sm">Max Participants: {community.max_participants}</span>
          <span className="text-sm">Created At: {new Date(community.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TutorCommunityCard;
