import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchUsers, createUser, updateUser } from '../../routines';
import * as userService from '../../services/userService';

function* createUserRequest({ payload }) {
  try {
    yield put(createUser.request());
    const createUserResponse = yield call(userService.createUser, payload);
    yield put(createUser.success(createUserResponse));
    const fetchUsersResponse = yield call(userService.getAllUsers);
    yield put(fetchUsers.success(fetchUsersResponse));
  } catch (error) {
    yield put(createUser.failure(error.message));
  } finally {
    yield put(createUser.fulfill());
    payload.setModalVisibility(false);
  }
}

function* watchCreateUserRequest() {
  yield takeEvery(createUser.TRIGGER, createUserRequest);
}

function* updateUserRequest({ payload }) {
  try {
    yield put(updateUser.request());
    const updateUserResponse = yield call(userService.updateUser, payload);
    yield put(updateUser.success(updateUserResponse));
    const fetchUsersResponse = yield call(userService.getAllUsers);
    yield put(fetchUsers.success(fetchUsersResponse));
  } catch (error) {
    yield put(updateUser.failure(error.message));
  } finally {
    yield put(updateUser.fulfill());
    payload.setModalVisibility(false);
  }
}

function* watchUpdateUserRequest() {
  yield takeEvery(updateUser.TRIGGER, updateUserRequest);
}

export default function* createUserFormSagas() {
  yield all([watchCreateUserRequest(), watchUpdateUserRequest()]);
}
