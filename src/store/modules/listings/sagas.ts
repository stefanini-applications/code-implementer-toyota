/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  deleteListingData,
  deleteRelatedSubstance,
  deleteRegulationGroup,
  editListingData,
  getListingsData,
  getListingsSubstanceData,
  updateList,
  searchLists
} from '../../../services/api';
import { getUpdatesRelatedSubstanceRequest } from '../dropdownValues/actions';
import {
  actionsTypes,
  editListingsFailure,
  editListingsSuccess,
  getListingsFailure,
  getListingsRequest,
  getListingsPaginationInfo,
  getListingsSubstanceFailure,
  getListingsSubstanceSuccess,
  getListingsSuccess,
  editListingsUploadFailure,
  updateListsSuccess,
  updateListsFailure,
  getListsPaginationInfo,
  getSearchListsSuccess,
  getSearchListsFailure,
  getSearchListsRequest,
  deleteGroupSuccess,
  deleteGroupFailure
} from './actions';
import { IDeleteListings, IEditLists, IGetListsSearch, IDeleteGroup } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getListings({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_LISTINGS_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(getListingsData, payload);
    if (payload?.paged) {
      const paginationInfo = response?.headers['x-pagination'];
      yield put(getListingsPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getListingsSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getListingsFailure());
    }
  }
}
export function* editListings({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.EDIT_LISTINGS_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(editListingData, payload);
    if (payload.type === 'rs') {
      yield put(getUpdatesRelatedSubstanceRequest(payload.reference));
    }
    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        reference: payload.reference,
        type: payload.type,
        search: '',
        toyotaRegion: payload.toyotaRegion
      })
    );
    if (payload?.upload && response?.data && response?.data?.message) {
      yield put(editListingsUploadFailure(response));
    } else {
      yield put(editListingsSuccess(response));
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editListingsFailure());
    }
  }
}

export function* deleteListings({
  payload
}: {
  payload: IDeleteListings;
  type: typeof actionsTypes.DELETE_LISTINGS_REQUEST;
}) {
  try {
    const { type, reference, substance, listId, toyotaRegion } = payload;
    let response: AxiosResponse<any>;
    if (type === 'rs') {
      response = yield call(deleteRelatedSubstance, {
        regulation: reference,
        substance,
        type: ''
      });
      yield put(getUpdatesRelatedSubstanceRequest(reference));
    } else {
      response = yield call(deleteListingData, type, reference, false);
    }

    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 0,
        paged: false,
        reference: listId,
        type,
        toyotaRegion
      })
    );
    yield put(editListingsSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editListingsFailure());
    }
  }
}

export function* getListingsSubstance({
  substanceId
}: {
  substanceId: number;
  type: typeof actionsTypes.GET_LISTINGS_SUBSTANCE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getListingsSubstanceData,
      substanceId
    );
    yield put(getListingsSubstanceSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getListingsSubstanceFailure());
    }
  }
}

export function* updateLists({
  payload
}: {
  payload: IEditLists;
  type: typeof actionsTypes.UPDATE_LISTS_REQUEST;
}) {
  try {
    const { list, allInsert, searchText, pageNumber, pageSize } = payload;
    const response: AxiosResponse<any> = yield call(
      updateList, { list, allInsert }
    );
    if (allInsert) {
      // do nothing
    } else {
      yield put(updateListsSuccess(response));
    }
    yield put(
      getSearchListsRequest({
        searchText: '',
        pageNumber: 1,
        pageSize: 10,
        noLoading: allInsert,
        sortKey:'',
        direction:''
      })
    );
  } catch (error: any) {
    if (error.response.status !== 401 && !payload.allInsert) {
      yield put(updateListsFailure());
    }
  }
}

export function* searchAllLists({
  payload
}: {
  payload: IGetListsSearch;
  type: typeof actionsTypes.LISTS_SEARCH_REQUEST;
}) {
  try {
    const { searchText, pageNumber, pageSize, noLoading, sortKey, direction } = payload;
    const response: AxiosResponse<any> = yield call(searchLists, {
      searchText,
      pageNumber,
      pageSize,
      noLoading,
      sortKey,
      direction,
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getListsPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getSearchListsSuccess(response));
  } catch (error: any) {
    yield put(getSearchListsFailure());
  }
}

export function* deleteRegulationGroupFunc({
  payload
}: {
  payload: IDeleteGroup;
  type: typeof actionsTypes.DELETE_GROUP_REQUEST;
}) {
  try {
    yield call(deleteRegulationGroup, payload.ids);
    yield put(deleteGroupSuccess());
    payload.listingsRequest.toyotaRegion= 1
    yield put(
      getListingsRequest(payload.listingsRequest)
    );
  } catch (error: any) {
    yield put(deleteGroupFailure());
  }
}

export default function* substanceAttachmentsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [yield takeLatest(actionsTypes.GET_LISTINGS_REQUEST, getListings)];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.EDIT_LISTINGS_REQUEST, editListings)
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.DELETE_LISTINGS_REQUEST, deleteListings)
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_LISTINGS_SUBSTANCE_REQUEST,
          getListingsSubstance
        )
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.UPDATE_LISTS_REQUEST, updateLists)
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.LISTS_SEARCH_REQUEST, searchAllLists)
      ];
    }),
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.DELETE_GROUP_REQUEST, deleteRegulationGroupFunc)
      ];
    })
  ]);
}
