import { createUser, modalVisibility, updateUser } from '../../routines';

const initialResponseState = {
  response: null,
  loading: false,
  error: null
};

const initialModalState = {
  isModalOpen: false,
  editingUser: null
};

export const createUserData = (state = initialResponseState, action) => {
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

export const updateUserData = (state = initialResponseState, action) => {
  switch (action.type) {
  case updateUser.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case updateUser.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case updateUser.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case updateUser.FULFILL:
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
    return {
      ...state,
      isModalOpen: action.payload.value,
      editingUser: action.payload.editingUser
    };
  default:
    return state;
  }
};
