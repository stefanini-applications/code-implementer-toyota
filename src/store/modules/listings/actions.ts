import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IDeleteListings, IEditListings, IGetListings, IEditLists, IGetListsSearch, IDeleteGroup } from './types';

export const actionsTypes = {
  GET_LISTINGS_REQUEST: '@listings/GET_LISTINGS_REQUEST',
  GET_LISTINGS_SUCCESS: '@listings/GET_LISTINGS_SUCCESS',
  GET_LISTINGS_FAILURE: '@listings/GET_LISTINGS_FAILURE',  
  LISTINGS_PAGINATION_INFO: '@listings/LISTINGS_PAGINATION_INFO',
  EDIT_LISTINGS_REQUEST: '@listings/EDIT_LISTINGS_REQUEST',
  EDIT_LISTINGS_SUCCESS: '@listings/EDIT_LISTINGS_SUCCESS',
  EDIT_LISTINGS_FAILURE: '@listings/EDIT_LISTINGS_FAILURE',
  DELETE_LISTINGS_REQUEST: '@listings/DELETE_LISTINGS_REQUEST',
  DELETE_LISTINGS_SUCCESS: '@listings/DELETE_LISTINGS_SUCCESS',
  DELETE_LISTINGS_FAILURE: '@listings/DELETE_LISTINGS_FAILURE',
  GET_LISTINGS_SUBSTANCE_REQUEST: '@listings/GET_LISTINGS_SUBSTANCE_REQUEST',
  GET_LISTINGS_SUBSTANCE_SUCCESS: '@listings/GET_LISTINGS_SUBSTANCE_SUCCESS',
  GET_LISTINGS_SUBSTANCE_FAILURE: '@listings/GET_LISTINGS_SUBSTANCE_FAILURE',
  ATTACHMENT_LISTINGS_FAILURE: '@listings/ATTACHMENT_LISTINGS_FAILURE',
  ATTACHMENT_LISTINGS_READ_FAILURE: '@listings/ATTACHMENT_LISTINGS_READ_FAILURE',
  LISTINGS_COLUMNS_ERROR: '@listings/LISTINGS_COLUMNS_ERROR',
  EDIT_LISTINGS_UPLOAD_FAILURE: '@listings/EDIT_LISTINGS_UPLOAD_FAILURE',
  UPDATE_LISTS_REQUEST: '@listings/UPDATE_LISTS_REQUEST',
  UPDATE_LISTS_SUCCESS: '@listings/UPDATE_LISTS_SUCCESS',
  UPDATE_LISTS_FAILURE: '@listings/UPDATE_LISTS_FAILURE',
  LISTS_SEARCH_REQUEST: '@listings/LISTS_SEARCH_REQUEST',
  LISTS_SEARCH_SUCCESS: '@listings/LISTS_SEARCH_SUCCESS',
  LISTS_SEARCH_FAILURE: '@listings/LISTS_SEARCH_FAILURE',
  LISTS_PAGINATION_INFO: '@listings/LISTS_PAGINATION_INFO',
  DELETE_GROUP_REQUEST: '@groupTemplate/DELETE_GROUP_REQUEST',
  DELETE_GROUP_SUCCESS: '@groupTemplate/DELETE_GROUP_SUCCESS',
  DELETE_GROUP_FAILURE: '@groupTemplate/DELETE_GROUP_FAILURE'
};

const baseSelector = (state: { listings: any }) => state.listings;

export function getListingsRequest(payload: IGetListings) {
  return {
    type: actionsTypes.GET_LISTINGS_REQUEST,
    payload
  };
}

export function getListingsSuccess(listings: any) {
  return {
    type: actionsTypes.GET_LISTINGS_SUCCESS,
    payload: listings
  };
}

export function getListingsFailure() {
  return { type: actionsTypes.GET_LISTINGS_FAILURE };
}

export function getListingsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.LISTINGS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function editListingsRequest(payload: IEditListings) {
  return {
    type: actionsTypes.EDIT_LISTINGS_REQUEST,
    payload
  };
}

export function editListingsSuccess(listings: any) {
  ToastSuccess(translate('pages.listings.toastSuccessEditLists'));
  return {
    type: actionsTypes.EDIT_LISTINGS_SUCCESS,
    payload: listings
  };
}

export function editListingsFailure() {
  return { type: actionsTypes.EDIT_LISTINGS_FAILURE };
}

export function editListingsUploadFailure(payload: any) {
  return {
    type: actionsTypes.EDIT_LISTINGS_UPLOAD_FAILURE,
    payload
  };
}

export function deleteListingsRequest(payload: IDeleteListings) {
  return {
    type: actionsTypes.DELETE_LISTINGS_REQUEST,
    payload
  };
}

export function deleteListingsSuccess(listings: any) {
  return {
    type: actionsTypes.DELETE_LISTINGS_SUCCESS,
    payload: listings
  };
}

export function deleteListingsFailure() {
  return { type: actionsTypes.DELETE_LISTINGS_FAILURE };
}

export function getListingsSubstanceRequest(substanceId) {
  return {
    type: actionsTypes.GET_LISTINGS_SUBSTANCE_REQUEST,
    substanceId
  };
}

export function getListingsSubstanceSuccess(listingsSubstance: any) {
  return {
    type: actionsTypes.GET_LISTINGS_SUBSTANCE_SUCCESS,
    payload: listingsSubstance
  };
}

export function getListingsSubstanceFailure() {
  return { type: actionsTypes.GET_LISTINGS_SUBSTANCE_FAILURE };
}

export function attachmentListingsFailure() {
  return { type: actionsTypes.ATTACHMENT_LISTINGS_FAILURE };
}

export function attachmentListingsReadFailure() {
  return { type: actionsTypes.ATTACHMENT_LISTINGS_READ_FAILURE };
}

export function listingsColumnDoesNotMatchError() {
  return { type: actionsTypes.LISTINGS_COLUMNS_ERROR };
}

export function updateListsRequest(payload: IEditLists) {
  return {
    type: actionsTypes.UPDATE_LISTS_REQUEST,
    payload
  };
}

export function updateListsSuccess(lists: any) {
  ToastSuccess(translate('pages.listings.toastSuccessEditLists'));
  return {
    type: actionsTypes.UPDATE_LISTS_SUCCESS
  };
}

export function updateListsFailure() {
  return { type: actionsTypes.UPDATE_LISTS_FAILURE };
}

export function getSearchListsRequest(data: IGetListsSearch) {
  return {
    type: actionsTypes.LISTS_SEARCH_REQUEST,
    payload: data
  };
}

export function getSearchListsSuccess(
  searchListsResults: any
) {
  return {
    type: actionsTypes.LISTS_SEARCH_SUCCESS,
    payload: searchListsResults
  };
}

export function getSearchListsFailure() {
  return { type: actionsTypes.LISTS_SEARCH_FAILURE };
}

export function getListsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.LISTS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function deleteGroupRequest(data: IDeleteGroup) {
  return {
    type: actionsTypes.DELETE_GROUP_REQUEST,
    payload: data
  };
}

export function deleteGroupSuccess() {
  return { type: actionsTypes.DELETE_GROUP_SUCCESS };
}

export function deleteGroupFailure() {
  return { type: actionsTypes.DELETE_GROUP_FAILURE };
}

export const selectors = {
  listings: (state: { listings: any }) =>
    baseSelector(state).listings?.data?.message,
  listingsPaginationInfo: (state: { listings: any }) =>
    baseSelector(state).listingsPaginationInfo,    
  listingsSubstance: (state: { listings: any }) =>
    baseSelector(state).listingsSubstance?.data?.message,
  listingsUploadErrors: (state: { listings: any }) =>
    baseSelector(state).listingsUploadErrors?.data?.message,
  lists: (state: { listings: any }) =>
    baseSelector(state).lists?.data?.message,
  listsPaginationInfo: (state: { listings: any }) =>
    baseSelector(state).listsPaginationInfo
};
