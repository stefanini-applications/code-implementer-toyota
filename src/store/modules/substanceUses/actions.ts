import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import {
  IGetSubstanceUsesSearch,
  INewSubstanceUses,
  IEditSubstanceUses
} from './types';

export const actionsTypes = {
  LIST_USES_REQUEST: '@uses/LIST_USES_REQUEST',
  LIST_USES_SUCCESS: '@uses/LIST_USES_SUCCESS',
  LIST_USES_FAILURE: '@uses/LIST_USES_FAILURE',
  DELETE_SUB_USES_REQUEST: '@uses/DELETE_SUB_USES_REQUEST',
  DELETE_SUB_USES_SUCCESS: '@uses/DELETE_SUB_USES_SUCCESS',
  DELETE_SUB_USES_FAILURE: '@uses/DELETE_SUB_USES_FAILURE',
  LIST_SEARCH_USES_REQUEST: '@uses/LIST_SEARCH_USES_REQUEST',
  LIST_SEARCH_USES_SUCCESS: '@uses/LIST_SEARCH_USES_SUCCESS',
  LIST_SEARCH_USES_FAILURE: '@uses/LIST_SEARCH_USES_FAILURE',
  CREATE_SUBSTANCE_USES_REQUEST: '@uses/CREATE_SUBSTANCE_USES_REQUEST',
  CREATE_SUBSTANCE_USES_SUCCESS: '@uses/CREATE_SUBSTANCE_USES_SUCCESS',
  CREATE_SUBSTANCE_USES_FAILURE: '@uses/CREATE_SUBSTANCE_USES_FAILURE',
  EDIT_SUBSTANCE_USES_REQUEST: '@uses/EDIT_SUBSTANCE_USES_REQUEST',
  EDIT_SUBSTANCE_USES_SUCCESS: '@uses/EDIT_SUBSTANCE_USES_SUCCESS',
  EDIT_SUBSTANCE_USES_FAILURE: '@uses/EDIT_SUBSTANCE_USES_FAILURE',
  SUBSTANCE_USES_PAGINATION_INFO: '@uses/SUBSTANCE_USES_PAGINATION_INFO'
};

const baseSelector = (state: { substanceUses: any }) => state.substanceUses;

export function getSubstancesUsesRequest() {
  return { type: actionsTypes.LIST_USES_REQUEST };
}

export function getSubstancesUsesSuccess(substances: any) {
  return {
    type: actionsTypes.LIST_USES_SUCCESS,
    payload: substances
  };
}

export function getSubstancesUsesFailure() {
  return { type: actionsTypes.LIST_USES_FAILURE };
}

export function deleteSubstancesUsesRequest(data: Array<number>) {
  return {
    type: actionsTypes.DELETE_SUB_USES_REQUEST,
    payload: data
  };
}

export function deleteSubstancesUsesSuccess() {
  ToastSuccess(translate('pages.substances.toastSuccessDeleteSubstanceUses'));
  return {
    type: actionsTypes.DELETE_SUB_USES_SUCCESS
  };
}

export function deleteSubstancesUsesFailure() {
  return { type: actionsTypes.DELETE_SUB_USES_FAILURE };
}

export function getSearchSubstancesUsesRequest(data: IGetSubstanceUsesSearch) {
  return {
    type: actionsTypes.LIST_SEARCH_USES_REQUEST,
    payload: data
  };
}

export function getSearchSubstancesUsesSuccess(
  searchSubstancesUsesResults: any
) {
  return {
    type: actionsTypes.LIST_SEARCH_USES_SUCCESS,
    payload: searchSubstancesUsesResults
  };
}

export function getSearchSubstancesUsesFailure() {
  return { type: actionsTypes.LIST_SEARCH_USES_FAILURE };
}

export function createSubstanceUsesRequest(newSubUses: INewSubstanceUses) {
  return {
    type: actionsTypes.CREATE_SUBSTANCE_USES_REQUEST,
    payload: newSubUses
  };
}

export function createSubstanceUsesSuccess() {
  ToastSuccess(translate('pages.substances.toastSuccessNewSubstancesUses'));
  return {
    type: actionsTypes.CREATE_SUBSTANCE_USES_SUCCESS
  };
}

export function createSubstanceUsesFailure() {
  return { type: actionsTypes.CREATE_SUBSTANCE_USES_FAILURE };
}

export function editSubstanceUsesRequest(editSubUses: IEditSubstanceUses) {
  return {
    type: actionsTypes.EDIT_SUBSTANCE_USES_REQUEST,
    payload: editSubUses
  };
}

export function editSubstanceUsesSuccess() {
  ToastSuccess(translate('pages.substances.toastSuccessEditSubstancesUses'));
  return {
    type: actionsTypes.EDIT_SUBSTANCE_USES_SUCCESS
  };
}

export function editSubstanceUsesFailure() {
  return { type: actionsTypes.EDIT_SUBSTANCE_USES_FAILURE };
}

export function getSubstanceUsesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.SUBSTANCE_USES_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export const selectors = {
  substanceUses: (state: { substanceUses: any }) =>
    baseSelector(state).substanceUses?.data?.message,
  substanceUsesPaginationInfo: (state: { substanceUses: any }) =>
    baseSelector(state).substanceUsesPaginationInfo
};
