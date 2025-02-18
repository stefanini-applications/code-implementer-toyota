import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetAgencyList } from './types';

export const actionsTypes = {
  GET_ITEMS_PER_PAGE_REQUEST: '@enumerators/GET_ITEMS_PER_PAGE_REQUEST',
  LIST_JURISDICTIONS_REQUEST: '@enumerators/LIST_JURISDICTIONS_REQUEST',
  LIST_JURISDICTIONS_SUCCESS: '@enumerators/LIST_JURISDICTIONS_SUCCESS',
  LIST_JURISDICTIONS_FAILURE: '@enumerators/LIST_JURISDICTIONS_FAILURE',
  LIST_AGENCY_REQUEST: '@enumerators/LIST_AGENCY_REQUEST',
  LIST_AGENCY_SUCCESS: '@enumerators/LIST_AGENCY_SUCCESS',
  LIST_AGENCY_FAILURE: '@enumerators/LIST_AGENCY_FAILURE'
};

const baseSelector = (state: { enumerators: any }) => state.enumerators;

export function getItemsPerPageRequest(itemsPerPage: {}) {
  return {
    type: actionsTypes.GET_ITEMS_PER_PAGE_REQUEST,
    payload: itemsPerPage
  };
}

export function getJurisdictionsRequest() {
  return {
    type: actionsTypes.LIST_JURISDICTIONS_REQUEST
  };
}

export function getJurisdictionsSuccess(jurisdictions: any) {
  return {
    type: actionsTypes.LIST_JURISDICTIONS_SUCCESS,
    payload: jurisdictions
  };
}

export function getJurisdictionsFailure() {
  return { type: actionsTypes.LIST_JURISDICTIONS_FAILURE };
}

export function getAgencyRequest(data: IGetAgencyList) {
  return { type: actionsTypes.LIST_AGENCY_REQUEST, payload: data };
}

export function getAgencySuccess(agency: any) {
  return {
    type: actionsTypes.LIST_AGENCY_SUCCESS,
    payload: agency
  };
}

export function getAgencyFailure() {
  return { type: actionsTypes.LIST_AGENCY_FAILURE };
}

export const selectors = {
  itemsPerPage: (state: { enumerators: any }) =>
    baseSelector(state).itemsPerPage,
  jurisdictions: (state: { enumerators: any }) =>
    baseSelector(state).jurisdictions,
  agency: (state: { enumerators: any }) => baseSelector(state).agency
};
