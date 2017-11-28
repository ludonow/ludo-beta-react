import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'https://api.ludonow.com',
  withCredentials: 'true'
});

module.exports = axiosInstance;