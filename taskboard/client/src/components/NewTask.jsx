import React, { useState } from 'react';
import axios from 'axios';

const NewTask = ({ onClose, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/tasks', {
        title,
        description,
        completed: false,
        createAt: new Date()
      });

      if (response.data.success) {
        onTaskCreated(response.data.task); // Inform parent
        onClose(); // Close form
      } else {
        setError('Task creation failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent background click
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create New Task</h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
