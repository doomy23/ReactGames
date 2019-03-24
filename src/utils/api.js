import axios from 'axios';

export default axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/`,
  responseType: 'json'
});
