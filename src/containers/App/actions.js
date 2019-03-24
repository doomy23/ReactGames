import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  UPDATE_DIMENSIONS,
  UPDATE_USER_NAME
} from './constants';

export function loadUser(userName) {
  return {
    type: LOAD_USER,
    userName
  };
}

export function loadUserSuccess(data) {
  return {
    type: LOAD_USER_SUCCESS,
    data
  };
}

export function loadUserError(error) {
  return {
    type: LOAD_USER_ERROR,
    error
  };
}

export function updateDimensions() {
  return {
    type: UPDATE_DIMENSIONS
  };
}

export function updateUserName(userName) {
  return {
    type: UPDATE_USER_NAME,
    userName
  };
}
