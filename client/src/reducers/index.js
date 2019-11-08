import { combineReducers } from 'redux';
import { createUserData } from '../containers/CreateUserForm/reducer';
import { fetchUsersData } from '../containers/UsersTable/reducer';

export default combineReducers({
  createUserData,
  fetchUsersData
});
