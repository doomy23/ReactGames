import { fromJS } from 'immutable';
import {
  LOAD_ONLINE_USERS,
  LOAD_ONLINE_USERS_SUCCESS,
  LOAD_ONLINE_USERS_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  loaded: false,
  error: null,
  // Other users
  users: []
});

function onlineReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ONLINE_USERS:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', null);
    case LOAD_ONLINE_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('users', action.data.users);
    case LOAD_ONLINE_USERS_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default onlineReducer;
