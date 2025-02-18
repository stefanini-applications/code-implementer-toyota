/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  groupSubstances
} from '../../../services/api';
import {
  getRelatedSubstanceRequest,
  getUpdatesRelatedSubstanceRequest
} from '../dropdownValues/actions';
import { getListingsRequest } from '../listings/actions';
import { getRegulatoryUpdatesRecordsRequest } from '../regulatoryUpdates/actions';
import {
  actionsTypes,
  getGroupSubstancesSuccess,
  getGroupSubstancesFailure,
  getGroupSubstancesPaginationInfo,
  getGroupSubstancesRequest,
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findGroupSubstances({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.LIST_GROUP_SUBSTANCES_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(groupSubstances, payload);
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getGroupSubstancesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getGroupSubstancesSuccess(response));
  } catch (error: any) {
    yield put(getGroupSubstancesFailure());
  }
}

export default function* groupSubstancesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_GROUP_SUBSTANCES_REQUEST,
          findGroupSubstances
        )
      ];
    })
  ]);
}
