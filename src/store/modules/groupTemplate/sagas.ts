/* eslint-disable no-unused-vars */

import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  getGroupTemplate,
  getAdminGroupTemplate,
  deleteAdminGroupTemplate,
  postRegulationGroup,
  getRegulationGroup,
  getTemplatesDownloadUrl,
  getTemplate,
  postTemplate
} from '../../../services/api';
import {
  actionsTypes,
  getGroupTemplateSuccess,
  getGroupTemplateFailure,
  createEditGroupSuccess,
  createEditGroupFailure,
  getGroupRequestSuccess,
  getGroupRequestFailure,
  downloadTemplatesRequestFailure,
  downloadTemplatesRequestSuccess,
  getGroupTemplatePaginationInfo,
  getAdminGroupTemplateRequest,
  getAdminGroupTemplateSuccess,
  getAdminGroupTemplateFailure,
  getAdminGroupTemplatePaginationInfo,
  getTemplateFailure,
  getTemplateSuccess,
  deleteAdminGroupTemplateRequest,
  deleteAdminGroupTemplatesSuccess,
  deleteAdminGroupTemplatesFailure,
  createEditTemplateSuccess
} from './actions';
import {
  IGetGroupTemplateSearch,
  IPostRegulationGroupAll,
  IPostTemplate
} from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* searchGroupTemplate({
  payload
}: {
  payload: IGetGroupTemplateSearch;
  type: typeof actionsTypes.GROUP_TEMPLATE_SEARCH_REQUEST;
}) {
  try {
    const { search, pageNumber, pageSize, noLoading, recordId, groupId, onlySubstances } =
      payload;
    const response: AxiosResponse<any> = yield call(getGroupTemplate, {
      search,
      pageNumber,
      pageSize,
      noLoading,
      recordId,
      groupId,
      onlySubstances
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getGroupTemplatePaginationInfo(JSON.parse(paginationInfo)));
    yield put(getGroupTemplateSuccess(response));
  } catch (error: any) {
    yield put(getGroupTemplateFailure());
  }
}

export function* searchAdminGroupTemplate({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_REQUEST;
}) {
  try {
    const { search, pageNumber, pageSize, noLoading, sortKey, direction } =
      payload;
    const response: AxiosResponse<any> = yield call(getAdminGroupTemplate, {
      pageNumber,
      pageSize,
      search,
      noLoading,
      sortKey,
      direction
    });
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getAdminGroupTemplatePaginationInfo(JSON.parse(paginationInfo)));
    yield put(getAdminGroupTemplateSuccess(response));
  } catch (error: any) {
    yield put(getAdminGroupTemplateFailure());
  }
}

export function* deleteAdminGroupTemplates({
  payload
}: {
  payload: Array<any>;
  type: typeof actionsTypes.GROUP_TEMPLATE_ADMIN_DELETE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      deleteAdminGroupTemplate,
      payload
    );

    yield put(
      getAdminGroupTemplateRequest({
        search: '',
        pageNumber: 1,
        pageSize: 10,
        noLoading: true,
        sortKey: '',
        direction: 'asc'
      })
    );
    yield put(deleteAdminGroupTemplatesSuccess(response));
  } catch (error: any) {
    yield put(deleteAdminGroupTemplatesFailure());
  }
}

export function* createEditRegulationGroup({
  payload
}: {
  payload: IPostRegulationGroupAll;
  type: typeof actionsTypes.CREATE_EDIT_GROUP_REQUEST;
}) {
  try {
    yield call(postRegulationGroup, payload.data);
    yield put(createEditGroupSuccess());
    if (payload.recordType === 2) {
      // legisaltion
      history.push(`/legislation/${payload.recordId}`, { scrollToTable: true });
    } else if (payload.recordType === 1) {
      // regulation
      history.push(`/regulation/${payload.recordId}`, { scrollToTable: true });
    } else if (payload.recordType === 3) {
      // listing
      history.push(`/viewListing/${payload.recordId}`, { scrollToTable: true });
    }
  } catch (error: any) {
    yield put(createEditGroupFailure());
  }
}

export function* createEditTemplate({
  payload
}: {
  payload: IPostTemplate;
  type: typeof actionsTypes.CREATE_EDIT_GROUP_REQUEST;
}) {
  try {
    yield call(postTemplate, payload);
    yield put(createEditTemplateSuccess());
  } catch (error: any) {
    yield put(createEditGroupFailure());
  }
}

export function* getRegulationGroupFunc({
  payload
}: {
  payload: number;
  type: typeof actionsTypes.GET_GROUP_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getRegulationGroup,
      payload
    );
    yield put(getGroupRequestSuccess(response));
  } catch (error: any) {
    yield put(getGroupRequestFailure());
  }
}

export function* getTemplateRecord({
  payload
}: {
  payload: number;
  type: typeof actionsTypes.GET_TEMPLATE_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(getTemplate, payload);
    yield put(getTemplateSuccess(response));
  } catch (error: any) {
    yield put(getTemplateFailure());
  }
}

export function* downloadTemplates() {
  try {
    const response: AxiosResponse<any> = yield call(getTemplatesDownloadUrl);
    yield put(downloadTemplatesRequestSuccess(response));
  } catch (error: any) {
    yield put(downloadTemplatesRequestFailure());
  }
}

export default function* groupTemplateSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GROUP_TEMPLATE_SEARCH_REQUEST,
          searchGroupTemplate
        ),
        yield takeLatest(
          actionsTypes.CREATE_EDIT_GROUP_REQUEST,
          createEditRegulationGroup
        ),
        yield takeLatest(
          actionsTypes.CREATE_EDIT_TEMPLATE_REQUEST,
          createEditTemplate
        ),
        yield takeLatest(
          actionsTypes.GET_GROUP_REQUEST,
          getRegulationGroupFunc
        ),
        yield takeLatest(
          actionsTypes.DOWNLOAD_TEMPLATE_REQUEST,
          downloadTemplates
        ),
        yield takeLatest(
          actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_REQUEST,
          searchAdminGroupTemplate
        ),
        yield takeLatest(
          actionsTypes.GROUP_TEMPLATE_ADMIN_DELETE_REQUEST,
          deleteAdminGroupTemplates
        ),
        yield takeLatest(actionsTypes.GET_TEMPLATE_REQUEST, getTemplateRecord)
      ];
    })
  ]);
}
