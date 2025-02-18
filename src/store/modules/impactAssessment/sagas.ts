/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  getImpactAssessmentRecord,
  listGroupImpactAssessments,
  createImpactAssessmentRecord,
  editImpactAssessmentRecord,
  getImpactAssessmentBySubstance,
  getImpactAssessmentBySubstanceRegulationAndToyotaRegion,
  sendImpactAssessmentList,
  getImpactAssessmentById,
  getImpactAssessmentSubstanceAttachments,
  editImpactAssessmentSubstanceAttachments,
  createImpactAssessmentSubstanceAttachments,
  deleteImpactAssessmentSubstanceAttachments
} from '../../../services/api';
import { getUpdatesRelatedSubstanceRequest } from '../dropdownValues/actions';
import { getLegislationRecordRequest } from '../legislations/actions';
import { getListingsRequest } from '../listings/actions';
import {
  getJurisdictionContentBySubstanceRequest,
  getSubstanceRecordRequest
} from '../substances/actions';
import {
  actionsTypes,
  getImpactAssessmentRecordSuccess,
  getImpactAssessmentRecordFailure,
  createImpactAssessmentRecordSuccess,
  createImpactAssessmentRecordFailure,
  editImpactAssessmentRecordSuccess,
  editImpactAssessmentRecordFailure,
  getImpactAssessmentBySubstanceSuccess,
  getImpactAssessmentBySubstanceFailure,
  uploadImpactAssessmentListSuccess,
  uploadImpactAssessmentListFailure,
  uploadImpactAssessmentListUploadFailure,
  getImpactAssessmentByIdFailure,
  getImpactAssessmentByIdSuccess,
  getImpactAssessmentBySubstanceRegulationAndToyotaRegionSuccess,
  getImpactAssessmentBySubstanceRegulationAndToyotaRegionFailure,
  getImpactAssessmentByGroupSuccess,
  getImpactAssessmentByGroupFailure,
  getImpactAssessmentGroupPaginationInfo,
  getImpactAssessmentSubstanceAttachmentsSuccess,
  getImpactAssessmentSubstanceAttachmentsError,
  getAttachmentsIASubstancePagination,
  editImpactAssessmentSubstanceAttachmentsSuccess,
  editImpactAssessmentSubstanceAttachmentsError,
  createImpactAssessmentSubstanceAttachmentsSuccess,
  createImpactAssessmentSubstanceAttachmentsError,
  deleteImpactAssessmentSubstanceAttachmentsSuccess,
  deleteImpactAssessmentSubstanceAttachmentsError,
  getImpactAssessmentSubstanceAttachments as getImpactAssessmentSubstanceAttachmentsRequest,
  getImpactAssessmentBySubstancePaginationInfo,
  getImpactAssessmentRecordCloneSuccess
} from './actions';
import {
  INewImpactAssessment,
  IEditImpactAssessment,
  INewImpactAssessmentList,
  IGetImpactAssessmentByGroup,
  IGetSubstanceImpactAttachments,
  IEditImpactAssessmentSubstanceAttachments,
  ICreateImpactAssessmentSubstanceAttachments
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findImpactAssessmentRecords({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentRecord,
      payload
    );
    yield put(getImpactAssessmentRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getImpactAssessmentRecordFailure());
    }
  }
}

export function* findImpactAssessmentRecordsClone({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_REQUEST_CLONE;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentRecord,
      payload
    );
    yield put(getImpactAssessmentRecordCloneSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getImpactAssessmentRecordFailure());
    }
  }
}
export function* findImpactAssessmentBySubstance({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentBySubstance,
      payload
    );
    yield put(getImpactAssessmentBySubstanceSuccess(response));
    const paginationInfo = response?.headers['x-pagination'];
    yield put(
      getImpactAssessmentBySubstancePaginationInfo(JSON.parse(paginationInfo))
    );
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getImpactAssessmentBySubstanceFailure());
    }
  }
}

export function* getAttachmentsImpactAssessmentSubstance({
  payload
}: {
  payload: IGetSubstanceImpactAttachments;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST;
}) {
  try {
    const {
      substanceId,
      regulationId,
      toyotaRegion,
      pageSize,
      pageNumber,
      searchText,
      areasSelected = [],
      groupImpactAssessment
    } = payload;
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentSubstanceAttachments,
      {
        groupImpactAssessment,
        substanceId,
        regulationId,
        toyotaRegion,
        pageSize,
        pageNumber,
        searchText,
        areasSelected
      }
    );
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(
        getAttachmentsIASubstancePagination(JSON.parse(paginationInfo))
      );
    }
    yield put(getImpactAssessmentSubstanceAttachmentsSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getImpactAssessmentSubstanceAttachmentsError());
    }
  }
}

export function* deleteAttachment({
  impactInfo
}: {
  impactInfo: any;
  type: typeof actionsTypes.DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      substanceId,
      regulationId,
      toyotaRegion,
      pageSize,
      pageNumber,
      searchText,
      areasSelected,
      groupImpactAssessment
    } = impactInfo;
    yield call(deleteImpactAssessmentSubstanceAttachments, impactInfo);
    yield put(deleteImpactAssessmentSubstanceAttachmentsSuccess());
    yield put(
      getImpactAssessmentSubstanceAttachmentsRequest({
        substanceId,
        regulationId,
        toyotaRegion,
        pageSize,
        pageNumber,
        searchText,
        areasSelected,
        groupImpactAssessment
      })
    );
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(deleteImpactAssessmentSubstanceAttachmentsError());
    }
  }
}

export function* editAttachmentsImpactAssessmentSubstance({
  payload
}: {
  payload: IEditImpactAssessmentSubstanceAttachments;
  type: typeof actionsTypes.EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      substanceId,
      regulationId,
      toyotaRegionId,
      attachment,
      applicationAreas = [],
      pageSize,
      pageNumber,
      searchText,
      areasSelected,
      groupImpactAssessment = false
    } = payload;
    yield call(editImpactAssessmentSubstanceAttachments, {
      id,
      substanceId,
      regulationId,
      toyotaRegionId,
      attachment,
      applicationAreas,
      groupImpactAssessment
    });
    yield put(
      getImpactAssessmentSubstanceAttachmentsRequest({
        substanceId,
        regulationId,
        toyotaRegion: toyotaRegionId,
        pageSize,
        pageNumber,
        searchText,
        areasSelected,
        groupImpactAssessment
      })
    );
    yield put(editImpactAssessmentSubstanceAttachmentsSuccess());
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editImpactAssessmentSubstanceAttachmentsError());
    }
  }
}

export function* createAttachmentsImpactAssessmentSubstance({
  payload
}: {
  payload: ICreateImpactAssessmentSubstanceAttachments;
  type: typeof actionsTypes.CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      substanceId,
      regulationId,
      toyotaRegionId,
      attachment,
      applicationAreas = [],
      pageSize,
      pageNumber,
      searchText,
      areasSelected,
      groupImpactAssessment
    } = payload;
    yield call(createImpactAssessmentSubstanceAttachments, {
      substanceId,
      regulationId,
      toyotaRegionId,
      attachment,
      applicationAreas,
      groupImpactAssessment
    });
    yield put(
      getImpactAssessmentSubstanceAttachmentsRequest({
        substanceId,
        regulationId,
        toyotaRegion: toyotaRegionId,
        pageSize,
        pageNumber,
        searchText,
        areasSelected,
        groupImpactAssessment
      })
    );
    yield put(createImpactAssessmentSubstanceAttachmentsSuccess());
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createImpactAssessmentSubstanceAttachmentsError());
    }
  }
}

export function* findGroupImpactAssessment({
  payload
}: {
  payload: IGetImpactAssessmentByGroup;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST;
}) {
  try {
    const {
      pageNumber,
      pageSize,
      loading,
      groupId,
      toyotaRegionId,
      applicationAreaId,
      searchText
    } = payload;
    const response: AxiosResponse<any> = yield call(
      listGroupImpactAssessments,
      {
        pageNumber,
        pageSize,
        loading,
        groupId,
        toyotaRegionId,
        applicationAreaId,
        searchText
      }
    );
    const paginationInfo = response?.headers['x-pagination'];
    yield put(
      getImpactAssessmentGroupPaginationInfo(JSON.parse(paginationInfo))
    );
    yield put(getImpactAssessmentByGroupSuccess(response));
  } catch (error: any) {
    yield put(getImpactAssessmentByGroupFailure());
  }
}

export function* createNewImpactAssessmentRecord({
  payload
}: {
  payload: INewImpactAssessment;
  type: typeof actionsTypes.CREATE_IMPACT_ASSESSMENT_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      active,
      phase,
      regulationId,
      substanceId,
      rows,
      toyotaRegionId,
      url
    } = payload;
    yield call(createImpactAssessmentRecord, {
      active,
      phase,
      regulationId,
      substanceId,
      rows,
      toyotaRegionId
    });
    yield put(getSubstanceRecordRequest(substanceId));
    yield put(getJurisdictionContentBySubstanceRequest({ substanceId }));
    yield put(createImpactAssessmentRecordSuccess());
    if (url) {
      history.push(url);
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createImpactAssessmentRecordFailure());
    }
  }
}

export function* changeImpactAssessmentRecord({
  payload
}: {
  payload: IEditImpactAssessment;
  type: typeof actionsTypes.EDIT_IMPACT_ASSESSMENT_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      active,
      phase,
      regulationId,
      substanceId,
      rows,
      toyotaRegionId,
      url
    } = payload;
    yield call(editImpactAssessmentRecord, {
      id,
      active,
      phase,
      regulationId,
      substanceId,
      rows,
      toyotaRegionId
    });
    yield put(getSubstanceRecordRequest(substanceId));
    yield put(getJurisdictionContentBySubstanceRequest({ substanceId }));
    yield put(editImpactAssessmentRecordSuccess());

    if (url) {
      history.push(url);
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editImpactAssessmentRecordFailure());
    }
  }
}

export function* uploadImpactAssessmentList({
  payload
}: {
  payload: INewImpactAssessmentList;
  type: typeof actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const response: AxiosResponse<any> = yield call(
      sendImpactAssessmentList,
      payload
    );
    yield put(
      getListingsRequest({
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        reference: payload.regulationId,
        type: 'rs',
        search: '',
        toyotaRegion: payload.toyotaRegionId
      })
    );
    if (response?.data?.message?.isSuccess) {
      if (payload.recordType === 2) {
        yield put(getLegislationRecordRequest({ id: payload.regulationId }));
      }
      yield put(uploadImpactAssessmentListSuccess());
    } else {
      yield put(
        uploadImpactAssessmentListUploadFailure(response?.data?.message?.errors)
      );
    }
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(uploadImpactAssessmentListFailure());
    }
  }
}

export function* findImpactAssessmentById({
  id
}: {
  id: number;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentById,
      id
    );
    yield put(getImpactAssessmentByIdSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getImpactAssessmentByIdFailure());
    }
  }
}

export function* resetImpactAssessmentById({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.RESET_IMPACT_ASSESSMENT_BY_SUBSTANCE;
}) {
  try {
    yield put(getImpactAssessmentByIdSuccess(null));
  } catch (error: any) {
    // nothing
  }
}

export function* checkImpactAssessmentBySubstanceRegulationAndToyotaRegion({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION;
}) {
  try {
    const { substanceId, regulationId, toyotaRegionId } = payload;
    const response: AxiosResponse<any> = yield call(
      getImpactAssessmentBySubstanceRegulationAndToyotaRegion,
      {
        substanceId,
        regulationId,
        toyotaRegionId
      }
    );
    yield put(
      getImpactAssessmentBySubstanceRegulationAndToyotaRegionSuccess(response)
    );
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(
        getImpactAssessmentBySubstanceRegulationAndToyotaRegionFailure()
      );
    }
  }
}

export default function* impactAssessmentSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_REQUEST,
          findImpactAssessmentRecords
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_REQUEST_CLONE,
          findImpactAssessmentRecordsClone
        ),
        yield takeLatest(
          actionsTypes.EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
          editAttachmentsImpactAssessmentSubstance
        ),
        yield takeLatest(
          actionsTypes.CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
          createAttachmentsImpactAssessmentSubstance
        ),
        yield takeLatest(
          actionsTypes.DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
          deleteAttachment
        ),
        yield takeLatest(
          actionsTypes.CREATE_IMPACT_ASSESSMENT_RECORD_REQUEST,
          createNewImpactAssessmentRecord
        ),
        yield takeLatest(
          actionsTypes.EDIT_IMPACT_ASSESSMENT_RECORD_REQUEST,
          changeImpactAssessmentRecord
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST,
          findImpactAssessmentBySubstance
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
          getAttachmentsImpactAssessmentSubstance
        ),
        yield takeLatest(
          actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_REQUEST,
          uploadImpactAssessmentList
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_BY_ID_REQUEST,
          findImpactAssessmentById
        ),
        yield takeLatest(
          actionsTypes.RESET_IMPACT_ASSESSMENT_BY_SUBSTANCE,
          resetImpactAssessmentById
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION,
          checkImpactAssessmentBySubstanceRegulationAndToyotaRegion
        ),
        yield takeLatest(
          actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST,
          findGroupImpactAssessment
        )
      ];
    })
  ]);
}
