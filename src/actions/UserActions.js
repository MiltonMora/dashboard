import axios from 'axios';

export function Login(data) {
    try {
       return axios.post(`http://127.0.0.1:8000/api/login_check`, data )
        
    }
    catch(error) {
        console.log(error.message);
    }
}

export function getUsers() {
    try {
       const auth = localStorage.getItem('tk');
       return axios.get(`http://127.0.0.1:8000/api/user`, {
        headers: {  Authorization: 'Bearer ' + auth }
      })
    }
    catch(error) {
        console.log(error.message);
    }
}

export function getRoles() {
    try {
       const auth = localStorage.getItem('tk');
       return axios.get(`http://127.0.0.1:8000/api/rol`, {
        headers: {  Authorization: 'Bearer ' + auth }
      })
    }
    catch(error) {
        console.log(error.message);
    }
}

export function setNewUser(data) {
    try {
       const auth = localStorage.getItem('tk');
       return axios.post(`http://127.0.0.1:8000/api/user/new/user`, data, {
        headers: {  Authorization: 'Bearer ' + auth }
      })
    }
    catch(error) {
        console.log(error.message);
    }
}

export function changueStatus(data) {
    try {
       const auth = localStorage.getItem('tk');
       return axios.post(`http://127.0.0.1:8000/api/user/change-status`, data, {
        headers: {  Authorization: 'Bearer ' + auth }
      })
    }
    catch(error) {
        console.log(error.message);
    }
}