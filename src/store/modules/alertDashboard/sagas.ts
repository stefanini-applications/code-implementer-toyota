/* eslint-disable no-unused-vars */
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listAlertDashboard, actInAlertDashboard } from '../../../services/api';
import { getUpdatesPaginationInfo } from '../homePage/actions';
import {
  actionsTypes,
  getAlertDashboardFailure,
  getAlertDashboardRequest,
  getAlertDashboardSuccess,
  getAlertDashboardPaginationInfo,
  actInAlertDashboardFailure,
  actInAlertDashboardSuccess,
  actInAlertDashboardDuplicateFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* listAlertDashboards({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_ALERT_DASHBOARD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      type,
      dataRangeStart,
      dataRangeEnd,
      search,
      jurisdictions,
      regions,
      pageNumber,
      pageSize,
      sortKey,
      direction
    } = payload;
    const response = yield call(listAlertDashboard, {
      type,
      dataRangeStart,
      dataRangeEnd,
      search,
      jurisdictions,
      regions,
      pageNumber,
      pageSize,
      sortKey,
      direction
    });
    yield put(getAlertDashboardSuccess(response.data.message));
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getAlertDashboardPaginationInfo(JSON.parse(paginationInfo)));
  } catch (error: any) {
    if (error.response?.status !== 401) {
      yield put(getAlertDashboardFailure());
    }
  }
}

export function* newAlertDashboard({
  payload,
  changelog
}: {
  payload: any;
  changelog: any;
  type: typeof actionsTypes.CREATE_ALERT_DASHBOARD_REQUEST;
}) {
  try {
    const alertDashboard = {
      id: payload.id,
      type: payload.type,
      action: payload.action
    };
    const response = yield call(actInAlertDashboard, alertDashboard);
    if (response?.data?.message?.duplicate) {
      yield put(actInAlertDashboardDuplicateFailure());
    } else {
      yield put(getAlertDashboardRequest(changelog))
      yield put(actInAlertDashboardSuccess(response, payload.action));
    }
  } catch (error: any) {
    yield put(actInAlertDashboardFailure());
  }
}

export default function* alertDashboardSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_ALERT_DASHBOARD_REQUEST,
          listAlertDashboards
        )
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.CREATE_ALERT_DASHBOARD_REQUEST,
          newAlertDashboard
        )
      ];
    })
  ]);
}
