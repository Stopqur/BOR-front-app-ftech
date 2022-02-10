import { Dispatch } from 'redux';
import { AuthUserTypes } from '../reducers/authUserReducer';

interface LoginPayloadAction {
  type: string;
  payload: string;
}

interface UserIdAction {
  type: string;
  payload: number;
}

export const authLoginEmailAction = (email: string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({ type: AuthUserTypes.AUTH_LOGIN_EMAIl, payload: email });
  };
};

export const authLoginPasswordAction = (password: string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({ type: AuthUserTypes.AUTH_LOGIN_PASSWORD, payload: password });
  };
};

export const authLoginNameAction = (username: string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({ type: AuthUserTypes.AUTH_LOGIN_USERNAME, payload: username });
  };
};

export const authLoginDobAction = (dob: string) => {
  return (dispatch: Dispatch<LoginPayloadAction>) => {
    dispatch({ type: AuthUserTypes.AUTH_LOGIN_DOB, payload: dob });
  };
};

export const getUserIdAction = (userId: number) => {
  return (dispatch: Dispatch<UserIdAction>) => {
    dispatch({ type: AuthUserTypes.AUTH_LOGIN_ID, payload: userId });
  };
};
