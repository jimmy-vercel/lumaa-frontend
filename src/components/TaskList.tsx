import axios from 'axios';
import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, [tasks]);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};

export default TaskList;