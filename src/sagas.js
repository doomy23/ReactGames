import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import Api from './utils/api';
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

export function* getUserUuid(action) {
  try {
    const response = yield call(postApi, 'user/uuid', {
      userName: get(action, 'userName', null)
    });
    yield put(loadUserSuccess(response.data));
  } catch (e) {
    let error = get(e, 'response.data.error', e.message);
    yield put(loadUserError(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOAD_USER, getUserUuid);
}
