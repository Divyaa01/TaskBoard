import React, { useState, useEffect } from "react";

const TaskList = ({filter}) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState(null); // 'pending', 'completed', 'trash', null
  console.log("Filter prop in TaskList:", filter);
  console.log("Tasks:", tasks);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          console.error("Error fetching tasks:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter((i) => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };


  const handleDelete = async (index) => {
    const taskId = tasks[index]._id;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter((_, i) => i !== index));
        setSelectedTasks(selectedTasks.filter((i) => i !== index));
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkComplete = async (index) => {
    const taskId = tasks[index]._id;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: true }),
      });

      const data = await res.json();
      if (data.success) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = data.task; // update task with response
        setTasks(updatedTasks);
        setSelectedTasks([]); // deselect task after completion
      } else {
        console.error("Failed to mark complete:", data.message);
      }
    } catch (error) {
      console.error("Error marking task complete:", error);
    }
  };

  const deselectAll = () => {
    setSelectedTasks([]);
  };

  const isAnySelected = selectedTasks.length > 0;

  // Apply filter directly
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending'){ 
      console.log("Filtering pending tasks");
      return !task.completed;
    }
    if (filter === 'completed') return task.completed;
    console.log("No filter or trash filter applied, showing all tasks");
    return true;
  });

console.log("Filtered:", filteredTasks);

  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div
      className="max-w-7xl mx-auto px-6 py-6 space-y-6 relative"
      onClick={deselectAll}
    >
      {filteredTasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks found.</p>
      )}

      {filteredTasks.map((task, index) => {
        const isSelected = selectedTasks.includes(index);
        const isDimmed = isAnySelected && !isSelected;

        return (
          <div
            key={task._id}
            onClick={(e) => {
              e.stopPropagation();
              toggleSelect(index);
            }}
            className={`
              bg-gray-200 p-4 rounded relative cursor-pointer transition 
              ${isSelected ? "z-20 shadow-lg scale-105 fixed top-20 left-1/2 -translate-x-1/2 w-96" : ""}
              ${isDimmed ? "opacity-40" : "opacity-100"}
            `}
            style={isSelected ? { height: "200px" } : {}}
          >
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

            {isSelected && (
              <>
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

                {!task.completed && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleMarkComplete(index);
                    }}
                    className="absolute -right-4 top-16 bg-green-500 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-green-600 transition"
                    title="Mark as Complete"
                  >
                    Mark Complete
                  </button>
                )}
              </>
            )}

            <h3
              className={`font-semibold text-lg mb-2 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm text-gray-700 mb-2 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.description}
            </p>
            <p className="text-xs text-gray-500">
              {task.completed ? "✅ Completed" : "⏳ Pending"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
