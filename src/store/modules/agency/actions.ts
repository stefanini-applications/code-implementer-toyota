import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  GET_AGENCY_REQUEST: '@agency/GET_AGENCY_REQUEST',
  GET_AGENCY_SUCCESS: '@agency/GET_AGENCY_SUCCESS',
  GET_AGENCY_FAILURE: '@agency/GET_AGENCY_FAILURE',
  CREATE_AGENCY_REQUEST: '@agency/CREATE_AGENCY_REQUEST',
  CREATE_AGENCY_SUCCESS: '@agency/CREATE_AGENCY_SUCCESS',
  CREATE_AGENCY_FAILURE: '@agency/CREATE_AGENCY_FAILURE',
  DELETE_AGENCY_REQUEST: '@agency/DELETE_AGENCY_REQUEST',
  DELETE_AGENCY_SUCCESS: '@agency/DELETE_AGENCY_SUCCESS',
  DELETE_AGENCY_FAILURE: '@agency/DELETE_AGENCY_FAILURE'
};

const baseSelector = (state: { agency: any }) => state.agency;

export function getAgencyRequest(payload) {
  return { type: actionsTypes.GET_AGENCY_REQUEST, payload };
}

export function getAgencySuccess(agency: any) {
  return {
    type: actionsTypes.GET_AGENCY_SUCCESS,
    payload: agency
  };
}

export function getAgencyFailure() {
  return { type: actionsTypes.GET_AGENCY_FAILURE };
}

export function createAgencyRequest(payload: any) {
  return {
    type: actionsTypes.CREATE_AGENCY_REQUEST,
    payload
  };
}

export function createAgencySuccess(payload: any) {
  ToastSuccess(translate('pages.agency.toastSuccessNewRecord'));
  return {
    type: actionsTypes.CREATE_AGENCY_SUCCESS,
    payload
  };
}

export function createAgencyFailure() {
  return { type: actionsTypes.CREATE_AGENCY_FAILURE };
}

export function createAgencyDuplicateFailure() {
  return { type: actionsTypes.CREATE_AGENCY_FAILURE };
}

export function deleteAgencyRequest(data: any) {
  return {
    type: actionsTypes.DELETE_AGENCY_REQUEST,
    payload: data
  };
}

export function deleteAgencySuccess(payload: any) {
  return {
    type: actionsTypes.DELETE_AGENCY_SUCCESS,
    payload
  };
}

export function deleteAgencyFailure() {
  return { type: actionsTypes.DELETE_AGENCY_FAILURE };
}

export const selectors = {
  agency: (state: { agency: any }) => baseSelector(state).agency
};
