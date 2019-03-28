import {
  call,
  put,
  all,
  takeLatest
} from 'redux-saga/effects';
import { get } from 'lodash';

import Api from './utils/api';
import Websocket from './utils/websocket';
import { PromiseWithTimeout } from './utils/promise';
import apiCalls from './utils/apiCalls';

// TODO: Extract logic by containers with dependency injection

/* Captured actions constants */
import {
  LOAD_USER,
  UPDATE_USER_NAME
} from './containers/App/constants';
import {
  LOAD_ONLINE_USERS
} from './containers/OnlineModule/constants';

/* Sent actions */
import {
  loadUserSuccess,
  loadUserError,
  updateUserNameSuccess,
  updateUserNameError
} from './containers/App/actions';
import {
  loadOnlineUsersSuccess,
  loadOnlineUsersError
} from './containers/OnlineModule/actions';

/* APIs calls */
const fetchApi = (url) => Api.get(url);
const postApi = (url, params) => Api.post(url, params);

// TODO: Config?
const defaultWebsocketTimeout = 10000;

const websocketEmitPromise = (name, message) => {
  return PromiseWithTimeout(defaultWebsocketTimeout,
    (resolve, reject) => {
      const ws = Websocket.getInstance();
      console.log(ws.connected, ws, name, message);
      if(ws.connected) {
        ws.emit(name, message);
        ws.once(name, response => {
          resolve(response);
        });

      } else {
        reject("Cannot connect to the websocket API");
      }
  });
}

function* initWebsocketsEvents(uuid) {
  // Create websocket with uuid
  return yield Websocket.setup(uuid);
}

export function* loadUserSaga(action) {
  try {
    const response = yield call(postApi, apiCalls.LOAD_USER_CALL, {
      userName: get(action, 'userName', null)
    });
    yield initWebsocketsEvents(get(response.data, 'data.uuid'));
    yield put(loadUserSuccess(response.data.data));

  } catch (e) {
    console.log(e);
    // Data error || Axios error
    const error = get(e, 'response.data.error', {
      code: get(e, 'response.status', 500),
      message: e.message
    });
    yield put(loadUserError(error));
  }
}

export function* updateUserNameSaga(action) {
  try {
    const userName = get(action, 'userName', null);
    const response = yield call(websocketEmitPromise, apiCalls.UPDATE_USER_NAME_CALL, userName);

    if(response.error)
      yield put(updateUserNameError(response.error));
    else if(response.data)
      yield put(updateUserNameSuccess(response.data));

  } catch (e) {
    console.log(e);
    // Timeout error
    const error = {code: 408, message: e.message};
    yield put(updateUserNameError(error));
  }
}

export function* loadOnlineUsersSaga() {
  try {
    const response = yield call(websocketEmitPromise, apiCalls.LOAD_ONLINE_USERS_CALL);

    if(response.error)
      yield put(loadOnlineUsersError(response.error));
    else if(response.data)
      yield put(loadOnlineUsersSuccess(response.data));

  } catch (e) {
    console.log(e);
    // Timeout error
    const error = {code: 408, message: e.message};
    yield put(loadOnlineUsersError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOAD_USER, loadUserSaga),
    takeLatest(UPDATE_USER_NAME, updateUserNameSaga),
    takeLatest(LOAD_ONLINE_USERS, loadOnlineUsersSaga)
  ]);
}
