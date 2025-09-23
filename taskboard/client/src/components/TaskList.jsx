import React, { useState } from 'react';

const TaskList = () => {
  const placeholders = Array(6).fill(0);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const toggleSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter(i => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const handleDelete = (index) => {
    console.log('Delete task at index:', index);
  };

  const deselectAll = () => {
    setSelectedTasks([]);
  };

  const isAnySelected = selectedTasks.length > 0;

  return (
    // Background wrapper (clicking here will deselect all)
    <div
      className="max-w-7xl mx-auto px-6 py-6 space-y-6 relative"
      onClick={deselectAll}
    >
      {placeholders.map((_, index) => {
        const isSelected = selectedTasks.includes(index);
        const isDimmed = isAnySelected && !isSelected;

        return (
          // Task box: stop propagation to prevent background click
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // prevent background from being clicked
              toggleSelect(index);
            }}
            className={`
              bg-gray-200 p-4 rounded relative cursor-pointer transition 
              ${isSelected ? 'z-20 shadow-lg scale-105 fixed top-20 left-1/2 -translate-x-1/2 w-96' : ''}
              ${isDimmed ? 'opacity-40' : 'opacity-100'}
            `}
            style={isSelected ? { height: '200px' } : {}}
          >
            {/* Deselect button */}
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(index);
                }}
                className="absolute -right-4 -top-4 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-purple-700"
                title="Deselect task"
              >
                &times;
              </button>
            )}

            {/* Delete button */}
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="absolute -right-4 top-8 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
                title="Delete task"
              >
                Delete
              </button>
            )}

            {/* Placeholder content */}
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
