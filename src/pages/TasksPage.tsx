import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleTaskCreated = () => {
    setShowForm(false);
    // Optionally refresh the task list
  };

  return (
    <div>
      <h1>Tasks list</h1>
      <TaskList />
      <button onClick={() => setShowForm(true)}>Create New Task</button>
      {showForm && <TaskForm onSuccess={handleTaskCreated} />}
    </div>
  );
};

export default TasksPage;