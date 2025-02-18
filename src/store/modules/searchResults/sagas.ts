/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listSearchResults } from '../../../services/api';
import {
  actionsTypes,
  getSearchResultsSuccess,
  getSearchResultsFailure,
  getSearchResultsPaginationInfo,
  getSearchKeyDownResultsSuccess,
  getSearchKeyDownResultsFailure,
  getSearchKeyDownResultsPaginationInfo
} from './actions';
import { IGetSearchResults, SearchKeys } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findSearchResults({
  payload
}: {
  payload: IGetSearchResults;
  type: typeof actionsTypes.LIST_SEARCH_RESULTS_REQUEST;
}) {
  try {
    const { type, searchText, pageNumber, pageSize } = payload;
    const response: AxiosResponse<any> = yield call(listSearchResults, {
      type,
      searchText,
      pageNumber,
      pageSize
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getSearchResultsPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getSearchResultsSuccess(response));
  } catch (error: any) {
    yield put(getSearchResultsFailure());
  }
}

export function* findSearchKeyDownResults({
  payload
}: {
  payload: IGetSearchResults;
  type: typeof actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_REQUEST;
}) {
  try {
    const { type, searchText, pageNumber, pageSize, loading } = payload;
    const response: AxiosResponse<any> = yield call(listSearchResults, {
      type,
      searchText,
      pageNumber,
      pageSize,
      loading
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(
      getSearchKeyDownResultsPaginationInfo(JSON.parse(paginationInfo))
    );
    yield put(getSearchKeyDownResultsSuccess(response));
  } catch (error: any) {
    yield put(getSearchKeyDownResultsFailure());
  }
}

export default function* searchResultsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_SEARCH_RESULTS_REQUEST,
          findSearchResults
        ),
        yield takeLatest(
          actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_REQUEST,
          findSearchKeyDownResults
        )
      ];
    })
  ]);
}
