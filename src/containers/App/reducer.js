import { fromJS } from 'immutable';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  UPDATE_USER_NAME,
  UPDATE_DIMENSIONS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  loaded: false,
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
        .set('loaded', false)
        .set('error', null);
    case LOAD_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('currentUser', action.data.name)
        .set('userData', action.data);
    case LOAD_USER_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    case UPDATE_USER_NAME:
      return state
        .set('currentUser', action.userName);
    case UPDATE_DIMENSIONS:
      return state
        .set('contentHeight', window.innerHeight)
        .set('contentWidth', window.innerWidth);
    default:
      return state;
  }
}

export default appReducer;
