import React, { useState } from 'react';
import NewTask from './NewTask'; // Import the form component

const CreateButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleTaskCreated = (task) => {
    console.log('Task created:', task);
    setShowForm(false);
    // Optional: update global task list (lift this up if needed)
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
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
