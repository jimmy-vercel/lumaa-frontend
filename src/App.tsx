import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import DeleteTaskPage from './pages/DeleteTaskPage'
import Navbar from './components/Navbar'
import { AppContext } from './context/AppContext'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        {isAuthenticated && (
          <Navbar />
        )}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/tasks" /> : <RegisterPage />} />
          <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/edit/:taskId" element={isAuthenticated ? <EditTaskPage /> : <Navigate to="/login" />} />
          <Route path="/tasks/delete/:taskId" element={isAuthenticated ? <DeleteTaskPage /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}