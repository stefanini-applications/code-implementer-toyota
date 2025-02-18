/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listToyotaRegions } from '../../../services/api';
import {
  actionsTypes,
  getToyotaRegionsSuccess,
  getToyotaRegionsFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findToyotaRegions() {
  try {
    const response: AxiosResponse<any> = yield call(listToyotaRegions);
    yield put(getToyotaRegionsSuccess(response));
  } catch (error: any) {
    yield put(getToyotaRegionsFailure());
  }
}

export default function* regulationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_ALL_TOYOTA_REGIONS_REQUEST,
          findToyotaRegions
        )
      ];
    })
  ]);
}
