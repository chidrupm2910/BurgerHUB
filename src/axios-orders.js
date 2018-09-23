import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burgerhub.firebaseio.com/'
});

export default instance;