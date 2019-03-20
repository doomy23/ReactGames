import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR } from './constants';
import Api from '../../utils/api';

export function loadUser() {
  Api.get('user/uuid').then((response) => {
    console.log(response);

  }).catch((error) => {
    console.error('Cannot get user id', error);
  });

  return {
    type: LOAD_USER
  };
}

export function userLoaded(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user
  };
}

export function userLoadingError(error) {
  return {
    type: LOAD_USER_ERROR,
    error
  };
}
