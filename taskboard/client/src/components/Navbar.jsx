import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // "pending", "completed", "trash"

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleFilterDropdown = () => {
    setFilterDropdown(prev => !prev);
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterDropdown(false);
  };

  

  return (
    <div className="bg-gradient-to-r from-purple-200 to-red-300 text-white sticky p-4 top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-purple-900">TaskBoard</div>

        <div className="flex items-center space-x-4 relative">
          



         
          

       
          <button
            onClick={handleProfileClick}
            className="p-2 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FaUserCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
