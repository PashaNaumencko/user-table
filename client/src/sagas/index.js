import { all } from 'redux-saga/effects';
import FormSagas from '../containers/BaseFormModal/sagas';
import UsersTableSagas from '../containers/UsersTable/sagas';

export default function* rootSaga() {
  yield all([
    FormSagas(),
    UsersTableSagas()
  ]);
}
