import { combineReducers } from 'redux';
import { createUserData, modalData } from '../components/BaseFormModal/reducer';
import { fetchUsersData, deleteUsersData } from '../containers/UsersTable/reducer';

export default combineReducers({
  createUserData,
  fetchUsersData,
  deleteUsersData,
  modalData
});
