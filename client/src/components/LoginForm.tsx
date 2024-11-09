import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { z } from 'zod';
import { LoginSchema } from '../schemas/LoginSchema';
import loginSchema from '../schemas/LoginSchema';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();
  
  const [formState, setFormState] = useState<LoginSchema>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    message?: string;
  }>({});
  
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(formState);
      await login(formState);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.log(error);  
        setErrors({ message: error.response.data.message || 'An error occurred processing your request, try again later.' });
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/invoices');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="john_doe@gmail.com"
          onChange={(e) => {
            setFormState({ ...formState, email: e.target.value });
            setErrors({ ...errors, email: undefined });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setFormState({ ...formState, password: e.target.value });
            setErrors({ ...errors, password: undefined });
          }}
        />
        <button type="submit">Login</button>
      </form>
      {errors.email && <div>{errors.email}</div>}
      {errors.password && <div>{errors.password}</div>}
      {errors.message && <div>{errors.message}</div>}
    </div>
  );
};

export default LoginForm;
