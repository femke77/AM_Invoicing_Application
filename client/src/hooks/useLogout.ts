import { logout } from '../state/authSlice';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    navigate('/');
  };

  return handleLogout;
};
