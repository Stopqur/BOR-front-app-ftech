import jwtDecode from 'jwt-decode'

import { $host, $authhost } from './index'

export const registration = async (username, email, password, dob) => {
  return await $host.post('api/auth/sign-up', { username, email, password, dob })
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/auth/sign-in', { email, password })
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const check = async () => {
  const { data } = await $host.get('api/auth/user/')
  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const userProfile = async (id) => {
  try {
    const { data } = await $authhost.get('api/auth/user/' + id)
    return data
  } catch (e) {
    console.log("error", e)
  }
}