import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as userService from '../../services/userService';
import { fetchUsers, deleteUsers } from '../../routines';

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

function* deleteUsersRequest({ payload }) {
  try {
    yield put(deleteUsers.request());
    const deleteUserResponse = yield call(userService.deleteUsers, payload);
    yield put(deleteUsers.success(deleteUserResponse));
    const fetchUsersResponse = yield call(userService.getAllUsers);
    yield put(fetchUsers.success(fetchUsersResponse));
  } catch (error) {
    yield put(deleteUsers.failure(error.message));
  } finally {
    yield put(deleteUsers.fulfill());
  }
}

function* watchDeleteUsersRequest() {
  yield takeEvery(deleteUsers.TRIGGER, deleteUsersRequest);
}

export default function* watchUsersTableSagas() {
  yield all([watchFetchUsersRequest(), watchDeleteUsersRequest()]);
}
