interface AuthCheckAction {
  type: string;
  payload: any;
}

interface AuthState {
  authCheck: boolean;
}

const initialState: AuthState = {
  authCheck: false,
}

export const authReducer = (state = initialState, action: AuthCheckAction): AuthState => {
  switch (action.type) {
    case 'AUTH_CHECK':
      return {...state, authCheck: action.payload}
    default: 
      return state
  }
}