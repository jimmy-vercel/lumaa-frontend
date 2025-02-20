import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirect to tasks page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <Login />
    </div>
  );
};

export default LoginPage;