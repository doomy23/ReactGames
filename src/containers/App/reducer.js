import { fromJS } from 'immutable';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  UPDATE_DIMENSIONS,
  UPDATE_USER_NAME_SUCCESS,
  UPDATE_USER_NAME_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  loaded: false,
  error: null,
  // Screen dimensions
  contentHeight: window.innerHeight,
  contentWidth: window.innerWidth,
  // Current user
  user: {}
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
        .set('user', action.data);
    case LOAD_USER_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    case UPDATE_USER_NAME_SUCCESS:
      return state
        .set('user', {
          ...state.get('user'),
          name: action.data.name});
    case UPDATE_USER_NAME_ERROR:
      return state
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
