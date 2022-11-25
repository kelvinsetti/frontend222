import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-vendas-2.herokuapp.com/',
});

export default api;
