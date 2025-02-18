import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import {
  INewImpactAssessment,
  IEditImpactAssessment,
  INewImpactAssessmentList,
  IGetImpactAssessmentByGroup,
  IGetSubstanceImpactAttachments,
  IEditImpactAssessmentSubstanceAttachments,
  ICreateImpactAssessmentSubstanceAttachments
} from './types';

export const actionsTypes = {
  GET_IMPACT_ASSESSMENT_REQUEST:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_REQUEST',
  GET_IMPACT_ASSESSMENT_REQUEST_CLONE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_REQUEST_CLONE',
  GET_IMPACT_ASSESSMENT_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_SUCCESS',
  GET_IMPACT_ASSESSMENT_CLONE_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_CLONE_SUCCESS',
  GET_IMPACT_ASSESSMENT_FAILURE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_FAILURE',
  ATTACHMENTS_SUBSTANCE_PAGINATION_INFO:
    '@impactAssessment/ATTACHMENTS_SUBSTANCE_PAGINATION_INFO',
  CREATE_IMPACT_ASSESSMENT_RECORD_REQUEST:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_RECORD_REQUEST',
  CREATE_IMPACT_ASSESSMENT_RECORD_SUCCESS:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_RECORD_SUCCESS',
  CREATE_IMPACT_ASSESSMENT_RECORD_FAILURE:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_RECORD_FAILURE',
  EDIT_IMPACT_ASSESSMENT_RECORD_REQUEST:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_RECORD_REQUEST',
  EDIT_IMPACT_ASSESSMENT_RECORD_SUCCESS:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_RECORD_SUCCESS',
  EDIT_IMPACT_ASSESSMENT_RECORD_FAILURE:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_RECORD_FAILURE',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_SUCCESS',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_FAILURE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_FAILURE',
  GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST',
  GET_IMPACT_ASSESSMENT_BY_GROUP_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_GROUP_SUCCESS',
  GET_IMPACT_ASSESSMENT_BY_GROUP_FAILURE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_GROUP_FAILURE',
  ATTACHMENT_IMPACT_ASSESSMENT_FAILURE:
    '@impactAssessment/ATTACHMENT_IMPACT_ASSESSMENT_FAILURE',
  ATTACHMENT_IMPACT_ASSESSMENT_READ_FAILURE:
    '@impactAssessment/ATTACHMENT_IMPACT_ASSESSMENT_READ_FAILURE',
  ATTACHMENT_IMPACT_ASSESSMENT_READ_TABS_FAILURE:
    '@impactAssessment/ATTACHMENT_IMPACT_ASSESSMENT_READ_TABS_FAILURE',
  ATTACHMENT_IMPACT_ASSESSMENT_INVALID_SHEET_NAMES:
    '@impactAssessment/ATTACHMENT_IMPACT_ASSESSMENT_INVALID_SHEET_NAMES',
  UPLOAD_IMPACT_ASSESSMENT_LIST_REQUEST:
    '@impactAssessment/UPLOAD_IMPACT_ASSESSMENT_LIST_REQUEST',
  UPLOAD_IMPACT_ASSESSMENT_LIST_SUCCESS:
    '@impactAssessment/UPLOAD_IMPACT_ASSESSMENT_LIST_SUCCESS',
  UPLOAD_IMPACT_ASSESSMENT_LIST_FAILURE:
    '@impactAssessment/UPLOAD_IMPACT_ASSESSMENT_LIST_FAILURE',
  UPLOAD_IMPACT_ASSESSMENT_LIST_UPLOAD_FAILURE:
    '@impactAssessment/UPLOAD_IMPACT_ASSESSMENT_LIST_UPLOAD_FAILURE',
  GET_IMPACT_ASSESSMENT_BY_ID_REQUEST:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_ID_REQUEST',
  GET_IMPACT_ASSESSMENT_BY_ID_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_ID_SUCCESS',
  GET_IMPACT_ASSESSMENT_BY_ID_FAILURE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_ID_FAILURE',
  GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST',
  GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS',
  GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE',
  EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST',
  EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS',
  EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE:
    '@impactAssessment/EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE',
  CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST',
  CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS',
  CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE',
  DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST:
    '@impactAssessment/DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST',
  DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS:
    '@impactAssessment/DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS',
  DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE:
    '@impactAssessment/CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE',
  RESET_IMPACT_ASSESSMENT_BY_SUBSTANCE:
    '@impactAssessment/RESET_IMPACT_ASSESSMENT_BY_SUBSTANCE',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_SUCCESS:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_SUCCESS',
  GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_FAILED:
    '@impactAssessment/GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_FAILED',
  IMPACT_ASSESSMENT_PAGINATION_INFO:
    '@impactAssessment/IMPACT_ASSESSMENT_PAGINATION_INFO',
  IMPACT_ASSESSMENT_SUBSTANCE_PAGINATION_INFO:
    '@impactAssessment/IMPACT_ASSESSMENT_SUBSTANCE_PAGINATION_INFO',
  CLEAR_IMPACT_ASSESSMENT_DATA: '@impactAssessment/CLEAR_IMPACT_ASSESSMENT_DATA'
};

const baseSelector = (state: { impactAssessment: any }) =>
  state.impactAssessment;

export function getImpactAssessmentRecordRequest(payload: any) {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_REQUEST, payload };
}

export function getImpactAssessmentRecordRequestClone(payload: any) {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_REQUEST_CLONE, payload };
}

export function getImpactAssessmentSubstanceAttachments(
  data: IGetSubstanceImpactAttachments
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
    payload: data
  };
}

export function getImpactAssessmentSubstanceAttachmentsSuccess(
  impactAssessmentAttachmentBySubstance: any
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS,
    payload: impactAssessmentAttachmentBySubstance
  };
}

export function editImpactAssessmentSubstanceAttachmentsSuccess() {
  ToastSuccess(
    translate('pages.impactAssessment.toastSuccessEditAttachmentSubstance')
  );
  return {
    type: actionsTypes.EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS
  };
}

export function editImpactAssessmentSubstanceAttachmentsError() {

  return {
    type: actionsTypes.EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS
  };
}

export function deleteImpactAssessmentSubstanceAttachments(
  impactInfo: IGetSubstanceImpactAttachments
) {
  return {
    type: actionsTypes.DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
    impactInfo
  };
}

export function deleteImpactAssessmentSubstanceAttachmentsSuccess() {

  return {
    type: actionsTypes.DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS
  };
}

export function deleteImpactAssessmentSubstanceAttachmentsError() {

  return {
    type: actionsTypes.DELETE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE
  };
}

export function createImpactAssessmentSubstanceAttachments(
  payload: ICreateImpactAssessmentSubstanceAttachments
) {
  return {
    type: actionsTypes.CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
    payload
  };
}

export function createImpactAssessmentSubstanceAttachmentsSuccess() {
  ToastSuccess(
    translate('pages.impactAssessment.toastSuccessCreateAttachmentSubstance')
  );
  return {
    type: actionsTypes.CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS
  };
}

export function createImpactAssessmentSubstanceAttachmentsError() {

  return {
    type: actionsTypes.CREATE_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS
  };
}

export function editImpactAssessmentSubstanceAttachments(
  editRecord: IEditImpactAssessmentSubstanceAttachments
) {
  return {
    type: actionsTypes.EDIT_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_REQUEST,
    payload: editRecord
  };
}

export function getAttachmentsIASubstancePagination(paginationInfo: any) {
  return {
    type: actionsTypes.ATTACHMENTS_SUBSTANCE_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getImpactAssessmentSubstanceAttachmentsError() {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_FAILURE
  };
}

export function getImpactAssessmentRecordSuccess(impactAssessmentRecords: any) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_SUCCESS,
    payload: impactAssessmentRecords
  };
}

export function getImpactAssessmentRecordCloneSuccess(impactAssessmentRecordsClone: any) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_CLONE_SUCCESS,
    payload: impactAssessmentRecordsClone
  };
}

export function getImpactAssessmentRecordFailure() {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_FAILURE };
}

export function getImpactAssessmentBySubstanceRequest(payload: any) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REQUEST,
    payload
  };
}

export function getImpactAssessmentBySubstanceSuccess(
  impactAssessmentBySubstance: any
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_SUCCESS,
    payload: impactAssessmentBySubstance
  };
}

export function getImpactAssessmentBySubstanceFailure() {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_FAILURE };
}

export function getImpactAssessmentByGroupRequest(
  payload: IGetImpactAssessmentByGroup
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_REQUEST,
    payload
  };
}

export function getImpactAssessmentByGroupSuccess(
  impactAssessmentByGroup: any
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_SUCCESS,
    payload: impactAssessmentByGroup
  };
}

export function getImpactAssessmentByGroupFailure() {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_FAILURE };
}

export function resetImpactAssessmentBySubstance() {
  return {
    type: actionsTypes.RESET_IMPACT_ASSESSMENT_BY_SUBSTANCE
  };
}

export function getImpactAssessmentBySubstanceRegulationAndToyotaRegion(
  substanceRegulationToyotaRegion: any
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION,
    payload: substanceRegulationToyotaRegion
  };
}

export function getImpactAssessmentBySubstanceRegulationAndToyotaRegionSuccess(
  impactAssessmentBySubstance: any
) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_SUCCESS,
    payload: impactAssessmentBySubstance
  };
}

export function getImpactAssessmentBySubstanceRegulationAndToyotaRegionFailure() {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_FAILED
  };
}

export function createImpactAssessmentRecordRequest(
  newRecord: INewImpactAssessment
) {
  return {
    type: actionsTypes.CREATE_IMPACT_ASSESSMENT_RECORD_REQUEST,
    payload: newRecord
  };
}

export function createImpactAssessmentRecordSuccess() {
  ToastSuccess(translate('pages.impactAssessment.toastSuccessNewRecord'));
  return {
    type: actionsTypes.CREATE_IMPACT_ASSESSMENT_RECORD_SUCCESS
  };
}

export function createImpactAssessmentRecordFailure() {
  return { type: actionsTypes.CREATE_IMPACT_ASSESSMENT_RECORD_FAILURE };
}

export function editImpactAssessmentRecordRequest(
  editRecord: IEditImpactAssessment
) {
  return {
    type: actionsTypes.EDIT_IMPACT_ASSESSMENT_RECORD_REQUEST,
    payload: editRecord
  };
}

export function editImpactAssessmentRecordSuccess() {
  ToastSuccess(translate('pages.impactAssessment.toastSuccessEditRecord'));
  return {
    type: actionsTypes.EDIT_IMPACT_ASSESSMENT_RECORD_SUCCESS
  };
}

export function editImpactAssessmentRecordFailure() {
  return { type: actionsTypes.EDIT_IMPACT_ASSESSMENT_RECORD_FAILURE };
}

export function attachmentImapctAssessmentFailure() {
  return { type: actionsTypes.ATTACHMENT_IMPACT_ASSESSMENT_FAILURE };
}

export function attachmentImapctAssessmentReadFailure() {
  return { type: actionsTypes.ATTACHMENT_IMPACT_ASSESSMENT_READ_FAILURE };
}

export function attachmentImapctAssessmentReadTabsFailure() {
  return { type: actionsTypes.ATTACHMENT_IMPACT_ASSESSMENT_READ_TABS_FAILURE };
}

export function attachmentImapctAssessmentInvalidSheetNames() {
  return {
    type: actionsTypes.ATTACHMENT_IMPACT_ASSESSMENT_INVALID_SHEET_NAMES
  };
}

export function uploadImpactAssessmentListRequest(
  list: INewImpactAssessmentList
) {
  return {
    type: actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_REQUEST,
    payload: list
  };
}

export function uploadImpactAssessmentListSuccess() {
  ToastSuccess(translate('pages.impactAssessment.toastSuccessListUpload'));
  return {
    type: actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_SUCCESS
  };
}

export function uploadImpactAssessmentListFailure() {
  return { type: actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_FAILURE };
}

export function uploadImpactAssessmentListUploadFailure(payload: any) {
  return {
    type: actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_UPLOAD_FAILURE,
    payload
  };
}

export function getImpactAssessmentByIdRequest(id: number) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_ID_REQUEST,
    id
  };
}

export function getImpactAssessmentByIdSuccess(impactAssessmentById: any) {
  return {
    type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_ID_SUCCESS,
    payload: impactAssessmentById
  };
}

export function getImpactAssessmentByIdFailure() {
  return { type: actionsTypes.GET_IMPACT_ASSESSMENT_BY_ID_FAILURE };
}

export function getImpactAssessmentGroupPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.IMPACT_ASSESSMENT_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getImpactAssessmentBySubstancePaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.IMPACT_ASSESSMENT_SUBSTANCE_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function clearImpactAssessmentData() {
  return {
    type: actionsTypes.CLEAR_IMPACT_ASSESSMENT_DATA
  };
}

export const selectors = {
  impactAssessmentRecord: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentRecord?.data?.message,
  impactAssessmentRecordClone: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentRecordClone?.data?.message,
  impactAssessmentBySubstance: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentBySubstance,
  impactAssessmentBySubstancePaginationInfo: (state: {
    impactAssessment: any;
  }) => baseSelector(state).impactAssessmentBySubstancePaginationInfo,
  substanceAttachmentsPagination: (state: { impactAssessment: any }) =>
    baseSelector(state).substanceAttachmentsPagination,
  impactAssessmentByGroup: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentByGroup,
  substanceAttachmentImpactAssessment: (state: { impactAssessment: any }) =>
    baseSelector(state).substanceAttachmentImpactAssessment,
  impactAssessmentListUploadError: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentListUploadError,
  impactAssessmentById: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentById,
  impactAssessmentBySubstanceRegulationAndToyotaRegion: (state: {
    impactAssessment: any;
  }) =>
    baseSelector(state).impactAssessmentBySubstanceRegulationAndToyotaRegion,
  impactAssessmentGroupPaginationInfo: (state: { impactAssessment: any }) =>
    baseSelector(state).impactAssessmentGroupPaginationInfo
};
