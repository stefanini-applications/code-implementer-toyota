/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  listRegulationsAdmin,
  listLegislationRecord,
  listLegislationRecordAttachments,
  listLegislationRecordImpactAssessment,
  createLegislationRecord,
  editLegislationRecord,
  deleteLegislations,
  createNewBulkLegislationRecord
} from '../../../services/api';
import { getListingsRequest } from '../listings/actions';
import { getRelatedSubstancesRequest } from '../relatedSubstances/actions';
import { IGetSearchResults as IGetSearchResultsLegislations } from '../searchResults/types';
import {
  actionsTypes,
  getLegislationsRequest,
  getLegislationsSuccess,
  getLegislationsFailure,
  getLegislationsPaginationInfo,
  getLegislationRecordSuccess,
  getLegislationRecordFailure,
  getLegislationRecordIASuccess,
  getLegislationRecordIAFailure,
  getLegislationRecordAttachmentsSuccess,
  getLegislationRecordAttachmentsFailure,
  createLegislationRecordSuccess,
  createLegislationRecordFailure,
  editLegislationRecordSuccess,
  editLegislationRecordFailure,
  getLegislationRecordRequest,
  getAttachmentPaginationInfo,
  deleteLegislationRecordSuccess,
  deleteLegislationRecordFailure,
  createBulkLegislationRecordSuccess,
  createBulkLegislationRecordFailure,
  getOneLegislationRecordSuccess,
  getOneLegislationRecordFailure
} from './actions';
import {
  IGetLegislationRecord,
  IGetLegislationRecordIA,
  IGetLegislationRecordAttachments,
  INewLegislation,
  IEditLegislation
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findLegislations({
  payload
}: {
  payload: IGetSearchResultsLegislations;
  type: typeof actionsTypes.LIST_LEGISLATIONS_REQUEST;
}) {
  try {
    const { type, searchText, pageNumber, pageSize,sortKey,direction } = payload;
    const response: AxiosResponse<any> = yield call(listRegulationsAdmin, {
      recordType:'Legislation',
      searchText,
      pageNumber,
      pageSize,
      loading:false,
      sortKey,
      direction
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getLegislationsPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getLegislationsSuccess(response));
  } catch (error: any) {
    yield put(getLegislationsFailure());
  }
}

export function* findLegislationRecord({
  payload
}: {
  payload: IGetLegislationRecord;
  type: typeof actionsTypes.LIST_LEGISLATION_RECORD_REQUEST;
}) {
  try {
    const { id } = payload;
    const response: AxiosResponse<any> = yield call(listLegislationRecord, {
      id
    });
    yield put(getLegislationRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getLegislationRecordFailure());
    }
  }
}

export function* findOneLegislationRecord({
  payload
}: {
  payload: IGetLegislationRecord;
  type: typeof actionsTypes.GET_LEGISLATION_RECORD_REQUEST;
}) {
  try {
    const { id } = payload;
    const response: AxiosResponse<any> = yield call(listLegislationRecord, {
      id
    });
    yield put(getOneLegislationRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getOneLegislationRecordFailure());
    }
  }
}

export function* findLegislationRecordIA({
  payload
}: {
  payload: IGetLegislationRecordIA;
  type: typeof actionsTypes.LIST_LEGISLATION_RECORD_IA_REQUEST;
}) {
  try {
    const { legislationId } = payload;
    const response: AxiosResponse<any> = yield call(
      listLegislationRecordImpactAssessment,
      {
        legislationId
      }
    );
    yield put(getLegislationRecordIASuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getLegislationRecordIAFailure());
    }
  }
}

export function* findLegislationRecordAttachments({
  payload
}: {
  payload: IGetLegislationRecordAttachments;
  type: typeof actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_REQUEST;
}) {
  try {
    const { legislationId, attachmentTab, searchText, pageSize, pageNumber } = payload;
    const response: AxiosResponse<any> = yield call(
      listLegislationRecordAttachments,
      {
        legislationId,
        attachmentTab,
        searchText,
        pageSize,
        pageNumber
      }
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getAttachmentPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getLegislationRecordAttachmentsSuccess(response));
  } catch (error: any) {
    if (error?.response?.status !== 401) {
      yield put(getLegislationRecordAttachmentsFailure());
    }
  }
}

export function* createNewLegislationRecord({
  payload
}: {
  payload: INewLegislation;
  type: typeof actionsTypes.CREATE_LEGISLATION_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      billTitle,
      nickname,
      year,
      phase,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags,
      status
    } = payload;
    const response = yield call(createLegislationRecord, {
      billTitle,
      nickname,
      year,
      phase,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags,
      status
    });
    yield put(createLegislationRecordSuccess(response?.data?.message));
    history.push(`/legislation/${response.data.message.id}`);
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createLegislationRecordFailure());
    }
  }
}



export function* createBulkLegislationRecord({
  payload
}: {
  payload: [];
  type: typeof actionsTypes.CREATE_BULK_LEGISLATION_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response = yield call(createNewBulkLegislationRecord, payload);
    yield put(createBulkLegislationRecordSuccess(response?.data?.message));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createBulkLegislationRecordFailure());
    }
  }
}

export function* changeLegislationRecord({
  payload
}: {
  payload: IEditLegislation;
  type: typeof actionsTypes.EDIT_LEGISLATION_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      billTitle,
      nickname,
      year,
      phase,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags,
      status,
      toyotaRegion
    } = payload;
    const response = yield call(editLegislationRecord, {
      id,
      billTitle,
      nickname,
      year,
      phase,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      status,
      tags
    });
    yield put(getLegislationRecordRequest({ id }));
    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 10,
        reference: id,
        paged: true,
        type: 'rs',
        search: '',
        toyotaRegion
      })
    );
    yield put(editLegislationRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editLegislationRecordFailure());
    }
  }
}

export function* deleteLegislationsRecord({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.DELETE_LEGISLATION_RECORD_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      deleteLegislations,
      payload
    );
    yield put(
      getLegislationsRequest({
        searchText: '',
        type: 'Legislation',
        pageNumber: 1,
        pageSize: 10,
        sortKey:'',
        direction:''
      })
    );
    yield put(deleteLegislationRecordSuccess());
  } catch (error: any) {
    yield put(deleteLegislationRecordFailure(error));
  }
}

export default function* legislationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_LEGISLATIONS_REQUEST,
          findLegislations
        ),
        yield takeLatest(
          actionsTypes.LIST_LEGISLATION_RECORD_REQUEST,
          findLegislationRecord
        ),
        yield takeLatest(
          actionsTypes.GET_LEGISLATION_RECORD_REQUEST,
          findOneLegislationRecord
        ),
        yield takeLatest(
          actionsTypes.LIST_LEGISLATION_RECORD_IA_REQUEST,
          findLegislationRecordIA
        ),
        yield takeLatest(
          actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_REQUEST,
          findLegislationRecordAttachments
        ),
        yield takeLatest(
          actionsTypes.CREATE_LEGISLATION_RECORD_REQUEST,
          createNewLegislationRecord
        ),
        yield takeLatest(
          actionsTypes.CREATE_BULK_LEGISLATION_RECORD_REQUEST,
          createBulkLegislationRecord
        ),
        
        yield takeLatest(
          actionsTypes.EDIT_LEGISLATION_RECORD_REQUEST,
          changeLegislationRecord
        ),
        yield takeLatest(
          actionsTypes.DELETE_LEGISLATION_RECORD_REQUEST,
          deleteLegislationsRecord
        )
      ];
    })
  ]);
}
