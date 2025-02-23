import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>My tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="title">{task.title}</div>
            <div className="description">{task.description}</div>
            <div className="status">
              {task.isComplete ? 'Completed' : 'Incomplete'}
            </div>
            <div className="actions">
              <Link to={`/tasks/edit/${task.id}`} className={"button button-edit"}>Edit</Link>
              &nbsp;&nbsp;
              <Link to={`/tasks/delete/${task.id}`} className={"button button-delete"}>Delete</Link>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/tasks/create" className={"button"}>Create new task</Link>
    </div>
  );
};

export default TaskList;