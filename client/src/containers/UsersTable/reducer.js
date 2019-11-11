import { fetchUsers, deleteUsers, isUsersSorting } from '../../routines';
import sortBy from 'lodash.sortby';

const initialFetchAllUsersState = {
  users: [],
  loading: false,
  error: null
};

const initialResponseState = {
  response: null,
  loading: false,
  error: null
};

export const fetchUsersData = (state = initialFetchAllUsersState, action) => {
  switch (action.type) {
  case fetchUsers.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case fetchUsers.SUCCESS:
    return {
      ...state,
      users: action.payload
    };
  case fetchUsers.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case fetchUsers.FULFILL:
    return {
      ...state,
      loading: false
    };
  case isUsersSorting:
    if(action.payload.direction === 'ascending')  {
      return {
        ...state,
        users: sortBy(state.users, [action.payload.column])
      };
    }
    return {
      ...state,
      users: [...state.users].reverse()
    };
  default:
    return state;
  }
};


export const deleteUsersData = (state = initialResponseState, action) => {
  switch (action.type) {
  case deleteUsers.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case deleteUsers.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case deleteUsers.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case deleteUsers.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
