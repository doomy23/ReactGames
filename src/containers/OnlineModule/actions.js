import {
  LOAD_ONLINE_USERS,
  LOAD_ONLINE_USERS_SUCCESS,
  LOAD_ONLINE_USERS_ERROR
} from './constants';

export function loadOnlineUsers() {
  return {
    type: LOAD_ONLINE_USERS
  };
}

export function loadOnlineUsersSuccess(data) {
  return {
    type: LOAD_ONLINE_USERS_SUCCESS,
    data
  };
}

export function loadOnlineUsersError(error) {
  return {
    type: LOAD_ONLINE_USERS_ERROR,
    error
  };
}
