import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import Api from './utils/api';
import Websocket from './utils/websocket';
import WebsocketsEvents from './websockets';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR
} from './containers/App/constants';
import {
  loadUser,
  loadUserSuccess,
  loadUserError
} from './containers/App/actions';

const fetchApi = (url) => Api.get(url);
const postApi = (url, params) => Api.post(url, params);

function* initWebsocketsEvents(uuid) {
  // Create websocket and bind events
  const websocketsEvents = new WebsocketsEvents();
  websocketsEvents.bind(Websocket(uuid));
}

export function* getUserUuid(action) {
  try {
    const response = yield call(postApi, 'user/uuid', {
      userName: get(action, 'userName', null)
    });
    yield put(loadUserSuccess(response.data));
    yield initWebsocketsEvents(get(response.data, 'data.uuid'));
  } catch (e) {
    const error = get(e, 'response.data.error', {code: 500, message: e.message});
    yield put(loadUserError(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOAD_USER, getUserUuid);
}
