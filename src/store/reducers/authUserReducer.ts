export const enum AuthUserTypes {
  AUTH_LOGIN_EMAIl = 'AUTH_LOGIN_EMAIl',
  AUTH_LOGIN_PASSWORD = 'AUTH_LOGIN_PASSWORD',
  AUTH_LOGIN_USERNAME = 'AUTH_LOGIN_USERNAME',
  AUTH_LOGIN_DOB = 'AUTH_LOGIN_DOB',
  AUTH_LOGIN_ID = 'AUTH_LOGIN_ID',
}

interface AuthLoginAction {
  type: string;
  payload: string;
}

interface AuthUserIdAction {
  type: string;
  payload: any;
}

interface AuthState {
  username?: string;
  email?: string;
  password?: string;
  dob?: string;
  userId?: number;
}

const initialState: AuthState = {
  username: '',
  email: '',
  password: '',
  dob: '',
  userId: 0,
};

export const authUserReducer = (state = initialState, action: AuthLoginAction): AuthState => {
  switch (action.type) {
    case AuthUserTypes.AUTH_LOGIN_EMAIl:
      return { ...state, email: action.payload };
    case AuthUserTypes.AUTH_LOGIN_PASSWORD:
      return { ...state, password: action.payload };
    case AuthUserTypes.AUTH_LOGIN_USERNAME:
      return { ...state, username: action.payload };
    case AuthUserTypes.AUTH_LOGIN_DOB:
      return { ...state, dob: action.payload };
    default:
      return state;
  }
};

export const userIdReducer = (state = initialState, action: AuthUserIdAction): AuthState => {
  switch (action.type) {
    case AuthUserTypes.AUTH_LOGIN_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
