/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { getRoles } from '../../../services/api';
import { actionsTypes, getRolesSuccess, getRolesFailure } from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getAllRoles() {
  try {
    const response: AxiosResponse<any> = yield call(getRoles);
    yield put(getRolesSuccess(response));
  } catch (error: any) {
    yield put(getRolesFailure());
  }
}

export default function* rolesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.GET_ROLES_REQUEST, getAllRoles)];
    })
  ]);
}
