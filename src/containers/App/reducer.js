import { fromJS } from 'immutable';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: null,
  currentUser: null,
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
    default:
      return state;
  }
}

export default appReducer;
