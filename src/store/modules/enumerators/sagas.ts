/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listJurisdictions, listAgency } from '../../../services/api';
import {
  actionsTypes,
  getJurisdictionsSuccess,
  getJurisdictionsFailure,
  getAgencySuccess,
  getAgencyFailure
} from './actions';
import { IGetAgencyList } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findJurisdictions() {
  try {
    const response: AxiosResponse<any> = yield call(listJurisdictions);
    yield put(getJurisdictionsSuccess(response));
  } catch (error: any) {
    yield put(getJurisdictionsFailure());
  }
}

export function* findAgency({
  payload
}: {
  payload: IGetAgencyList;
  type: typeof actionsTypes.LIST_AGENCY_REQUEST;
}) {
  try {
    const { type, onlyActive } = payload;
    const response: AxiosResponse<any> = yield call(listAgency, {
      type,
      onlyActive
    });
    yield put(getAgencySuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getAgencyFailure());
    }
  }
}

export default function* enumeratorsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_JURISDICTIONS_REQUEST,
          findJurisdictions
        ),
        yield takeLatest(actionsTypes.LIST_AGENCY_REQUEST, findAgency)
      ];
    })
  ]);
}
