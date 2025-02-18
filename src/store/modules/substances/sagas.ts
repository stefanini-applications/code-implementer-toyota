/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  getSubstanceRecord,
  addSubstanceRecord,
  editSubstanceRecord,
  listSubstancesAdmin,
  listSubstances,
  listSubstanceAttachments,
  listJurisdictionContentBySubstance,
  deleteSubstances
} from '../../../services/api';
import { IGetSearchResults as IGetSearchResultsSubstances } from '../searchResults/types';
import {
  actionsTypes,
  getSubstancesSuccess,
  getSubstancesFailure,
  getSubstanceRecordRequest,
  getSubstanceRecordSuccess,
  getSubstanceRecordFailure,
  createSubstanceRecordSuccess,
  createSubstanceRecordFailure,
  editSubstanceRecordSuccess,
  editSubstanceRecordFailure,
  getSubstanceAttachmentsSuccess,
  getSubstanceAttachmentsFailure,
  getJurisdictionContentBySubstanceSuccess,
  getJurisdictionContentBySubstanceFailure,
  getSubstancesPaginationInfo,
  getSubstanceAttachmentPaginationInfo,
  getSubstancesRequest,
  deleteSubstanceRecordFailure,
  deleteSubstanceRecordSuccess
} from './actions';
import {
  IEditSubstance,
  INewSubstance,
  IGetSubstanceAttachments,
  IGetJurisdictionContentBySubstance
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findSubstances({
  payload
}: {
  payload: IGetSearchResultsSubstances;
  type: typeof actionsTypes.LIST_SUBSTANCES_REQUEST;
}) {
  try {  
   
   const { type, searchText, pageNumber, pageSize,sortKey,direction } = payload;
   const response: AxiosResponse<any> = yield call(listSubstancesAdmin, {
      searchText,
      pageNumber,
      pageSize,
      loading: false,
      sortKey,
      direction,
    });        
    const paginationInfo = response?.headers['x-pagination'];
    if (type === 'Substance') {
      yield put(getSubstancesPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getSubstancesSuccess(response));
  } catch (error: any) {
    yield put(getSubstancesFailure());
  }
}

export function* deleteSubstancesRecord({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.DELETE_SUBSTANCE_RECORD_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(deleteSubstances, payload);
    yield put(
      getSubstancesRequest({
        searchText: '',
        type: 'Substance',
        pageNumber: 1,
        pageSize: 10,
        sortKey: '',
        direction: ''
      })
    );
    yield put(deleteSubstanceRecordSuccess());
  } catch (error: any) {
    yield put(deleteSubstanceRecordFailure(error));
  }
}

export function* findAllSubstances() {
  try {
    const response: AxiosResponse<any> = yield call(listSubstances);
    yield put(getSubstancesSuccess(response));
  } catch (error: any) {
    yield put(getSubstancesFailure());
  }
}

export function* findSubstanceRecord({
  id
}: {
  id: number;
  type: typeof actionsTypes.LIST_SUBSTANCE_RECORD_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(getSubstanceRecord, id);
    yield put(getSubstanceRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getSubstanceRecordFailure());
    }
  }
}

export function* createNewSubstanceRecord({
  payload
}: {
  payload: INewSubstance;
  type: typeof actionsTypes.CREATE_SUBSTANCE_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      active,
      commonName,
      otherNames,
      casNumber,
      execSummary,
      nextAction,
      uses,
      recordType
    } = payload;
    const response = yield call(addSubstanceRecord, {
      active,
      commonName,
      otherNames,
      casNumber,
      execSummary,
      nextAction,
      uses,
      recordType
    });
    yield put(createSubstanceRecordSuccess(response.data.message));
    if (recordType === 1) {
      history.push(`/substance/${response.data.message.id}`);
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createSubstanceRecordFailure(error));
    }
  }
}

export function* changeSubstanceRecord({
  payload
}: {
  payload: IEditSubstance;
  type: typeof actionsTypes.EDIT_SUBSTANCE_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      active,
      commonName,
      otherNames,
      casNumber,
      execSummary,
      nextAction,
      uses,
      recordType
    } = payload;
    yield call(editSubstanceRecord, {
      id,
      active,
      commonName,
      otherNames,
      casNumber,
      execSummary,
      nextAction,
      uses,
      recordType
    });
    yield put(editSubstanceRecordSuccess());
    if (recordType === 1) {
      yield put(getSubstanceRecordRequest(id));
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editSubstanceRecordFailure());
    }
  }
}

export function* findSubstanceAttachments({
  payload
}: {
  payload: IGetSubstanceAttachments;
  type: typeof actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      listSubstanceAttachments,
      payload
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(
        getSubstanceAttachmentPaginationInfo(JSON.parse(paginationInfo))
      );
    }
    yield put(getSubstanceAttachmentsSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getSubstanceAttachmentsFailure());
    }
  }
}

export function* findJurisdictionContentBySubstance({
  payload
}: {
  payload: IGetJurisdictionContentBySubstance;
  type: typeof actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_REQUEST;
}) {
  try {
    const { substanceId } = payload;
    const response: AxiosResponse<any> = yield call(
      listJurisdictionContentBySubstance,
      {
        substanceId
      }
    );
    yield put(getJurisdictionContentBySubstanceSuccess(response));
  } catch (error: any) {
    yield put(getJurisdictionContentBySubstanceFailure());
  }
}

export default function* substancesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.LIST_SUBSTANCES_REQUEST, findSubstances),
        yield takeLatest(
          actionsTypes.LIST_ALL_SUBSTANCES_REQUEST,
          findAllSubstances
        ),
        yield takeLatest(
          actionsTypes.LIST_SUBSTANCE_RECORD_REQUEST,
          findSubstanceRecord
        ),
        yield takeLatest(
          actionsTypes.CREATE_SUBSTANCE_RECORD_REQUEST,
          createNewSubstanceRecord
        ),
        yield takeLatest(
          actionsTypes.EDIT_SUBSTANCE_RECORD_REQUEST,
          changeSubstanceRecord
        ),
        yield takeLatest(
          actionsTypes.DELETE_SUBSTANCE_RECORD_REQUEST,
          deleteSubstancesRecord
        ),
        yield takeLatest(
          actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_REQUEST,
          findSubstanceAttachments
        ),
        yield takeLatest(
          actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_REQUEST,
          findJurisdictionContentBySubstance
        )
      ];
    })
  ]);
}
