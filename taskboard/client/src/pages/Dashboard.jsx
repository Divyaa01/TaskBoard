import React from 'react'
import Navbar from '../components/Navbar.jsx'
import CreateButton from '../components/CreateButton.jsx'
import TaskList from '../components/TaskList.jsx'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <Navbar />
      <CreateButton  />
      <TaskList/>

      
     
    
    </div>
  )
}

export default Dashboard