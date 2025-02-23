import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        username: username,
        password: password,
      });
      console.log('API Response:', response);

      // Ensure the token is in the expected location in the response
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token set:', localStorage.getItem('token'));

        // Navigate to the tasks page
        console.log('Navigating to /tasks');
        setIsAuthenticated(true);
        navigate('/tasks');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <div className={"text-center"}>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;