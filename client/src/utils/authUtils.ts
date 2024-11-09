import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const decoded = jwtDecode<DecodedToken>(token);
  return decoded.exp * 1000 < Date.now();
};
