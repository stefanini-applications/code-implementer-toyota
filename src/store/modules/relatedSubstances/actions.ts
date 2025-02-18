import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import {
  IGetRelatedSubstances,
  ICreateRelatedSubstance,
  IDeleteRelatedSubstance,
} from './types';

export const actionsTypes = {
  LIST_RELATED_SUBSTANCES_REQUEST:
    '@relatedSubstances/LIST_RELATED_SUBSTANCES_REQUEST',
  LIST_RELATED_SUBSTANCES_SUCCESS:
    '@relatedSubstances/LIST_RELATED_SUBSTANCES_SUCCESS',
  LIST_RELATED_SUBSTANCES_FAILURE:
    '@relatedSubstances/LIST_RELATED_SUBSTANCES_FAILURE',
  RELATED_SUBSTANCES_PAGINATION_INFO:
    '@relatedSubstances/RELATED_SUBSTANCES_PAGINATION_INFO',
  CREATE_RELATED_SUBSTANCES_REQUEST:
    '@relatedSubstances/CREATE_RELATED_SUBSTANCE_REQUEST',
  CREATE_RELATED_SUBSTANCE_SUCCESS:
    '@relatedSubstances/CREATE_RELATED_SUBSTANCE_SUCCESS',
  CREATE_RELATED_SUBSTANCE_FAILURE:
    '@relatedSubstances/CREATE_RELATED_SUBSTANCE_FAILURE',
  DELETE_RELATED_SUBSTANCES_REQUEST:
    '@relatedSubstances/DELETE_RELATED_SUBSTANCE_REQUEST',
  DELETE_RELATED_SUBSTANCE_SUCCESS:
    '@relatedSubstances/DELETE_RELATED_SUBSTANCE_SUCCESS',
  DELETE_RELATED_SUBSTANCE_FAILURE:
    '@relatedSubstances/DELETE_RELATED_SUBSTANCE_FAILURE',
  EDIT_RELATED_SUBSTANCE_REQUEST:
    '@relatedSubstances/EDIT_RELATED_SUBSTANCE_REQUEST',
  EDIT_RELATED_SUBSTANCE_SUCCESS:
    '@relatedSubstances/EDIT_RELATED_SUBSTANCE_SUCCESS',
  EDIT_RELATED_SUBSTANCE_FAILURE:
    '@relatedSubstances/EDIT_RELATED_SUBSTANCE_FAILURE',
  CLEAR_RELATED_SUBSTANCES:
    '@relatedSubstances/CLEAR_RELATED_SUBSTANCES',
};

const baseSelector = (state: { relatedSubstances: any }) =>
  state.relatedSubstances;

export function getRelatedSubstancesRequest(data: IGetRelatedSubstances) {
  return {
    type: actionsTypes.LIST_RELATED_SUBSTANCES_REQUEST,
    payload: data
  };
}

export function getRelatedSubstancesSuccess(relatedSubstances: any) {
  return {
    type: actionsTypes.LIST_RELATED_SUBSTANCES_SUCCESS,
    payload: relatedSubstances
  };
}

export function getRelatedSubstancesFailure() {
  return { type: actionsTypes.LIST_RELATED_SUBSTANCES_FAILURE };
}

export function getRelatedSubstancesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.RELATED_SUBSTANCES_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function createRelatedSubstancesRequest(data: ICreateRelatedSubstance) {
  return {
    type: actionsTypes.CREATE_RELATED_SUBSTANCES_REQUEST,
    payload: data
  };
}

export function createRelatedSubstancesSuccess(newRelatedSubstance: any) {
  return {
    type: actionsTypes.CREATE_RELATED_SUBSTANCE_SUCCESS,
    payload: newRelatedSubstance
  };
}

export function createRelatedSubstancesFailure() {
  return { type: actionsTypes.CREATE_RELATED_SUBSTANCE_FAILURE };
}

export function deleteRelatedSubstancesRequest(data: IDeleteRelatedSubstance) {
  return {
    type: actionsTypes.DELETE_RELATED_SUBSTANCES_REQUEST,
    payload: data
  };
}

export function deleteRelatedSubstancesSuccess(newRelatedSubstance: any) {
  ToastSuccess(translate('pages.substances.toastSuccessDeleteSubstances'));
  return {
    type: actionsTypes.DELETE_RELATED_SUBSTANCE_SUCCESS,
    payload: newRelatedSubstance
  };
}

export function deleteRelatedSubstancesFailure(error) {
  return { type: actionsTypes.DELETE_RELATED_SUBSTANCE_FAILURE };
}

export function editRelatedSubstancesRequest(data: ICreateRelatedSubstance) {
  return {
    type: actionsTypes.EDIT_RELATED_SUBSTANCE_REQUEST,
    payload: data
  };
}

export function editRelatedSubstancesSuccess(newRelatedSubstance: any) {
  return {
    type: actionsTypes.EDIT_RELATED_SUBSTANCE_SUCCESS,
    payload: newRelatedSubstance
  };
}

export function editRelatedSubstancesFailure() {
  return { type: actionsTypes.EDIT_RELATED_SUBSTANCE_FAILURE };
}

export function clearRelatedSubstances() {
  return {
    type: actionsTypes.CLEAR_RELATED_SUBSTANCES
  };
}

export const selectors = {
  newRelatedSubstance: (state: { relatedSubstances: any }) =>
    baseSelector(state).newRelatedSubstance,
  relatedSubstances: (state: { relatedSubstances: any }) =>
    baseSelector(state).relatedSubstances,
  relatedSubstancesPaginationInfo: (state: { relatedSubstances: any }) =>
    baseSelector(state).relatedSubstancesPaginationInfo
};
