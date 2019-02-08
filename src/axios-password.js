import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-fbd05.firebaseio.com/'
});

export default instance;