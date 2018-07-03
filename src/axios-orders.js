import axios from 'axios';

axios.create({
    baseURL: 'https://build-a-burger-452ea.firebaseio.com/'
});

export default instance;