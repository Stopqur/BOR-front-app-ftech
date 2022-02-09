import jwtDecode from 'jwt-decode'

import { host, authHost } from './index'

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
  try {
    const {data} = await host.post('api/auth/sign-up', { username, email, password, dob })
    return data
  } catch(e) {
    console.log(e)
  }
}

export const login = async ({email, password}: ILogin) => {
  const { data } = await host.post('api/auth/sign-in', { email, password })
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const addToken = async (data: any) => {
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const userProfile = async (id: number | undefined) => {
  try {
    const { data } = await authHost.get('api/auth/user/' + id)
    return data
  } catch (e) {
    console.log("error", e)
  }
}
