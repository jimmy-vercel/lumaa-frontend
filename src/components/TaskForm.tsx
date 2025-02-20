import axios from 'axios';
import { useState } from 'react';

interface TaskFormProps {
  task?: { id: string; title: string; description: string }; // For editing a task
  onSuccess: () => void; // Callback after successful submission
}

const TaskForm = ({ task, onSuccess }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated.');
      return;
    }

    try {
      if (task) {
        // Update existing task
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/${task.id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new task
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/tasks`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onSuccess(); // Refresh task list or close modal
    } catch (error) {
      setError('Failed to save task. Please try again.');
      console.error('Task submission error:', error);
    }
  };

  return (
    <div className="container">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;