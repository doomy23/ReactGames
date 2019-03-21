import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR } from './constants';

export function loadUser() {
  return {
    type: LOAD_USER
  };
}

export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user
  };
}

export function loadUserError(error) {
  return {
    type: LOAD_USER_ERROR,
    error
  };
}
