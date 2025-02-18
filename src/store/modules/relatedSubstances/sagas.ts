/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  listRelatedSubstance,
  createRelatedSubstance,
  deleteRelatedSubstance,
  editRelatedSubstance
} from '../../../services/api';
import {
  getRelatedSubstanceRequest,
  getUpdatesRelatedSubstanceRequest
} from '../dropdownValues/actions';
import { getListingsRequest } from '../listings/actions';
import { getRegulatoryUpdatesRecordsRequest } from '../regulatoryUpdates/actions';
import {
  actionsTypes,
  getRelatedSubstancesSuccess,
  getRelatedSubstancesFailure,
  getRelatedSubstancesPaginationInfo,
  createRelatedSubstancesSuccess,
  createRelatedSubstancesFailure,
  getRelatedSubstancesRequest,
  deleteRelatedSubstancesFailure,
  deleteRelatedSubstancesSuccess
} from './actions';
import {
  IGetRelatedSubstances,
  ICreateRelatedSubstance,
  IDeleteRelatedSubstance
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findRelatedSubstances({
  payload
}: {
  payload: IGetRelatedSubstances;
  type: typeof actionsTypes.LIST_RELATED_SUBSTANCES_REQUEST;
}) {
  try {
    const { recordId } = payload;
    const response: AxiosResponse<any> = yield call(listRelatedSubstance, {
      recordId
    });
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getRelatedSubstancesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getRelatedSubstancesSuccess(response));
  } catch (error: any) {
    yield put(getRelatedSubstancesFailure());
  }
}

export function* createRelatedSubstances({
  payload
}: {
  payload: ICreateRelatedSubstance;
  type: typeof actionsTypes.CREATE_RELATED_SUBSTANCES_REQUEST;
}) {
  try {
    const { regulation, relatedSubstances } = payload;
    const response: AxiosResponse<any> = yield call(createRelatedSubstance, {
      regulation,
      relatedSubstances
    });
    yield put(
      getRelatedSubstancesRequest({
        pageNumber: 1,
        pageSize: 0,
        recordId: regulation
      })
    );
    yield put(getUpdatesRelatedSubstanceRequest(regulation));
    yield put(getRelatedSubstanceRequest(regulation));
    yield put(createRelatedSubstancesSuccess(response));
  } catch (error: any) {
    yield put(createRelatedSubstancesFailure());
  }
}

export function* editRelatedSubstances({
  payload
}: {
  payload: ICreateRelatedSubstance;
  type: typeof actionsTypes.EDIT_RELATED_SUBSTANCE_REQUEST;
}) {
  try {
    const { regulation, relatedSubstances } = payload;
    const response: AxiosResponse<any> = yield call(createRelatedSubstance, {
      regulation,
      relatedSubstances
    });
    const toyotaRegion = localStorage.getItem('user.toyotaRegion')
    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        reference: regulation,
        type: 'rs',
        search: '',
        toyotaRegion
      })
    );
    yield put(createRelatedSubstancesSuccess(response));
  } catch (error: any) {
    yield put(createRelatedSubstancesFailure());
  }
}

export function* deleteRelatedSubstances({
  payload
}: {
  payload: IDeleteRelatedSubstance;
  type: typeof actionsTypes.DELETE_RELATED_SUBSTANCES_REQUEST;
}) {
  try {
    const { regulation, substance, type, listing, group, toyotaRegion, search } = payload;
    const response: AxiosResponse<any> = yield call(deleteRelatedSubstance, {
      regulation,
      substance,
      type,
      group
    });
    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        reference: regulation,
        type: 'rs',
        search,
        noLoading: true,
        toyotaRegion
      })
    );
    if (!listing) {
      yield put(
        getRegulatoryUpdatesRecordsRequest({
          search: '',
          pageNumber: 1,
          regulationLegislationId: regulation
        })
      );
    }
    yield put(deleteRelatedSubstancesSuccess(response));
  } catch (error: any) {
    yield put(deleteRelatedSubstancesFailure(error));
  }
}

export default function* relatedSubstancesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_RELATED_SUBSTANCES_REQUEST,
          findRelatedSubstances
        ),
        yield takeLatest(
          actionsTypes.CREATE_RELATED_SUBSTANCES_REQUEST,
          createRelatedSubstances
        ),
        yield takeLatest(
          actionsTypes.DELETE_RELATED_SUBSTANCES_REQUEST,
          deleteRelatedSubstances
        ),
        yield takeLatest(
          actionsTypes.EDIT_RELATED_SUBSTANCE_REQUEST,
          editRelatedSubstances
        )
      ];
    })
  ]);
}
