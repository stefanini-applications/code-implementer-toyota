/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  getHomePageUpdatesRegulation,
  getHomePageUpdatesSubstance,
  getRecentlyView
} from '../../../services/api';
import {
  actionsTypes,
  getPriorityRankPaginationInfo,
  getUpdatesPaginationInfo,
  recentlyViewFailure,
  recentlyViewSuccess,
  updatesRegulationFailure,
  updatesRegulationSuccess,
  updatesSubstanceFailure,
  updatesSubstanceSuccess
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getUpdatesSubstanceRequest({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.UPDATES_SUBSTANCE_REQUEST;
}) {
  try {
    const { regions, startDate, endDate, pageNumber } = payload;
    const response: AxiosResponse<any> = yield call(
      getHomePageUpdatesSubstance,
      regions,
      startDate,
      endDate,
      pageNumber
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getUpdatesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(updatesSubstanceSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(updatesSubstanceFailure());
    }
  }
}

export function* getUpdatesRegulationRequest({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.UPDATES_REGULATION_REQUEST;
}) {
  try {
    const { regions, startDate, endDate, pageNumber, recordType } = payload;
    const response: AxiosResponse<any> = yield call(
      getHomePageUpdatesRegulation,
      regions,
      startDate,
      endDate,
      pageNumber,
      recordType
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getUpdatesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(updatesRegulationSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(updatesRegulationFailure());
    }
  }
}


export function* getRecentlyViewRequest({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.RECENTLY_VIEW_REQUEST;
}) {
  try {
    const { everyone, recordType } = payload;
    const response: AxiosResponse<any> = yield call(
      getRecentlyView,
      everyone,
      recordType
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getUpdatesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(recentlyViewSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(recentlyViewFailure());
    }
  }
}

export default function* homePageSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.UPDATES_REGULATION_REQUEST,
          getUpdatesRegulationRequest
        ),
        yield takeLatest(
          actionsTypes.UPDATES_SUBSTANCE_REQUEST,
          getUpdatesSubstanceRequest
        ),
        yield takeLatest(
          actionsTypes.RECENTLY_VIEW_REQUEST,
          getRecentlyViewRequest
        ),
      ];
    })
  ]);
}
