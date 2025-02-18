/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  getSubstanceUses,
  deleteSubstanceUses,
  searchSubstanceUses,
  createEditSubstanceUses
} from '../../../services/api';
import {
  actionsTypes,
  getSubstancesUsesSuccess,
  getSubstancesUsesFailure,
  deleteSubstancesUsesSuccess,
  deleteSubstancesUsesFailure,
  getSearchSubstancesUsesSuccess,
  getSearchSubstancesUsesFailure,
  createSubstanceUsesSuccess,
  createSubstanceUsesFailure,
  editSubstanceUsesSuccess,
  editSubstanceUsesFailure,
  getSearchSubstancesUsesRequest,
  getSubstanceUsesPaginationInfo
} from './actions';
import {
  IGetSubstanceUsesSearch,
  INewSubstanceUses,
  IEditSubstanceUses
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findAllSubstanceUses() {
  try {
    const response: AxiosResponse<any> = yield call(getSubstanceUses);
    yield put(getSubstancesUsesSuccess(response));
  } catch (error: any) {
    yield put(getSubstancesUsesFailure());
  }
}

export function* deleteSelectedSubstanceUses({
  payload
}: {
  payload: Array<any>;
  type: typeof actionsTypes.DELETE_SUB_USES_REQUEST;
}) {
  try {
    yield call(deleteSubstanceUses, payload);
    yield put(
      getSearchSubstancesUsesRequest({
        searchText: '',
        pageNumber: 1,
        pageSize: 10
      })
    );
    yield put(deleteSubstancesUsesSuccess());
  } catch (error: any) {
    yield put(deleteSubstancesUsesFailure());
  }
}

export function* searchAllSubstanceUses({
  payload
}: {
  payload: IGetSubstanceUsesSearch;
  type: typeof actionsTypes.LIST_SEARCH_USES_REQUEST;
}) {
  try {
    const { searchText, pageNumber, pageSize, direction } = payload;
    const response: AxiosResponse<any> = yield call(searchSubstanceUses, {
      searchText,
      pageNumber,
      pageSize,
      direction: direction ?? 'ASC'
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getSubstanceUsesPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getSearchSubstancesUsesSuccess(response));
  } catch (error: any) {
    yield put(getSearchSubstancesUsesFailure());
  }
}

export function* newSubstanceUses({
  payload
}: {
  payload: INewSubstanceUses;
  type: typeof actionsTypes.CREATE_SUBSTANCE_USES_REQUEST;
}) {
  try {
    yield call(createEditSubstanceUses, payload);
    yield put(
      getSearchSubstancesUsesRequest({
        searchText: '',
        pageNumber: 1,
        pageSize: 10
      })
    );
    yield put(createSubstanceUsesSuccess());
  } catch (error: any) {
    yield put(createSubstanceUsesFailure());
  }
}

export function* editSubstanceUses({
  payload
}: {
  payload: IEditSubstanceUses;
  type: typeof actionsTypes.CREATE_SUBSTANCE_USES_REQUEST;
}) {
  try {
    const subUse = {
      id: payload.id,
      active: payload.active,
      description: payload.description
    };
    yield call(createEditSubstanceUses, subUse);
    yield put(
      getSearchSubstancesUsesRequest({
        searchText: payload.searchText,
        pageNumber: payload.pageNumber,
        pageSize: payload.pageSize
      })
    );
    yield put(editSubstanceUsesSuccess());
  } catch (error: any) {
    yield put(editSubstanceUsesFailure());
  }
}

export default function* substanceUsesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.LIST_USES_REQUEST, findAllSubstanceUses),
        yield takeLatest(
          actionsTypes.DELETE_SUB_USES_REQUEST,
          deleteSelectedSubstanceUses
        ),
        yield takeLatest(
          actionsTypes.LIST_SEARCH_USES_REQUEST,
          searchAllSubstanceUses
        ),
        yield takeLatest(
          actionsTypes.CREATE_SUBSTANCE_USES_REQUEST,
          newSubstanceUses
        ),
        yield takeLatest(
          actionsTypes.EDIT_SUBSTANCE_USES_REQUEST,
          editSubstanceUses
        )
      ];
    })
  ]);
}
