import { createRoutine } from 'redux-saga-routines';

export const fetchUsers = createRoutine('FETCH_USERS');
export const createUser = createRoutine('CREATE_USER');
export const updateUser = createRoutine('UPDATE_USER');
export const deleteUsers = createRoutine('DELETE_USERS');
export const modalVisibility = 'SET_MODAL_VISIBILITY';
