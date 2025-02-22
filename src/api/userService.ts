import { apiClient } from './apiClient';

export const list = async () => {
  const res = await apiClient('/admin/user/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
  });

  return res;
};