import { Dispatch } from 'redux'

interface DataUserAction {
  type: string;
  payload: {};
}

interface DataUser { 
  username: string;
  email: string;
  dob: string
}

export const userDataAction = (user:DataUser) => {
  return (dispatch: Dispatch<DataUserAction>) => {
    dispatch({ type: 'USER_DATA', payload: user})
  }
}