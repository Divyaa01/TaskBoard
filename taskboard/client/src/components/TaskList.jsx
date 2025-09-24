import React, { useState, useEffect } from "react";

const TaskList = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await fetch("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          let savedOrder = JSON.parse(localStorage.getItem("taskOrder") || "[]");
          if (savedOrder.length) {
            const orderedTasks = savedOrder
              .map((id) => data.tasks.find((t) => t._id === id))
              .filter(Boolean);
            const newTasks = data.tasks.filter((t) => !savedOrder.includes(t._id));
            setTasks([...orderedTasks, ...newTasks]);
          } else {
            setTasks(data.tasks);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleSelect = (index) => {
    setSelectedTask(selectedTask === index ? null : index);
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
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        if (selectedTask === index) setSelectedTask(null);
        localStorage.setItem(
          "taskOrder",
          JSON.stringify(newTasks.map((t) => t._id))
        );
      }
    } catch (error) {}
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
        updatedTasks[index] = data.task;
        setTasks(updatedTasks);
        setSelectedTask(null);
      }
    } catch (error) {}
  };

  const moveTask = (index, direction) => {
    const newTasks = [...tasks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;
    [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];
    setTasks(newTasks);
    localStorage.setItem(
      "taskOrder",
      JSON.stringify(newTasks.map((t) => t._id))
    );
    if (selectedTask === index) setSelectedTask(targetIndex);
  };

  const deselectAll = () => {
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 relative" onClick={deselectAll}>
      {filteredTasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks found.</p>
      )}

      {filteredTasks.map((task, index) => {
        const isSelected = selectedTask === index;

        return (
          <div key={task._id} className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(index);
              }}
              className={`bg-gray-200 p-4 rounded cursor-pointer`}
            >
              <h3 className={`font-semibold text-lg mb-2 ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.title}
              </h3>
              <p className={`text-sm text-gray-700 mb-2 ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.description}
              </p>
              <p className="text-xs text-gray-500">
                {task.completed ? "✅ Completed" : "⏳ Pending"}
              </p>

              {isSelected && (
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                      className="bg-red-500 text-white text-sm px-3 py-1 rounded shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    {!task.completed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkComplete(index);
                        }}
                        className="bg-green-500 text-white text-sm px-3 py-1 rounded shadow hover:bg-green-600 transition"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveTask(index, "up");
                }}
                className="bg-gray-300 text-xs px-1 py-0.5 rounded hover:bg-gray-400"
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveTask(index, "down");
                }}
                className="bg-gray-300 text-xs px-1 py-0.5 rounded hover:bg-gray-400"
              >
                ↓
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
