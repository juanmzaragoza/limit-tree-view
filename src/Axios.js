import axios from "axios";
import {getPlainFrom} from "./utils/storage";

const Axios = axios.create();
const authToken = () => 'Bearer ' + getPlainFrom('token');
Axios.defaults.baseURL = 'https://10.35.3.44:8083/';

Axios.interceptors.request.use(function (conf) {
  // Do something before request is sent
  conf.headers = {
    "Authorization": authToken(),
    "Content-Type": "application/json",
  }

  return conf;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


/** Handle errors */
let key;
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
  return Promise.reject(error);
});

export default Axios;