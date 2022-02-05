import jwtDecode from 'jwt-decode'

import { host, authhost } from './index'

interface IRegistration {
  username: string;
  email: string;
  password: string;
  dob: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const registration = async ({username, email, password, dob}: IRegistration) => {
  await host.post('api/auth/sign-up', { username, email, password, dob })
}

export const login = async ({email, password}: ILogin) => {
  const { data } = await host.post('api/auth/sign-in', { email, password })
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const check = async () => {
  const { data } = await host.get('api/auth/user/')
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const userProfile = async (id: string) => {
  try {
    const { data } = await authhost.get('api/auth/user/' + id)
    return data
  } catch (e) {
    console.log("error", e)
  }
}