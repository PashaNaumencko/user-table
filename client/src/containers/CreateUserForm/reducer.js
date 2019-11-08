import { createUser } from '../../routines';

const initialCreateUserState = {
  response: null,
  loading: false,
  error: null
};

export const createUserData = (state = initialCreateUserState, action) => {
  switch (action.type) {
  case createUser.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case createUser.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case createUser.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case createUser.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
