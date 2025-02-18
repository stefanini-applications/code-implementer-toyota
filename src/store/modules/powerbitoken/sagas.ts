/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { getEmbedToken, getHomePageHeatMapToken } from '../../../services/api';
import {
  actionsTypes, getPowerBiTokenFailure, getPowerBiTokenSuccess, getHeatMapTokenSuccess, getHeatMapTokenFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getPowerBiToken() {
  try {
    const response: AxiosResponse<any> = yield call(getEmbedToken);
    yield put(getPowerBiTokenSuccess(response));
  } catch (error: any) {
    yield put(getPowerBiTokenFailure());
  }
}

export function* getHeatMapToken() {
  try {
    const response: AxiosResponse<any> = yield call(getHomePageHeatMapToken);
    yield put(getHeatMapTokenSuccess(response));
  } catch (error: any) {
    yield put(getHeatMapTokenFailure());
  }
}

export default function* notificationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.POWER_BI_TOKEN_REQUEST,
          getPowerBiToken
        ),
        yield takeLatest(
          actionsTypes.HEATMAP_TOKEN_REQUEST,
          getHeatMapToken
        )
      ];
    })
  ]);
}
