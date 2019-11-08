import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as userService from '../../services/userService';
import { fetchUsers } from '../../routines';

function* fetchUsersRequest() {
  try {
    yield put(fetchUsers.request());
    const response = yield call(userService.getAllUsers);
    yield put(fetchUsers.success(response));
  } catch (error) {
    yield put(fetchUsers.failure(error.message));
  } finally {
    yield put(fetchUsers.fulfill());
  }
}

function* watchFetchUsersRequest() {
  yield takeEvery(fetchUsers.TRIGGER, fetchUsersRequest);
}

export default function* createRecipePageSagas() {
  yield all([watchFetchUsersRequest()]);
}
