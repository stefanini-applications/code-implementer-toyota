import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  LIST_ALL_REGULATIONS_REQUEST: '@dropdown/LIST_ALL_REGULATIONS_REQUEST',
  LIST_ALL_REGULATIONS_SUCCESS: '@dropdown/LIST_ALL_REGULATIONS_SUCCESS',
  LIST_ALL_REGULATIONS_FAILURE: '@dropdown/LIST_ALL_REGULATIONS_FAILURE',
  LIST_REGULATIONS_SUBSTANCE_REQUEST:
    '@dropdown/LIST_REGULATIONS_SUBSTANCE_REQUEST',
  LIST_REGULATIONS_SUBSTANCE_SUCCESS:
    '@dropdown/LIST_REGULATIONS_SUBSTANCE_SUCCESS',
  LIST_REGULATIONS_SUBSTANCE_FAILURE:
    '@dropdown/LIST_REGULATIONS_SUBSTANCE_FAILURE',
  LIST_RELATED_SUBSTANCE_REQUEST: '@dropdown/LIST_RELATED_SUBSTANCE_REQUEST',
  LIST_RELATED_SUBSTANCE_SUCCESS: '@dropdown/LIST_RELATED_SUBSTANCE_SUCCESS',
  LIST_RELATED_SUBSTANCE_FAILURE: '@dropdown/LIST_RELATED_SUBSTANCE_FAILURE',
  LIST_UPDATES_RELATED_SUBSTANCE_REQUEST:
    '@dropdown/LIST_UPDATES_RELATED_SUBSTANCE_REQUEST',
  LIST_UPDATES_RELATED_SUBSTANCE_SUCCESS:
    '@dropdown/LIST_UPDATES_RELATED_SUBSTANCE_SUCCESS',
  LIST_UPDATES_RELATED_SUBSTANCE_FAILURE:
    '@dropdown/LIST_UPDATES_RELATED_SUBSTANCE_FAILURE',
  LIST_ALL_LISTINGS_REQUEST: '@dropdown/LIST_ALL_LISTINGS_REQUEST',
  LIST_ALL_LISTINGS_SUCCESS: '@dropdown/LIST_ALL_LISTINGS_SUCCESS',
  LIST_ALL_LISTINGS_FAILURE: '@dropdown/LIST_ALL_LISTINGS_FAILURE'
};

const baseSelector = (state: { dropdown: any }) => state.dropdown;

export function getRegulationsRequest() {
  return { type: actionsTypes.LIST_ALL_REGULATIONS_REQUEST };
}

export function getRegulationsSuccess(dropdownValues: any) {
  return {
    type: actionsTypes.LIST_ALL_REGULATIONS_SUCCESS,
    payload: dropdownValues
  };
}

export function getRegulationsFailure() {
  return { type: actionsTypes.LIST_REGULATIONS_SUBSTANCE_FAILURE };
}

export function getRegulationsSubstanceRequest(substanceId: any) {
  return { type: actionsTypes.LIST_REGULATIONS_SUBSTANCE_REQUEST, substanceId };
}

export function getRegulationsSubstanceSuccess(
  dropDownRegulationSubstance: any
) {
  return {
    type: actionsTypes.LIST_REGULATIONS_SUBSTANCE_SUCCESS,
    payload: dropDownRegulationSubstance
  };
}

export function getRegulationsSubstanceFailure() {
  return { type: actionsTypes.LIST_REGULATIONS_SUBSTANCE_FAILURE };
}

export function getRelatedSubstanceRequest(regulationId: any) {
  return { type: actionsTypes.LIST_RELATED_SUBSTANCE_REQUEST, regulationId };
}

export function getRelatedSubstanceSuccess(dropDownRelatedSubstance: any) {
  return {
    type: actionsTypes.LIST_RELATED_SUBSTANCE_SUCCESS,
    payload: dropDownRelatedSubstance
  };
}

export function getRelatedSubstanceFailure() {
  return { type: actionsTypes.LIST_RELATED_SUBSTANCE_FAILURE };
}

export function getUpdatesRelatedSubstanceRequest(regulationId: any) {
  return {
    type: actionsTypes.LIST_UPDATES_RELATED_SUBSTANCE_REQUEST,
    regulationId
  };
}

export function getUpdatesRelatedSubstanceSuccess(
  dropDownUpdatesRelatedSubstance: any
) {
  return {
    type: actionsTypes.LIST_UPDATES_RELATED_SUBSTANCE_SUCCESS,
    payload: dropDownUpdatesRelatedSubstance
  };
}

export function getUpdatesRelatedSubstanceFailure() {
  return { type: actionsTypes.LIST_UPDATES_RELATED_SUBSTANCE_FAILURE };
}

export function getListingsRequest(payload) {
  return {
    type: actionsTypes.LIST_ALL_LISTINGS_REQUEST,
    payload
  };
}

export function getListingsSuccess(dropDownListings: any) {
  return {
    type: actionsTypes.LIST_ALL_LISTINGS_SUCCESS,
    payload: dropDownListings
  };
}

export function getListingsFailure() {
  return { type: actionsTypes.LIST_ALL_LISTINGS_FAILURE };
}

export const selectors = {
  dropdownValues: (state: { dropdown: any }) =>
    baseSelector(state).dropdownValues?.data?.message,
  dropDownRegulationSubstance: (state: { dropdown: any }) =>
    baseSelector(state).dropDownRegulationSubstance?.data?.message,
  dropDownRelatedSubstance: (state: { dropdown: any }) =>
    baseSelector(state).dropDownRelatedSubstance?.data?.message,
  dropDownUpdatesRelatedSubstance: (state: { dropdown: any }) =>
    baseSelector(state).dropDownUpdatesRelatedSubstance?.data?.message,
  dropDownListings: (state: { dropdown: any }) =>
    baseSelector(state).dropDownListings?.data?.message
};
