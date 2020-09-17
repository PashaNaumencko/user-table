import { combineReducers } from 'redux';
import { createUserData, updateUserData, modalData } from '../containers/BaseFormModal/reducer';
import { fetchUsersData, deleteUsersData } from '../containers/UsersTable/reducer';

export default combineReducers({
  createUserData,
  fetchUsersData,
  deleteUsersData,
  updateUserData,
  modalData
});
