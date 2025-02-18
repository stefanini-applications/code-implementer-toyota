import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetSearchResults } from '../searchResults/types';

export const actionsTypes = {
  GET_LINKED_LEGISLATIONS_PAGINATION_INFO: '@regulations/GET_LINKED_LEGISLATIONS_PAGINATION_INFO',
  LIST_LINKED_LEGISLATIONS_REQUEST: '@regulations/LIST_LINKED_LEGISLATIONS_REQUEST',
  LIST_LINKED_LEGISLATIONS_SUCCESS: '@regulations/LIST_LINKED_LEGISLATIONS_SUCCESS',
  LIST_LINKED_LEGISLATIONS_FAILURE: '@regulations/LIST_LINKED_LEGISLATIONS_FAILURE',
  CREATE_LINKED_LEGISLATIONS_REQUEST:
    '@regulations/CREATE_LINKED_LEGISLATIONS_REQUEST',
  CREATE_LINKED_LEGISLATIONS_SUCCESS:
    '@regulations/CREATE_LINKED_LEGISLATIONS_SUCCESS',
  CREATE_LINKED_LEGISLATIONS_FAILURE:
    '@regulations/CREATE_LINKED_LEGISLATIONS_FAILURE',
  DELETE_LINKED_LEGISLATIONS_REQUEST:
    '@regulations/DELETE_LINKED_LEGISLATIONS_REQUEST',
  DELETE_LINKED_LEGISLATIONS_SUCCESS:
    '@regulations/DELETE_LINKED_LEGISLATIONS_SUCCESS',
  DELETE_LINKED_LEGISLATIONS_FAILURE:
    '@regulations/DELETE_LINKED_LEGISLATIONS_FAILURE',
};

const baseSelector = (state: { linkedLegislations: any }) => state.linkedLegislations;

export function getLinkedLegislationsRequest(payload: any) {
  return { type: actionsTypes.LIST_LINKED_LEGISLATIONS_REQUEST, payload };
}

export function getLinkedLegislationsSuccess(LinkedLegislations: any) {
  return {
    type: actionsTypes.LIST_LINKED_LEGISLATIONS_SUCCESS,
    payload: LinkedLegislations
  };
}

export function getLinkedLegislationsFailure() {
  return { type: actionsTypes.LIST_LINKED_LEGISLATIONS_FAILURE };
}

export function createLinkedLegislationsRequest(newRecord: any) {
  return {
    type: actionsTypes.CREATE_LINKED_LEGISLATIONS_REQUEST,
    payload: newRecord
  };
}

export function createLinkedLegislationsSuccess(newLinkedLegislations: any) {
  ToastSuccess('Items successfully linked');
  return {
    type: actionsTypes.CREATE_LINKED_LEGISLATIONS_SUCCESS,
    payload: newLinkedLegislations
  };
}

export function createLinkedLegislationsFailure() {
  return { type: actionsTypes.CREATE_LINKED_LEGISLATIONS_FAILURE };
}

export function deleteLinkedLegislationsRequest(payload) {
  return {
    type: actionsTypes.DELETE_LINKED_LEGISLATIONS_REQUEST,
    payload
  };
}

export function deleteLinkedLegislationsSuccess() {
  ToastSuccess('The item has been successfully unlinked');
  return {
    type: actionsTypes.DELETE_LINKED_LEGISLATIONS_SUCCESS
  };
}

export function deleteLinkedLegislationsFailure(error: any) {
  ToastError('An error occurred while trying to unlink the item. Please try again.');
  return { type: actionsTypes.DELETE_LINKED_LEGISLATIONS_FAILURE };
}

export function getLinkedLegislationsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.GET_LINKED_LEGISLATIONS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export const selectors = {
  linkedLegislations: (state: { linkedLegislations: any }) =>
    baseSelector(state).linkedLegislations?.data?.message,
  linkedLegislationsPaginationInfo: (state: { linkedLegislations: any }) =>
    baseSelector(state).linkedLegislationsPaginationInfo,
};
