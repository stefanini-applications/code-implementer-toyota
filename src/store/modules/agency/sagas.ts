/* eslint-disable no-unused-vars */
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  listAgencyAdmin,
  deleteAgencies,
  createAgency
} from '../../../services/api';
import { getUpdatesPaginationInfo } from '../homePage/actions';
import {
  actionsTypes,
  deleteAgencyFailure,
  deleteAgencySuccess,
  getAgencyFailure,
  getAgencyRequest,
  getAgencySuccess,
  createAgencyFailure,
  createAgencySuccess,
  createAgencyDuplicateFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* listAgencies({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_AGENCY_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response = yield call(listAgencyAdmin, payload);

    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getUpdatesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getAgencySuccess(response.data.message));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getAgencyFailure());
    }
  }
}
export function* deleteSelectedAgencies({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.DELETE_AGENCY_REQUEST;
}) {
  try {
    const response = yield call(deleteAgencies, payload.ids);
    yield put(
      getAgencyRequest({
        search: '',
        type: payload.type,
        pageNumber: 1,
        pageSize: 10,
        onlyActive: false
      })
    );
    yield put(deleteAgencySuccess(response));
  } catch (error: any) {
    yield put(deleteAgencyFailure());
  }
}

export function* newAgency({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.CREATE_AGENCY_REQUEST;
}) {
  try {
    const agency = {
      id: payload.id,
      description: payload.description,
      refLink: payload.refLink,
      type: payload.type,
      jurisdictions: payload.jurisdictions,
      abbreviation: payload.abbreviation,
      active: payload.active
    };
    const response = yield call(createAgency, agency);

    if (response?.data?.message?.duplicate) {
      yield put(createAgencyDuplicateFailure());
    } else {
      yield put(
        getAgencyRequest({
          search: payload.isEdit ? payload.searchText : '',
          type: payload.type,
          pageNumber: payload.isEdit ? payload.pageNumber : 1,
          pageSize: payload.isEdit ? payload.pageSize : 10,
          onlyActive: false
        })
      );
      yield put(createAgencySuccess(response));
    }
  } catch (error: any) {
    yield put(createAgencyFailure());
  }
}

export default function* searchBarSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.GET_AGENCY_REQUEST, listAgencies)];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.DELETE_AGENCY_REQUEST,
          deleteSelectedAgencies
        )
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.CREATE_AGENCY_REQUEST, newAgency)];
    })
  ]);
}
