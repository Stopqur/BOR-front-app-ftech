interface InitialState {
  userData: any;
}

interface DataUserAction {
  type: string;
  payload?: any;
}

const initialValue: InitialState = {
  userData: {
    id: 0,
    userName: '',
    email: '',
    password: '',
    dob: '',
  },
};

export const userDataReducer = (state = initialValue, action: DataUserAction): InitialState => {
  switch (action.type) {
    case 'USER_DATA':
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
