import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-burger-app-1a894.firebaseio.com/'
});

export default axiosInstance;