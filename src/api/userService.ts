import { apiClient } from './apiClient';

export interface UserFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  surNames: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

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


export const userCreate = async (data:UserFormData) => {
  const res = await apiClient('/admin/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
    body:JSON.stringify(data)
  });

  return res;
};

export const changeStatus = async (id:string) => {
  const res = await apiClient('/admin/user/change-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
    body: JSON.stringify({ "userId": id })
  });

  return res;
};