import axios from "axios";
import { store } from "../state/store";
import { isTokenExpired } from "./authUtils";

const axiosInstance = axios.create({
  baseURL: "/api",
});

export const axiosInterceptor = (logout: () => void) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token || "";
      if (!token || isTokenExpired(token)) {
        logout();
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
