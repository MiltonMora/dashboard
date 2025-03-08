import { apiClient } from './apiClient';
import { User } from './userService';


export interface UserWithSurnames extends User {
  surnames: string;
}

export interface MedicalRecord {
  id: string;
  doctor: UserWithSurnames;
  patient: UserWithSurnames;
  diagnosis: string;
  treatment: string;
  dateStart: Date;
  isActive: boolean;
}

export const list = async () => {
  const res = await apiClient('/record/medical-record/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
  });

  return res;
};


export const userCreate = async (data:MedicalRecord) => {
  const res = await apiClient('/record/medical-record/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
    body:JSON.stringify(data)
  });

  return res;
};

/*export const changeStatus = async (id:string) => {
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

export const changeData = async (data:MedicalRecord) => {
  const res = await apiClient('/admin/user/change-data', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    },
    body: JSON.stringify(data)
  });

  return res;
};*/