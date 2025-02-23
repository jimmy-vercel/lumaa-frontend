import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AppContext);

  // Redirect to tasks page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, don't render the Login component
  if (isAuthenticated) {
    navigate('/tasks');
  }

  return (
    <div className="container container-small">
      <Login />
    </div>
  );
};

export default LoginPage;