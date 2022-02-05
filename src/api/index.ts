import axios from "axios";

const authhost = axios.create({
  baseURL: 'http://localhost:5000/'
})

const host = axios.create({
  baseURL: 'http://localhost:5000/'
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)

export {
  authhost,
  host
}