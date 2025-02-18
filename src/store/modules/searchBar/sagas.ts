/* eslint-disable no-unused-vars */
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { listSearchBarResults } from '../../../services/api';
import {
  actionsTypes,
  getSearchBarResultsSuccess,
  getSearchBarResultsFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findSearchBarResults({
  searchText
}: {
  searchText: string;
  type: typeof actionsTypes.LIST_SEARCH_BAR_RESULTS_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const { data } = yield call(listSearchBarResults, searchText);
    yield put(getSearchBarResultsSuccess(data.message));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getSearchBarResultsFailure());
    }
  }
}

export default function* searchBarSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_SEARCH_BAR_RESULTS_REQUEST,
          findSearchBarResults
        )
      ];
    })
  ]);
}
