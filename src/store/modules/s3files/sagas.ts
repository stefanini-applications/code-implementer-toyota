/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { downloadFileS3 } from '../../../services/api';
import { actionsTypes, getS3FileSuccess, getS3FileFailure } from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getS3File({
  url
}: {
  url: any;
  type: typeof actionsTypes.GET_S3_FILE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(downloadFileS3, url);
    yield put(getS3FileSuccess(response));
  } catch (error: any) {
    yield put(getS3FileFailure());
  }
}

export default function* rolesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.GET_S3_FILE_REQUEST, getS3File)];
    })
  ]);
}
