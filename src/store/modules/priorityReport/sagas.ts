/* eslint-disable no-unused-vars */
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { getPriorityReportData,getPriorityReportFilters } from '../../../services/api';
import {
  actionsTypes,
  getPriorityReportSuccess,
  getPriorityReportFailure,
  getPriorityPaginationInfo,
  getPriorityReportTabsSuccess,
  getPriorityReportTabsFailure
} from './actions';
import { IGetPriorityReportRequest } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getPriorityReportFilterTabs({
  payload
  }: {
  payload: any;
  type: typeof actionsTypes.GET_PRIORITY_REPORT_TABS_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response = yield call(getPriorityReportFilters, payload);
    yield put(getPriorityReportTabsSuccess(response.data.message));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getPriorityReportTabsFailure());
    }
  }
}

export function* getPriorityReport({
  payload
}: {
  payload: IGetPriorityReportRequest;
  type: typeof actionsTypes.GET_PRIORITY_REPORT_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response = yield call(getPriorityReportData, payload);
    const paginationInfo = response?.headers['x-pagination'];

    yield put(getPriorityPaginationInfo(JSON.parse(paginationInfo)));

    yield put(getPriorityReportSuccess(response.data.message));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getPriorityReportFailure());
    }
  }
}

export default function* priorityReportSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_PRIORITY_REPORT_REQUEST,
          getPriorityReport
        ),
        yield takeLatest(
          actionsTypes.GET_PRIORITY_REPORT_TABS_REQUEST,
          getPriorityReportFilterTabs
        )
      ];
    })
  ]);
}
