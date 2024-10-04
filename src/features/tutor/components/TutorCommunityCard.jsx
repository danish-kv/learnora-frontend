import React from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';

const TutorCommunityCard = ({ community }) => {

  return (
    <div className="bg-white border rounded-lg overflow-hidden w-full transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={community.banner}
          alt={community.name}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-xl font-semibold text-white">{community.name}</h2>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4 h-16 overflow-hidden">{community.description}</p>
        <div className="flex items-center justify-between text-gray-800 mb-4">
          <span className="flex items-center text-sm">
            <Users size={16} className="mr-2" />
            Max: {community.max_participants}
          </span>
          <span className="flex items-center text-sm">
            <Calendar size={16} className="mr-2" />
            {community.created_at ? formatDate(new Date(community.created_at), 'dd, mmmm, yyyy') : 'N/A'}
          </span>
        </div>
        <Link to={`/tutor/community/${community.slug}`}>
        <button    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
          View Details
          <ArrowRight size={16} className="ml-2" />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCommunityCard;