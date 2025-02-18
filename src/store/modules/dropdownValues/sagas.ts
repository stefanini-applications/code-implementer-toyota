/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  listListingsDropdown,
  listRegLeg,
  listRegulationsBySubstance,
  listRelatedySubstance,
  listUpdatesRelatedSubstance
} from '../../../services/api';
import {
  actionsTypes,
  getRegulationsSuccess,
  getRegulationsFailure,
  getRegulationsSubstanceSuccess,
  getRegulationsSubstanceFailure,
  getRelatedSubstanceSuccess,
  getRelatedSubstanceFailure,
  getUpdatesRelatedSubstanceSuccess,
  getUpdatesRelatedSubstanceFailure,
  getListingsFailure,
  getListingsSuccess
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findRegulations() {
  try {
    const response: AxiosResponse<any> = yield call(listRegLeg);
    yield put(getRegulationsSuccess(response));
  } catch (error: any) {
    yield put(getRegulationsFailure());
  }
}
export function* findRegulationsBySubstance(substanceId: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      listRegulationsBySubstance,
      substanceId
    );
    yield put(getRegulationsSubstanceSuccess(response));
  } catch (error: any) {
    yield put(getRegulationsSubstanceFailure());
  }
}

export function* findRelatedSubstance(regulationId: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      listRelatedySubstance,
      regulationId
    );
    yield put(getRelatedSubstanceSuccess(response));
  } catch (error: any) {
    yield put(getRelatedSubstanceFailure());
  }
}

export function* findUpdatesRelatedSubstance(regulationId: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      listUpdatesRelatedSubstance,
      regulationId
    );
    yield put(getUpdatesRelatedSubstanceSuccess(response));
  } catch (error: any) {
    yield put(getUpdatesRelatedSubstanceFailure());
  }
}

export function* findListings({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.LIST_ALL_LISTINGS_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      listListingsDropdown,
      payload
    );
    yield put(getListingsSuccess(response));
  } catch (error: any) {
    yield put(getListingsFailure());
  }
}

export default function* regulationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_ALL_REGULATIONS_REQUEST,
          findRegulations
        ),
        yield takeLatest(
          actionsTypes.LIST_REGULATIONS_SUBSTANCE_REQUEST,
          findRegulationsBySubstance
        ),
        yield takeLatest(
          actionsTypes.LIST_RELATED_SUBSTANCE_REQUEST,
          findRelatedSubstance
        ),
        yield takeLatest(
          actionsTypes.LIST_UPDATES_RELATED_SUBSTANCE_REQUEST,
          findUpdatesRelatedSubstance
        ),
        yield takeLatest(actionsTypes.LIST_ALL_LISTINGS_REQUEST, findListings)
      ];
    })
  ]);
}
