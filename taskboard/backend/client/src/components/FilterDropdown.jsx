import React, { useState, useEffect, useRef } from 'react';


const FilterDropdown = ({setFilter}) => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // pending/completed/trash
  const dropdownRef = useRef();

  const toggleFilterDropdown = () => {
    setFilterDropdown(prev => !prev);
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterDropdown(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderFilterContent = () => {
    switch (selectedFilter) {
      // case 'pending':
      //   setFilter('pending');
      // case 'completed':
      //   setFilter('completed');
      // case 'trash':
      //   setFilter('trash');
      // default:
      //   return null;
    }
  };

  return (
    <div className="max-w-7xl  mt-4" ref={dropdownRef}>
      <button
        onClick={toggleFilterDropdown}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        {selectedFilter ? `Filter: ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}` : 'Filter'}
      </button>

      {filterDropdown && (
        <div className="absolute top-10 right-0 bg-white text-black shadow-lg rounded-md z-50 w-40 overflow-y-auto p-2">
          <button
            onClick={() => {
              selectFilter
              setFilter('pending')}}
            className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
          >
            Pending
          </button>
          <button
            onClick={() => {setFilter('completed');
            selectFilter('completed')
            }}
            className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
          >
            Completed
          </button>
          {/* <button
            onClick={() => setFilter('trash')}
            className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
          >
            Trash
          </button> */}
          <button
            onClick={() => {
              setFilter('all');
              selectFilter('all')}}
            className="mt-2 w-full px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            All
          </button>
        </div>
      )}

      {selectedFilter && filterDropdown && (
        <div className="absolute top-10 right-0 bg-white text-black shadow-lg rounded-md z-40 w-96 max-h-96 overflow-y-auto p-4">
          {renderFilterContent()}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
