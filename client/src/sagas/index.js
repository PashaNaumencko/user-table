import { all } from 'redux-saga/effects';
import createUserFormSagas from '../containers/CreateUserForm/sagas';
import fetchAllUsersSagas from '../containers/UsersTable/sagas';

export default function* rootSaga() {
  yield all([
    createUserFormSagas(),
    fetchAllUsersSagas()
  ]);
}
