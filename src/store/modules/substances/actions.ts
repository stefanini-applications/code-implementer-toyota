import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetSearchResults } from '../searchResults/types';
import {
  IEditSubstance,
  IGetJurisdictionContentBySubstance,
  INewSubstance
} from './types';

export const actionsTypes = {
  LIST_SUBSTANCES_REQUEST: '@substances/LIST_SUBSTANCES_REQUEST',
  LIST_SUBSTANCES_SUCCESS: '@substances/LIST_SUBSTANCES_SUCCESS',
  LIST_SUBSTANCES_FAILURE: '@substances/LIST_SUBSTANCES_FAILURE',
  SUBSTANCES_PAGINATION_INFO: '@substances/SUBSTANCES_PAGINATION_INFO',
  SUBSTANCE_ATTACHMENT_PAGINATION_INFO:
    '@substances/SUBSTANCE_ATTACHMENT_PAGINATION_INFO',
  LIST_ALL_SUBSTANCES_REQUEST: '@substances/LIST_ALL_SUBSTANCES_REQUEST',
  LIST_ALL_SUBSTANCES_SUCCESS: '@substances/LIST_ALL_SUBSTANCES_SUCCESS',
  LIST_ALL_SUBSTANCES_FAILURE: '@substances/LIST_ALL_SUBSTANCES_FAILURE',
  LIST_SUBSTANCE_RECORD_REQUEST: '@substances/LIST_SUBSTANCE_RECORD_REQUEST',
  LIST_SUBSTANCE_RECORD_SUCCESS: '@substances/LIST_SUBSTANCE_RECORD_SUCCESS',
  LIST_SUBSTANCE_RECORD_FAILURE: '@substances/LIST_SUBSTANCE_RECORD_FAILURE',
  LIST_SUBSTANCE_ATTACHMENTS_REQUEST:
    '@substances/LIST_SUBSTANCE_ATTACHMENTS_REQUEST',
  LIST_SUBSTANCE_ATTACHMENTS_SUCCESS:
    '@substances/LIST_SUBSTANCE_ATTACHMENTS_SUCCESS',
  LIST_SUBSTANCE_ATTACHMENTS_FAILURE:
    '@substances/LIST_SUBSTANCE_ATTACHMENTS_FAILURE',
  LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_REQUEST:
    '@substances/LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_REQUEST',
  LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_SUCCESS:
    '@substances/LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_SUCCESS',
  LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_FAILURE:
    '@substances/LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_FAILURE',
  CREATE_SUBSTANCE_RECORD_REQUEST:
    '@substances/CREATE_SUBSTANCE_RECORD_REQUEST',
  CREATE_SUBSTANCE_RECORD_SUCCESS:
    '@substances/CREATE_SUBSTANCE_RECORD_SUCCESS',
  CREATE_SUBSTANCE_RECORD_FAILURE:
    '@substances/CREATE_SUBSTANCE_RECORD_FAILURE',
  EDIT_SUBSTANCE_RECORD_REQUEST: '@substances/EDIT_SUBSTANCE_RECORD_REQUEST',
  EDIT_SUBSTANCE_RECORD_SUCCESS: '@substances/EDIT_SUBSTANCE_RECORD_SUCCESS',
  EDIT_SUBSTANCE_RECORD_FAILURE: '@substances/EDIT_SUBSTANCE_RECORD_FAILURE',
  DELETE_SUBSTANCE_RECORD_REQUEST:
    '@substances/DELETE_SUBSTANCE_RECORD_REQUEST',
  DELETE_SUBSTANCE_RECORD_SUCCESS:
    '@substances/DELETE_SUBSTANCE_RECORD_SUCCESS',
  DELETE_SUBSTANCE_RECORD_FAILURE: '@substances/DELETE_SUBSTANCE_RECORD_FAILURE',
  CLEAR_SUBSTANCE_RECORD : '@@substances/CLEAR_SUBSTANCE_RECORD'
};

const baseSelector = (state: { substances: any }) => state.substances;

export function getSubstancesRequest(payload: any ) {
  return { type: actionsTypes.LIST_SUBSTANCES_REQUEST, payload };
}

export function getSubstancesSuccess(substances: any) {
  return {
    type: actionsTypes.LIST_SUBSTANCES_SUCCESS,
    payload: substances
  };
}

export function getSubstancesFailure() {
  return { type: actionsTypes.LIST_SUBSTANCES_FAILURE };
}

export function getSubstancesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.SUBSTANCES_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getSubstanceAttachmentPaginationInfo(
  substanceAttachmentsPaginationInfo: any
) {
  return {
    type: actionsTypes.SUBSTANCE_ATTACHMENT_PAGINATION_INFO,
    payload: substanceAttachmentsPaginationInfo
  };
}

export function getAllSubstancesRequest() {
  return { type: actionsTypes.LIST_ALL_SUBSTANCES_REQUEST };
}

export function getAllSubstancesSuccess(substances: any) {
  return {
    type: actionsTypes.LIST_ALL_SUBSTANCES_SUCCESS,
    payload: substances
  };
}

export function getAllSubstancesFailure() {
  return { type: actionsTypes.LIST_ALL_SUBSTANCES_FAILURE };
}

export function getSubstanceRecordRequest(id: number) {
  return { type: actionsTypes.LIST_SUBSTANCE_RECORD_REQUEST, id };
}

export function getSubstanceRecordSuccess(substance: any) {
  return {
    type: actionsTypes.LIST_SUBSTANCE_RECORD_SUCCESS,
    payload: substance
  };
}

export function getSubstanceRecordFailure() {
  return { type: actionsTypes.LIST_SUBSTANCE_RECORD_FAILURE };
}

export function createSubstanceRecordRequest(newRecord: INewSubstance) {
  return {
    type: actionsTypes.CREATE_SUBSTANCE_RECORD_REQUEST,
    payload: newRecord
  };
}

export function createSubstanceRecordSuccess(newSubstanceRecord: any) {
  ToastSuccess(translate('pages.substanceRecord.toastSuccessNewRecord'));
  return {
    type: actionsTypes.CREATE_SUBSTANCE_RECORD_SUCCESS,
    payload: newSubstanceRecord
  };
}

export function createSubstanceRecordFailure(error: any) {
  ToastError(error.response.data.message);
  return { type: actionsTypes.CREATE_SUBSTANCE_RECORD_FAILURE };
}

export function editSubstanceRecordRequest(editRecord: IEditSubstance) {
  return {
    type: actionsTypes.EDIT_SUBSTANCE_RECORD_REQUEST,
    payload: editRecord
  };
}

export function editSubstanceRecordSuccess() {
  ToastSuccess(translate('pages.substanceRecord.toastSuccessEditRecord'));
  return {
    type: actionsTypes.CREATE_SUBSTANCE_RECORD_SUCCESS
  };
}

export function editSubstanceRecordFailure() {
  return { type: actionsTypes.EDIT_SUBSTANCE_RECORD_FAILURE };
}

export function getSubstanceAttachmentsRequest(
  substanceId: any,
  jurisdictions: any,
  attachmentTab: any,
  search: any,
  pageSize: any,
  pageNumber: any
) {
  return {
    type: actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_REQUEST,
    payload: { substanceId, jurisdictions, attachmentTab, search, pageSize, pageNumber }
  };
}

export function getSubstanceAttachmentsSuccess(substanceAttachments: any) {
  return {
    type: actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_SUCCESS,
    payload: substanceAttachments
  };
}

export function getSubstanceAttachmentsFailure() {
  return { type: actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_FAILURE };
}

export function getJurisdictionContentBySubstanceRequest(
  data: IGetJurisdictionContentBySubstance
) {
  return {
    type: actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_REQUEST,
    payload: data
  };
}

export function getJurisdictionContentBySubstanceSuccess(
  jurisdictionContent: any
) {
  return {
    type: actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_SUCCESS,
    payload: jurisdictionContent
  };
}

export function getJurisdictionContentBySubstanceFailure() {
  return { type: actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_FAILURE };
}

export function deleteSubstanceRecordRequest(payload) {
  return {
    type: actionsTypes.DELETE_SUBSTANCE_RECORD_REQUEST,
    payload
  };
}

export function deleteSubstanceRecordSuccess() {
  ToastSuccess(translate('pages.substances.toastSuccessDeleteSubstances'));
  return {
    type: actionsTypes.DELETE_SUBSTANCE_RECORD_SUCCESS
  };
}

export function deleteSubstanceRecordFailure(error: any) {
  return { type: actionsTypes.DELETE_SUBSTANCE_RECORD_FAILURE };
}

export function clearSubstanceRecord() {
  return {
    type: actionsTypes.CLEAR_SUBSTANCE_RECORD
  };
}

export const selectors = {
  substances: (state: { substances: any }) =>
    baseSelector(state).substances?.data?.message,
  substanceRecord: (state: { substances: any }) =>
    baseSelector(state).substanceRecord,
  substanceAttachments: (state: { substances: any }) =>
    baseSelector(state).substanceAttachments,
  newSubstanceRecord: (state: { substances: any }) =>
    baseSelector(state).newSubstanceRecord,
  jurisdictionContentBySubstance: (state: { substances: any }) =>
    baseSelector(state).jurisdictionContentBySubstance?.data?.message,
  substancesPaginationInfo: (state: { substances: any }) =>
    baseSelector(state).substancesPaginationInfo,
  substanceAttachmentPaginationInfo: (state: { substances: any }) =>
    baseSelector(state).substanceAttachmentPaginationInfo
};
