import { useLogout } from '../hooks/useLogout';

const LogoutButton: React.FC = () => {
  const logout = useLogout();
  const handleClick = () => {
    logout();
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
