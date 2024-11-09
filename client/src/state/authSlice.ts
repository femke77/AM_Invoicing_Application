import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../interfaces/User';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userData: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.userData = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.userData = null;
      localStorage.removeItem('token');
    },
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
  },
});

export const {
  startLoading,
  loginSuccess,
  loginFailure,
  logout,
  setCredentials,
} = authSlice.actions;
export default authSlice.reducer;
