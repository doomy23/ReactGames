import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  UPDATE_DIMENSIONS,
  UPDATE_USER_NAME,
  UPDATE_USER_NAME_SUCCESS,
  UPDATE_USER_NAME_ERROR,
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

export function updateUserNameSuccess(data) {
  return {
    type: UPDATE_USER_NAME_SUCCESS,
    data
  };
}

export function updateUserNameError(error) {
  return {
    type: UPDATE_USER_NAME_ERROR,
    error
  };
}
