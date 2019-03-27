import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import Api from './utils/api';
import Websocket from './utils/websocket';

import {
  LOAD_USER,
  UPDATE_USER_NAME
} from './containers/App/constants';
import {
  loadUserSuccess,
  loadUserError,
  updateUserNameSuccess,
  updateUserNameError
} from './containers/App/actions';

const fetchApi = (url) => Api.get(url);
const postApi = (url, params) => Api.post(url, params);

const websocketEmit = (name, message) => {
  return new Promise((resolve, reject) => {
    Websocket().emit(name, message);
    Websocket().once(name, response => {
      resolve(response);
    });
  });
}

function* initWebsocketsEvents(uuid) {
  // Create websocket with uuid
  Websocket(uuid);
}

export function* loadUserSaga(action) {
  try {
    const response = yield call(postApi, 'user/load', {
      userName: get(action, 'userName', null)
    });
    yield put(loadUserSuccess(response.data.data));
    yield initWebsocketsEvents(get(response.data, 'data.uuid'));
  } catch (e) {
    const error = get(e, 'response.data.error', {code: 500, message: e.message});
    yield put(loadUserError(error));
  }
}

export function* updateUserNameSaga(action) {
  const userName = get(action, 'userName', null);
  const response = yield call(websocketEmit, 'user/update/name', userName);

  if(response.error)
    yield put(updateUserNameSuccess(response.error));
  else if(response.data)
    yield put(updateUserNameSuccess(response.data));
}

export default function* rootSaga() {
  yield takeLatest(LOAD_USER, loadUserSaga);
  yield takeLatest(UPDATE_USER_NAME, updateUserNameSaga);
}
