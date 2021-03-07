import axios from 'axios';

export function Login(data) {
    try {
       return axios.post(`http://127.0.0.1:8000/api/login_check`, data )
        
    }
    catch(error) {
        console.log(error.message);
    }
}