import React, { useState } from 'react';
import NewTask from './NewTask';

const CreateButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]); 

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleTaskCreated = (task) => {
    setTasks((prev) => [...prev, task]); 
    window.location.reload(); 
  };

  return (
    <div className="max-w-7xl mt-4">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        + Create New
      </button>

      {showForm && (
        <NewTask
          onClose={handleClose}
          onTaskCreated={handleTaskCreated}
        />
      )}

    
    </div>
  );
};

export default CreateButton;
