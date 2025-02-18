/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { getNotifications } from '../../../services/api';
import {
  actionsTypes,
  getNotificationsPaginationInfo,
  getNotificationsFailure,
  getNotificationsSuccess
} from './actions';
import { IGetNotifications } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getAllNotifications({
  payload
}: {
  payload: IGetNotifications;
  type: typeof actionsTypes.GET_NOTIFCATIONS_REQUEST;
}) {
  try {
    const { searchText, pageNumber, pageSize, sortKey, direction  } = payload;
    const response: AxiosResponse<any> = yield call(getNotifications, {
      searchText,
      pageNumber,
      pageSize,
      sortKey,
      direction
    });
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getNotificationsPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getNotificationsSuccess(response));
  } catch (error: any) {
    yield put(getNotificationsFailure());
  }
}

export default function* notificationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_NOTIFCATIONS_REQUEST,
          getAllNotifications
        )
      ];
    })
  ]);
}
