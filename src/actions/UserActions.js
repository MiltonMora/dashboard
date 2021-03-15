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
       return axios.get(`http://127.0.0.1:8000/api/user/`, {
        headers: {  Authorization: 'Bearer ' + auth }
      })
    }
    catch(error) {
        console.log(error.message);
    }
}