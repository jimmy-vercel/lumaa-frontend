import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DeleteTaskPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTask(response.data)
      }
      catch (error) {
        console.error('Error fetching task:', error)
        navigate('/tasks')
      }
    };
    fetchTask()
  }, [taskId, navigate])

  // Handle task deletion
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/tasks')
    }
    catch (error) {
      console.error('Error deleting task:', error)
    }
  };

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className="container container-small">
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete this task?</p>
      <div>
        <strong>Title:</strong> {task.title}
      </div>
      <div>
        <strong>Description:</strong> {task.description}
      </div>
      <div>
        <strong>Status:</strong> {task.isComplete ? 'Completed' : 'Incomplete'}
      </div>
      <br />
      <div>
        <button onClick={handleDelete} className={"button button-delete"}>Delete</button>
        &nbsp;&nbsp;
        <button onClick={() => navigate('/tasks')} className={"button button-cancel"}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteTaskPage