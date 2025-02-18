/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  listRegulatoryUpdatesRecords,
  createRegulatoryUpdatesRecord,
  editRegulatoryUpdatesRecord,
  listRegulatoryUpdatesBySubstance,
  deleteRegulatoryUpdate
} from '../../../services/api';
import {
  actionsTypes,
  getRegulatoryUpdatesRecordsRequest,
  getRegulatoryUpdatesRecordsSuccess,
  getRegulatoryUpdatesRecordsFailure,
  getRegulatoryUpdatesPaginationInfo,
  createRegulatoryUpdatesRecordSuccess,
  createRegulatoryUpdatesRecordFailure,
  editRegulatoryUpdatesRecordSuccess,
  editRegulatoryUpdatesRecordFailure,
  getRegulatoryUpdatesBySubstanceFailure,
  getRegulatoryUpdatesBySubstanceSuccess,
  getRegulatoryUpdatesBySubstancePaginationInfo,
  deleteRegulatoryUpdatesRecordSuccess,
  deleteRegulatoryUpdatesRecordFailure
} from './actions';
import {
  INewRegulatoryUpdate,
  IEditRegulatoryUpdate,
  IGetRegulatoryUpdateSubstance,
  IGetRegulatoryUpdateClass,
  IGetRegulatoryUpdates
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findRegulatoryUpdatesRecords({
  payload
}: {
  payload: IGetRegulatoryUpdates;
  type: typeof actionsTypes.LIST_REGULATORY_UPDATES_REQUEST;
}) {
  try {
    const { pageNumber, search, regulationLegislationId } = payload;
    const response: AxiosResponse<any> = yield call(
      listRegulatoryUpdatesRecords,
      { pageNumber, search, regulationLegislationId }
    );
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getRegulatoryUpdatesPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getRegulatoryUpdatesRecordsSuccess(response));
  } catch (error: any) {
    if (error?.response?.status !== 401) {
      yield put(getRegulatoryUpdatesRecordsFailure());
    }
  }
}

export function* findRegulatoryUpdatesBySubstance({
  payload
}: {
  payload: IGetRegulatoryUpdateSubstance;
  type: typeof actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_REQUEST;
}) {
  try {
    const { substanceId, jurisdictions, search, pageNumber } = payload;
    const response: AxiosResponse<any> = yield call(
      listRegulatoryUpdatesBySubstance,
      { substanceId, jurisdictions, search, pageNumber }
    );
    const paginationInfo = response?.headers['x-pagination'];
    yield put(
      getRegulatoryUpdatesBySubstancePaginationInfo(JSON.parse(paginationInfo))
    );
    yield put(getRegulatoryUpdatesBySubstanceSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getRegulatoryUpdatesBySubstanceFailure());
    }
  }
}

export function* createNewRegulatoryUpdatesRecord({
  payload
}: {
  payload: INewRegulatoryUpdate;
  type: typeof actionsTypes.CREATE_REGULATORY_UPDATES_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      active,
      agencyDate,
      agencyDueDate,
      comment,
      regulationId,
      substances,
      toyotaDueDate,
      attachments
    } = payload;
    yield call(createRegulatoryUpdatesRecord, {
      active,
      agencyDate,
      agencyDueDate,
      attachments,
      comment,
      regulationId,
      substances,
      toyotaDueDate
    });

    yield put(
      getRegulatoryUpdatesRecordsRequest({
        pageNumber: 1,
        search: '',
        regulationLegislationId: regulationId
      })
    );
    yield put(createRegulatoryUpdatesRecordSuccess());
  } catch (error: any) {
    yield put(createRegulatoryUpdatesRecordFailure());
  }
}

export function* changeRegulatoryUpdatesRecord({
  payload
}: {
  payload: IEditRegulatoryUpdate;
  type: typeof actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      active,
      agencyDate,
      agencyDueDate,
      attachments,
      comment,
      regulationId,
      substances,
      toyotaDueDate
    } = payload;
    yield call(editRegulatoryUpdatesRecord, {
      id,
      active,
      agencyDate,
      agencyDueDate,
      attachments,
      comment,
      regulationId,
      substances,
      toyotaDueDate
    });
    yield put(
      getRegulatoryUpdatesRecordsRequest({
        pageNumber: 1,
        search: '',
        regulationLegislationId: regulationId
      })
    );
    yield put(editRegulatoryUpdatesRecordSuccess());
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editRegulatoryUpdatesRecordFailure());
    }
  }
}

export function* deleteRegulatoryUpdatesRecord({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    yield call(deleteRegulatoryUpdate, payload);
    yield put(
      getRegulatoryUpdatesRecordsRequest({
        pageNumber: 1,
        search: '',
        regulationLegislationId: payload.regulationId
      })
    );
    yield put(deleteRegulatoryUpdatesRecordSuccess());
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(deleteRegulatoryUpdatesRecordFailure());
    }
  }
}

export default function* regulatoryUpdatesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_REGULATORY_UPDATES_REQUEST,
          findRegulatoryUpdatesRecords
        ),
        yield takeLatest(
          actionsTypes.CREATE_REGULATORY_UPDATES_RECORD_REQUEST,
          createNewRegulatoryUpdatesRecord
        ),
        yield takeLatest(
          actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_REQUEST,
          changeRegulatoryUpdatesRecord
        ),
        yield takeLatest(
          actionsTypes.DELETE_REGULATORY_UPDATES_RECORD_REQUEST,
          deleteRegulatoryUpdatesRecord
        ),
        yield takeLatest(
          actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_REQUEST,
          findRegulatoryUpdatesBySubstance
        )
      ];
    })
  ]);
}
