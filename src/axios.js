import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://password-generator-db07b.firebaseio.com/'
});

export default instance;