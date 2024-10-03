import React from "react";

const SearchBar = ({ searchQuery, onSearchChange, from }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${from}...`}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
      />
    </div>
  );
};

export default SearchBar;
