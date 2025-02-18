import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetSearchResults } from '../searchResults/types';
import {
  IGetLegislationRecord,
  IGetLegislationRecordIA,
  IGetLegislationRecordAttachments,
  INewLegislation,
  IEditLegislation
} from './types';

export const actionsTypes = {
  LIST_LEGISLATIONS_REQUEST: '@legislations/LIST_LEGISLATIONS_REQUEST',
  LIST_LEGISLATIONS_SUCCESS: '@legislations/LIST_LEGISLATIONS_SUCCESS',
  LIST_LEGISLATIONS_FAILURE: '@legislations/LIST_LEGISLATIONS_FAILURE',
  LEGISLATIONS_PAGINATION_INFO: '@legislations/LEGISLATIONS_PAGINATION_INFO',
  LIST_LEGISLATION_RECORD_REQUEST:
    '@legislations/LIST_LEGISLATION_RECORD_REQUEST',
  LIST_LEGISLATION_RECORD_SUCCESS:
    '@legislations/LIST_LEGISLATION_RECORD_SUCCESS',
  LIST_LEGISLATION_RECORD_FAILURE:
    '@legislations/LIST_LEGISLATION_RECORD_FAILURE',
  GET_LEGISLATION_RECORD_REQUEST:
    '@legislations/GET_LEGISLATION_RECORD_REQUEST',
  GET_LEGISLATION_RECORD_SUCCESS:
    '@legislations/GET_LEGISLATION_RECORD_SUCCESS',
  GET_LEGISLATION_RECORD_FAILURE:
    '@legislations/GET_LEGISLATION_RECORD_FAILURE',
  LIST_LEGISLATION_RECORD_IA_REQUEST:
    '@legislations/LIST_LEGISLATION_RECORD_IA_REQUEST',
  LIST_LEGISLATION_RECORD_IA_SUCCESS:
    '@legislations/LIST_LEGISLATION_RECORD_IA_SUCCESS',
  LIST_LEGISLATION_RECORD_IA_FAILURE:
    '@legislations/LIST_LEGISLATION_RECORD_IA_FAILURE',
  LIST_LEGISLATION_RECORD_ATTACHMENTS_REQUEST:
    '@legislations/LIST_LEGISLATION_RECORD_ATTACHMENTS_REQUEST',
  LIST_LEGISLATION_RECORD_ATTACHMENTS_SUCCESS:
    '@legislations/LIST_LEGISLATION_RECORD_ATTACHMENTS_SUCCESS',
  LIST_LEGISLATION_RECORD_ATTACHMENTS_FAILURE:
    '@legislations/LIST_LEGISLATION_RECORD_ATTACHMENTS_FAILURE',
  PAGINATION_LEGISLATION_RECORD_ATTACHMENTS_FAILURE:
    '@legislations/PAGINATION_LEGISLATION_RECORD_ATTACHMENTS_FAILURE',
  CREATE_LEGISLATION_RECORD_REQUEST:
    '@legislations/CREATE_LEGISLATION_RECORD_REQUEST',
  CREATE_LEGISLATION_RECORD_SUCCESS:
    '@legislations/CREATE_LEGISLATION_RECORD_SUCCESS',
  CREATE_LEGISLATION_RECORD_FAILURE:
    '@legislations/CREATE_LEGISLATION_RECORD_FAILURE',
  EDIT_LEGISLATION_RECORD_REQUEST:
    '@legislations/EDIT_LEGISLATION_RECORD_REQUEST',
  EDIT_LEGISLATION_RECORD_SUCCESS:
    '@legislations/EDIT_LEGISLATION_RECORD_SUCCESS',
  EDIT_LEGISLATION_RECORD_FAILURE:
    '@legislations/EDIT_LEGISLATION_RECORD_FAILURE',
  DELETE_LEGISLATION_RECORD_REQUEST:
    '@legislations/DELETE_LEGISLATION_RECORD_REQUEST',
  DELETE_LEGISLATION_RECORD_SUCCESS:
    '@legislations/DELETE_LEGISLATION_RECORD_SUCCESS',
  DELETE_LEGISLATION_RECORD_FAILURE:
    '@legislations/DELETE_LEGISLATION_RECORD_FAILURE',

    CREATE_BULK_LEGISLATION_RECORD_REQUEST:
    '@legislations/CREATE_BULK_LEGISLATION_RECORD_REQUEST',
  CREATE_BULK_LEGISLATION_RECORD_SUCCESS:
    '@legislations/CREATE_BULK_LEGISLATION_RECORD_SUCCESS',
  CREATE_BULK_LEGISLATION_RECORD_FAILURE:
    '@legislations/CREATE_BULK_LEGISLATION_RECORD_FAILURE',
};

const baseSelector = (state: { legislations: any }) => state.legislations;

export function getLegislationsRequest(data: IGetSearchResults) {
  return { type: actionsTypes.LIST_LEGISLATIONS_REQUEST, payload: data };
}

export function getLegislationsSuccess(legislations: any) {
  return {
    type: actionsTypes.LIST_LEGISLATIONS_SUCCESS,
    payload: legislations
  };
}

export function getLegislationsFailure() {
  return { type: actionsTypes.LIST_LEGISLATIONS_FAILURE };
}

export function getLegislationsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.LEGISLATIONS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getLegislationRecordRequest(data: IGetLegislationRecord) {
  return { type: actionsTypes.LIST_LEGISLATION_RECORD_REQUEST, payload: data };
}

export function getLegislationRecordSuccess(legislationRecord: any) {
  return {
    type: actionsTypes.LIST_LEGISLATION_RECORD_SUCCESS,
    payload: legislationRecord
  };
}

export function getLegislationRecordFailure() {
  return { type: actionsTypes.LIST_LEGISLATION_RECORD_FAILURE };
}

export function getOneLegislationRecordRequest(data: IGetLegislationRecord) {
  return { type: actionsTypes.GET_LEGISLATION_RECORD_REQUEST, payload: data };
}

export function getOneLegislationRecordSuccess(oneLegislationRecord: any) {
  return {
    type: actionsTypes.GET_LEGISLATION_RECORD_SUCCESS,
    payload: oneLegislationRecord
  };
}

export function getOneLegislationRecordFailure() {
  return { type: actionsTypes.GET_LEGISLATION_RECORD_FAILURE };
}

export function getLegislationRecordIARequest(data: IGetLegislationRecordIA) {
  return {
    type: actionsTypes.LIST_LEGISLATION_RECORD_IA_REQUEST,
    payload: data
  };
}

export function getLegislationRecordIASuccess(
  legislationImpactAssessment: any
) {
  return {
    type: actionsTypes.LIST_LEGISLATION_RECORD_IA_SUCCESS,
    payload: legislationImpactAssessment
  };
}

export function getLegislationRecordIAFailure() {
  return { type: actionsTypes.LIST_LEGISLATION_RECORD_IA_FAILURE };
}

export function getLegislationRecordAttachmentsRequest(
  data: IGetLegislationRecordAttachments
) {
  return {
    type: actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_REQUEST,
    payload: data
  };
}

export function getLegislationRecordAttachmentsSuccess(
  legislationAttachments: any
) {
  return {
    type: actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_SUCCESS,
    payload: legislationAttachments
  };
}

export function getLegislationRecordAttachmentsFailure() {
  return { type: actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_FAILURE };
}

export function createLegislationRecordRequest(newRecord: INewLegislation) {
  return {
    type: actionsTypes.CREATE_LEGISLATION_RECORD_REQUEST,
    payload: newRecord
  };
}

export function createLegislationRecordSuccess(newLegislationRecord: any) {
  ToastSuccess(translate('pages.legislations.toastSuccessNewLegislation'));
  return {
    type: actionsTypes.CREATE_LEGISLATION_RECORD_SUCCESS,
    payload: newLegislationRecord
  };
}

export function createLegislationRecordFailure() {
  return { type: actionsTypes.CREATE_LEGISLATION_RECORD_FAILURE };
}


// bulk insert start here
export function createBulkLegislationRecordRequest(payload: []) {
  return {
    type: actionsTypes.CREATE_BULK_LEGISLATION_RECORD_REQUEST,
    payload
  };
}

export function createBulkLegislationRecordSuccess(payload: any) {
  // ToastSuccess(translate('pages.legislations.toastSuccessNewLegislation'));
  return {
    type: actionsTypes.CREATE_BULK_LEGISLATION_RECORD_SUCCESS,
    payload
  };
}

export function createBulkLegislationRecordFailure() {
  return { type: actionsTypes.CREATE_BULK_LEGISLATION_RECORD_FAILURE };
}

// bulk insert end here

export function editLegislationRecordRequest(editRecord: IEditLegislation) {
  return {
    type: actionsTypes.EDIT_LEGISLATION_RECORD_REQUEST,
    payload: editRecord
  };
}

export function editLegislationRecordSuccess(editLegislationRecord: any) {
  ToastSuccess(translate('pages.legislations.toastSuccessEditLegislation'));
  return {
    type: actionsTypes.EDIT_LEGISLATION_RECORD_SUCCESS,
    payload: editLegislationRecord
  };
}

export function editLegislationRecordFailure() {
  return { type: actionsTypes.EDIT_LEGISLATION_RECORD_FAILURE };
}
export function getAttachmentPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.PAGINATION_LEGISLATION_RECORD_ATTACHMENTS_FAILURE,
    payload: paginationInfo
  };
}

export function deleteLegislationRecordRequest(payload) {
  return {
    type: actionsTypes.DELETE_LEGISLATION_RECORD_REQUEST,
    payload
  };
}

export function deleteLegislationRecordSuccess() {
  ToastSuccess(translate('pages.legislations.toastSuccessDeleteLegislations'));
  return {
    type: actionsTypes.DELETE_LEGISLATION_RECORD_SUCCESS
  };
}

export function deleteLegislationRecordFailure(error: any) {
  return { type: actionsTypes.DELETE_LEGISLATION_RECORD_FAILURE };
}

export const selectors = {
  legislations: (state: { legislations: any }) =>
    baseSelector(state).legislations?.data?.message,
  legislationRecord: (state: { legislations: any }) =>
    baseSelector(state).legislationRecord,
  oneLegislationRecord: (state: { legislations: any }) =>
    baseSelector(state).oneLegislationRecord,
  legislationImpactAssessment: (state: { legislations: any }) =>
    baseSelector(state).legislationImpactAssessment,
  legislationAttachments: (state: { legislations: any }) =>
    baseSelector(state).legislationAttachments,
  legislationsPaginationInfo: (state: { legislations: any }) =>
    baseSelector(state).legislationsPaginationInfo,
  newLegislationRecord: (state: { legislations: any }) =>
    baseSelector(state).newLegislationRecord,
  editLegislationRecord: (state: { legislations: any }) =>
    baseSelector(state).editLegislationRecord,
  attachmentPaginationInfo: (state: { legislations: any }) =>
    baseSelector(state).attachmentPaginationInfo,
  bulkLegislationRecord: (state: {legislations:any}) =>
    baseSelector(state).bulkLegislationRecord,
};
