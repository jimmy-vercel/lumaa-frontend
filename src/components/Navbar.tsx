import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {useContext} from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const { setIsAuthenticated } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/tasks">My tasks</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;