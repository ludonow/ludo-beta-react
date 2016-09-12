import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/'
});

module.exports = axiosInstance;

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://ludotest.rzbyc5phqb.ap-southeast-1.elasticbeanstalk.com";