import { createUser, modalVisibility } from '../../routines';

const initialCreateUserState = {
  response: null,
  loading: false,
  error: null
};

const initialModalState = {
  isModalOpen: false
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

export const modalData = (state = initialModalState, action) => {
  switch (action.type) {
  case modalVisibility:
    console.log(action);
    return {
      ...state,
      isModalOpen: action.payload
    };
  default:
    return state;
  }
};
