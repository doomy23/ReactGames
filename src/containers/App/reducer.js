import { fromJS } from 'immutable';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('userData', {});
    case LOAD_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.user.name)
        .set('userData', action.user);
    case LOAD_USER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
