import axios from 'axios';

import baseURL from '../config/url';

const authHost = axios.create({
  baseURL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

export { authHost };
