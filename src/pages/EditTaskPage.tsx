import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTaskPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const task = response.data
      setTitle(task.title)
      setDescription(task.description)
      setIsComplete(task.isComplete)
    };
    fetchTask()
  }, [taskId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`,
        { title, description, isComplete },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      navigate('/tasks')
    }
    catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div className="container container-small">
      <h2>Edit task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            &nbsp; Completed
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditTaskPage