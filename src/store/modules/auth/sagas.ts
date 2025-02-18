/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { signIn } from '../../../services/api';
import { actionsTypes, signInSuccess, signInFailure } from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* signInRequest() {
  try {
    const response: AxiosResponse<any> = yield call(signIn);
    yield put(signInSuccess(response));
  } catch (error: any) {
    if (error?.response?.status === 400) {
      yield put(signInFailure());
    }
  }
}

export default function* authSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.SIGN_IN_REQUEST, signInRequest)];
    })
  ]);
}
