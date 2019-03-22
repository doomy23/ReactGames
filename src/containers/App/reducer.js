import { fromJS } from 'immutable';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS, 
  LOAD_USER_ERROR,
  UPDATE_DIMENSIONS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: null,
  currentUser: null,
  contentHeight: window.innerHeight,
  contentWidth: window.innerWidth,
  userData: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('loading', true)
        .set('error', null);
    case LOAD_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.user.name)
        .set('userData', action.user);
    case LOAD_USER_ERROR:
      return state
        .set('loading', true)
        .set('error', action.error);
    case UPDATE_DIMENSIONS:
      return state
        .set('contentHeight', window.innerHeight)
        .set('contentWidth', window.innerWidth);
    default:
      return state;
  }
}

export default appReducer;
