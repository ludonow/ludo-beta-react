import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'http://api.ludonow.com',
  withCredentials: 'true'
});

module.exports = axiosInstance;