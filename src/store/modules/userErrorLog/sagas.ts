/* eslint-disable no-unused-vars */
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  createUserErrorLog
} from '../../../services/api';
import {
  actionsTypes
} from './actions';
import { ICreateUserErrorLog } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* newUserErrorLog({
  payload
}: {
  payload: ICreateUserErrorLog;
  type: typeof actionsTypes.CREATE_USER_ERROR_LOG_REQUEST;
}) {
  try {
    yield call(createUserErrorLog, payload);
  } catch (error: any) {
    console.error(error);
  }
}

export default function* substanceUsesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.CREATE_USER_ERROR_LOG_REQUEST, newUserErrorLog)
      ];
    })
  ]);
}
