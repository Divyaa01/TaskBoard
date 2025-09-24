import React from 'react';
import Navbar from '../components/Navbar.jsx';
import CreateButton from '../components/CreateButton.jsx';
import TaskList from '../components/TaskList.jsx';
import FilterDropdown from '../components/FilterDropdown.jsx';
import { useState } from 'react';

const Dashboard = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'trash'
  console.log("Current filter in Dashboard:", filter);
  const setFilterHandler = (filter) => {
    setFilter(filter);
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-between px-6 py-4">
        <CreateButton />
        <FilterDropdown setFilter={setFilterHandler}/>
      </div>

      <TaskList filter={filter}/>
    </div>
  );
};

export default Dashboard;
