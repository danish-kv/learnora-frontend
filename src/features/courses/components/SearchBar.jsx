import React from 'react'

const SearchBar = ({searchQuery, onSearchChange}) => {
  return (
    <div className='mb-4'>
        <input type="text" value={searchQuery} onChange={(e) => (onSearchChange(e.target.value))} 
        placeholder='Search course...'
        className='w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500'/>
    </div>
  )
}

export default SearchBar