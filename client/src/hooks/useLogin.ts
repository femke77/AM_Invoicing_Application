import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, startLoading } from '../state/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post('/api/auth/login', credentials);

  return response.data;
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      localStorage.setItem('token', data.token);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      dispatch(loginFailure(error.response.data.message));
    },
  });
};
