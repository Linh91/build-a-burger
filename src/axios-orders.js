import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-a-burger-452ea.firebaseio.com/'
});

export default instance;