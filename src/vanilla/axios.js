import axios from 'axios'

const iaxios = axios.create({
    baseURL: 'http://taskmanager-api.com:5000',
    timeout: 5000,
    withCredentials: true,
    credentials: 'include'
});

export default iaxios