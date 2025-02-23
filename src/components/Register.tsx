import axios from 'axios';
import { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        'username': username,
        'password': password,
      });
      console.log(response)
      if (response.data.token) {
        //localStorage.setItem('token', response.data.token);
        navigate('/login');
      }
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <div className={"text-center"}>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;