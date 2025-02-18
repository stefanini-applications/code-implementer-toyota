/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  listRegulationsAdmin,
  createRegulationRecord,
  deleteRegulations,
  postLinkedLegislations,
  listLinkedlegislations,
  deleteLinkedLegislations
} from '../../../services/api';
import {
  actionsTypes,
  getLinkedLegislationsPaginationInfo,
  getLinkedLegislationsSuccess,
  getLinkedLegislationsFailure,
  createLinkedLegislationsSuccess,
  createLinkedLegislationsFailure,
  deleteLinkedLegislationsSuccess,
  deleteLinkedLegislationsFailure,
  getLinkedLegislationsRequest
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findLinkedLegislations({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.LIST_LINKED_LEGISLATIONS_REQUEST;
}) {
  try {    
    const { search, pageNumber, pageSize, sortKey, direction, legislationId } = payload;
    
    const response: AxiosResponse<any> = yield call(listLinkedlegislations, {
      search,
      legislationId,
      pageNumber,
      pageSize,
      sortKey,
      direction,
    });
    
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getLinkedLegislationsPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getLinkedLegislationsSuccess(response));
  } catch (error: any) {
    yield put(getLinkedLegislationsFailure());
  }
}

export function* createLinkedLegislations({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.CREATE_LINKED_LEGISLATIONS_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response = yield call(postLinkedLegislations, payload);
    yield put(
      getLinkedLegislationsRequest({
        search: '',
        legislationId: payload[0].originRegulationID,
        pageNumber: 1,
        pageSize: 10,          
        sortKey: 'name',
        direction: 'ASC'
      })
    );
    yield put(createLinkedLegislationsSuccess(response));

  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createLinkedLegislationsFailure());
    }
  }
}


export function* removeLinkedLegislations({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.DELETE_LINKED_LEGISLATIONS_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(deleteLinkedLegislations, payload);
    yield put(
      getLinkedLegislationsRequest({
        search: '',
        legislationId: payload.originRegulationID,
        pageNumber: 1,
        pageSize: 10,          
        sortKey: 'name',
        direction: 'ASC'
      })
    );
    yield put(deleteLinkedLegislationsSuccess());
  } catch (error: any) {
    yield put(deleteLinkedLegislationsFailure(error));
  }
}

export default function* regulationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_LINKED_LEGISLATIONS_REQUEST,
          findLinkedLegislations
        ),
        yield takeLatest(
          actionsTypes.CREATE_LINKED_LEGISLATIONS_REQUEST,
          createLinkedLegislations
        ),
        yield takeLatest(
          actionsTypes.DELETE_LINKED_LEGISLATIONS_REQUEST,
          removeLinkedLegislations
        )
      ];
    })
  ]);
}
