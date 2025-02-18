import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import {
  INewRegulatoryUpdate,
  IEditRegulatoryUpdate,
  IGetRegulatoryUpdateSubstance,
  IGetRegulatoryUpdateClass,
  IGetRegulatoryUpdates
} from './types';

export const actionsTypes = {
  LIST_REGULATORY_UPDATES_BY_SUBSTANCE_REQUEST:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_BY_SUBSTANCE_REQUEST',
  LIST_REGULATORY_UPDATES_BY_SUBSTANCE_SUCCESS:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_BY_SUBSTANCE_SUCCESS',
  LIST_REGULATORY_UPDATES_BY_SUBSTANCE_FAILURE:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_BY_SUBSTANCE_FAILURE',
  REGULATORY_UPDATES_PAGINATION_INFO:
    '@regulatoryUpdates/REGULATORY_UPDATES_PAGINATION_INFO',
  REGULATORY_UPDATES_BY_SUBSTANCE_PAGINATION_INFO:
    '@regulatoryUpdates/REGULATORY_UPDATES_BY_SUBSTANCE_PAGINATION_INFO',
  LIST_REGULATORY_UPDATES_REQUEST:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_REQUEST',
  LIST_REGULATORY_UPDATES_SUCCESS:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_SUCCESS',
  LIST_REGULATORY_UPDATES_FAILURE:
    '@regulatoryUpdates/LIST_REGULATORY_UPDATES_FAILURE',
  CREATE_REGULATORY_UPDATES_RECORD_REQUEST:
    '@regulatoryUpdates/CREATE_REGULATORY_UPDATES_RECORD_REQUEST',
  CREATE_REGULATORY_UPDATES_RECORD_SUCCESS:
    '@regulatoryUpdates/CREATE_REGULATORY_UPDATES_RECORD_SUCCESS',
  CREATE_REGULATORY_UPDATES_RECORD_FAILURE:
    '@regulatoryUpdates/CREATE_REGULATORY_UPDATES_RECORD_FAILURE',
  EDIT_REGULATORY_UPDATES_RECORD_REQUEST:
    '@regulatoryUpdates/EDIT_REGULATORY_UPDATES_RECORD_REQUEST',
  EDIT_REGULATORY_UPDATES_RECORD_SUCCESS:
    '@regulatoryUpdates/EDIT_REGULATORY_UPDATES_RECORD_SUCCESS',
  EDIT_REGULATORY_UPDATES_RECORD_FAILURE:
    '@regulatoryUpdates/EDIT_REGULATORY_UPDATES_RECORD_FAILURE',
  ATTACHMENT_REGULATORY_UPDATES_REQUEST:
    '@regulatoryUpdates/ATTACHMENT_REGULATORY_UPDATES_REQUEST',
  ATTACHMENT_REGULATORY_UPDATES_SUCCESS:
    '@regulatoryUpdates/ATTACHMENT_REGULATORY_UPDATES_SUCCESS',
  ATTACHMENT_REGULATORY_UPDATES_FAILURE:
    '@regulatoryUpdates/ATTACHMENT_REGULATORY_UPDATES_FAILURE',
  DELETE_REGULATORY_UPDATES_RECORD_REQUEST:
    '@regulatoryUpdates/DELETE_REGULATORY_UPDATES_RECORD_REQUEST',
  DELETE_REGULATORY_UPDATES_RECORD_SUCCESS:
    '@regulatoryUpdates/DELETE_REGULATORY_UPDATES_RECORD_SUCCESS',
  DELETE_REGULATORY_UPDATES_RECORD_FAILURE:
    '@regulatoryUpdates/DELETE_REGULATORY_UPDATES_RECORD_FAILURE'
};

const baseSelector = (state: { regulatoryUpdates: any }) =>
  state.regulatoryUpdates;

export function getRegulatoryUpdatesRecordsRequest(
  data: IGetRegulatoryUpdates
) {
  return { type: actionsTypes.LIST_REGULATORY_UPDATES_REQUEST, payload: data };
}

export function getRegulatoryUpdatesRecordsSuccess(
  regulatoryUpdatesRecords: any
) {
  return {
    type: actionsTypes.LIST_REGULATORY_UPDATES_SUCCESS,
    payload: regulatoryUpdatesRecords
  };
}

export function getRegulatoryUpdatesRecordsFailure() {
  return { type: actionsTypes.LIST_REGULATORY_UPDATES_FAILURE };
}

export function getRegulatoryUpdatesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.REGULATORY_UPDATES_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getRegulatoryUpdatesBySubstanceRequest(
  data: IGetRegulatoryUpdateSubstance
) {
  return {
    type: actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_REQUEST,
    payload: data
  };
}

export function getRegulatoryUpdatesBySubstanceSuccess(
  regulatoryUpdatesSubstance: any
) {
  return {
    type: actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_SUCCESS,
    payload: regulatoryUpdatesSubstance
  };
}

export function getRegulatoryUpdatesBySubstanceFailure() {
  return { type: actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_FAILURE };
}

export function getRegulatoryUpdatesBySubstancePaginationInfo(
  paginationInfo: any
) {
  return {
    type: actionsTypes.REGULATORY_UPDATES_BY_SUBSTANCE_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function createRegulatoryUpdatesRecordRequest(
  newRecord: INewRegulatoryUpdate
) {
  return {
    type: actionsTypes.CREATE_REGULATORY_UPDATES_RECORD_REQUEST,
    payload: newRecord
  };
}

export function createRegulatoryUpdatesRecordSuccess() {
  ToastSuccess(translate('pages.regulatoryUpdates.toastSuccessNewRecord'));
  return {
    type: actionsTypes.CREATE_REGULATORY_UPDATES_RECORD_SUCCESS
  };
}

export function createRegulatoryUpdatesRecordFailure() {
  return { type: actionsTypes.CREATE_REGULATORY_UPDATES_RECORD_FAILURE };
}

export function editRegulatoryUpdatesRecordRequest(
  editRecord: IEditRegulatoryUpdate
) {
  return {
    type: actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_REQUEST,
    payload: editRecord
  };
}

export function editRegulatoryUpdatesRecordSuccess() {
  ToastSuccess(translate('pages.regulatoryUpdates.toastSuccessEditRecord'));
  return {
    type: actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_SUCCESS
  };
}

export function editRegulatoryUpdatesRecordFailure() {
  return { type: actionsTypes.EDIT_REGULATORY_UPDATES_RECORD_FAILURE };
}

export function attachmentModalRegulatoryUpdatesSuccess(
  regulatoryUpdatesAttachedFiles: any
) {
  return {
    type: actionsTypes.ATTACHMENT_REGULATORY_UPDATES_SUCCESS,
    payload: regulatoryUpdatesAttachedFiles
  };
}

export function attachmentModalRegulatoryUpdatesFailure() {
  return { type: actionsTypes.ATTACHMENT_REGULATORY_UPDATES_FAILURE };
}

export function deleteRegulatoryUpdatesRecordRequest(payload) {
  return {
    type: actionsTypes.DELETE_REGULATORY_UPDATES_RECORD_REQUEST,
    payload
  };
}

export function deleteRegulatoryUpdatesRecordSuccess() {
  ToastSuccess(translate('pages.regulatoryUpdates.toastSuccessDeleteRecord'));
  return {
    type: actionsTypes.DELETE_REGULATORY_UPDATES_RECORD_SUCCESS
  };
}

export function deleteRegulatoryUpdatesRecordFailure() {
  return { type: actionsTypes.DELETE_REGULATORY_UPDATES_RECORD_FAILURE };
}

export const selectors = {
  regulatoryUpdatesRecords: (state: { regulatoryUpdates: any }) =>
    baseSelector(state).regulatoryUpdatesRecords?.data?.message,
  regulatoryUpdatesSubstancePaginationInfo: (state: {
    regulatoryUpdates: any;
  }) => baseSelector(state).regulatoryUpdatesSubstancePaginationInfo,
  regulatoryUpdatesPaginationInfo: (state: { regulatoryUpdates: any }) =>
    baseSelector(state).regulatoryUpdatesPaginationInfo,
  regulatoryUpdatesAttachedFiles: (state: { regulatoryUpdates: any }) =>
    baseSelector(state).regulatoryUpdatesAttachedFiles
};
