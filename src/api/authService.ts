import { apiClient } from './apiClient';

interface LoginData {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginData) => {
  const res = await apiClient('/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return res.token;
};