import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';

const RegisterPage = () => {
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
      <Register />
    </div>
  );
};

export default RegisterPage;