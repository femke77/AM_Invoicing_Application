import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { User } from "./interfaces/User";
import { axiosInterceptor } from "./utils/axiosConfig"
import { useLogout } from "./hooks/useLogout";
import { loginSuccess } from "./state/authSlice";

const App = () => {

  const logout = useLogout();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData: User = jwtDecode(token);
      dispatch(loginSuccess({ token, name: userData.name, email: userData.email, id: userData.id }));
    }
  }, []);


  useEffect(() => {
    axiosInterceptor(logout);
  }, [logout]);

  return <Outlet />;
};

export default App;


