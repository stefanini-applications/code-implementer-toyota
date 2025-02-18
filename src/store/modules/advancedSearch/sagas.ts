/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listFilteredRecordsAdvancedSearch } from '../../../services/api';
import {
  actionsTypes,
  getFilteredRecordsAdSearchSuccess,
  getFilteredRecordsAdSearchFailure,
  getAdvancedSearchResultsPaginationInfo
} from './actions';
import { IGetFilteredRecordsAdSearch } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findFilteredRecordsAdvancedSearch({
  payload
}: {
  payload: IGetFilteredRecordsAdSearch;
  type: typeof actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_REQUEST;
}) {
  try {
    const {
      type,
      text,
      pageSize,
      pageNumber,
      hasAttachment,
      jurisdiction,
      agency,
      agencyType,
      subUses,
      notSearch,
      startDate,
      endDate,
      status
    } = payload;

    const response: AxiosResponse<any> = yield call(
      listFilteredRecordsAdvancedSearch,
      {
        type,
        text,
        pageSize,
        pageNumber,
        hasAttachment,
        jurisdiction,
        agency,
        agencyType,
        subUses,
        notSearch,
        startDate,
        endDate,
        status
      }
    );
    const paginationInfo = response?.headers['x-pagination'];
    yield put(
      getAdvancedSearchResultsPaginationInfo(JSON.parse(paginationInfo))
    );
    yield put(getFilteredRecordsAdSearchSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getFilteredRecordsAdSearchFailure());
    }
  }
}

export default function* advancedSearchSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_REQUEST,
          findFilteredRecordsAdvancedSearch
        )
      ];
    })
  ]);
}
