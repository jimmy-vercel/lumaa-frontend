import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateTaskPage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`,
        { title, description, isComplete },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      navigate('/tasks')
    }
    catch (error) {
      console.error('Error creating task:', error);
    }
  }

  return (
    <div className="container container-small">
      <h2>Create new task</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateTaskPage