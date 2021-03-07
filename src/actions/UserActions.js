import axios from 'axios';

export const login = (data) => {
    try {
        axios.post(`http://jsonplaceholder.typicode.com/posts`, data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    catch(error) {
        console.log(error.message);
    }
}