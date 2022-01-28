import { Dispatch } from 'redux'

interface AuthAction {
  type: string;
  payload: boolean;
}

interface LoginPayloadAction {
  type: string;
  payload: string;
}

interface UserIdAction {
  type: string;
  payload: number;
}

export const authCheckAction = (flag: boolean) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: 'AUTH_CHECK', payload: flag })
  }
}

export const authLoginEmailAction = (email:string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({type: 'AUTH_LOGIN_EMAIl', payload: email})
  }
}

export const authLoginPasswordAction = (password:string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({type: 'AUTH_LOGIN_PASSWORD', payload: password})
  }
}

export const authLoginNameAction = (username:string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({type: 'AUTH_LOGIN_USERNAME', payload: username})
  }
}

export const authLoginDobAction = (dob:string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({type: 'AUTH_LOGIN_DOB', payload: dob})
  }
}

export const getUserIdAction = (userId:number) => {
  console.log(userId)
  return (dispatch: Dispatch<UserIdAction>) => {
    dispatch({type: 'AUTH_LOGIN_ID', payload: userId})
  }
}