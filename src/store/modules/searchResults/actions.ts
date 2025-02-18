import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetSearchResults, SearchTabInfo } from './types';

export const actionsTypes = {
  LIST_SEARCH_RESULTS_REQUEST: '@searchResults/LIST_SEARCH_RESULTS_REQUEST',
  LIST_SEARCH_RESULTS_SUCCESS: '@searchResults/LIST_SEARCH_RESULTS_SUCCESS',
  LIST_SEARCH_RESULTS_FAILURE: '@searchResults/LIST_SEARCH_RESULTS_FAILURE',
  SEARCH_RESULTS_PAGINATION_INFO:
    '@searchResults/SEARCH_RESULTS_PAGINATION_INFO',
  SEARCH_KEY_DOWN_RESULTS_PAGINATION_INFO:
    '@searchResults/SEARCH_KEY_DOWN_RESULTS_PAGINATION_INFO',
  LOCATE_SEARCH_KEY_DOWN_RESULTS:
    '@searchResults/LOCATE_SEARCH_KEY_DOWN_RESULTS',
  LIST_SEARCH_KEY_DOWN_RESULTS_REQUEST:
    '@searchResults/LIST_SEARCH_KEY_DOWN_RESULTS_REQUEST',
  LIST_SEARCH_KEY_DOWN_RESULTS_SUCCESS:
    '@searchResults/LIST_SEARCH_KEY_DOWN_RESULTS_SUCCESS',
  LIST_SEARCH_KEY_DOWN_RESULTS_FAILURE:
    '@searchResults/LIST_SEARCH_KEY_DOWN_RESULTS_FAILURE',
  SET_SEARCH_TAB_INFO: '@searchResults/SET_SEARCH_TAB_INFO'
};

const baseSelector = (state: { searchResults: any }) => state.searchResults;

export function getSearchResultsRequest(data: IGetSearchResults) {
  return { type: actionsTypes.LIST_SEARCH_RESULTS_REQUEST, payload: data };
}

export function getSearchResultsSuccess(searchResults: any) {
  return {
    type: actionsTypes.LIST_SEARCH_RESULTS_SUCCESS,
    payload: searchResults
  };
}

export function getSearchResultsFailure() {
  return { type: actionsTypes.LIST_SEARCH_RESULTS_FAILURE };
}

export function getSearchResultsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.SEARCH_RESULTS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function locateSearchKeyDownResultsRequest(
  atributeSearchKeyDownResults: any
) {
  return {
    type: actionsTypes.LOCATE_SEARCH_KEY_DOWN_RESULTS,
    payload: atributeSearchKeyDownResults
  };
}

export function getSearchKeyDownResultsRequest(data: IGetSearchResults) {
  return {
    type: actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_REQUEST,
    payload: data
  };
}

export function getSearchKeyDownResultsSuccess(searchKeyDownResults: any) {
  return {
    type: actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_SUCCESS,
    payload: searchKeyDownResults
  };
}

export function getSearchKeyDownResultsFailure() {
  return { type: actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_FAILURE };
}

export function getSearchKeyDownResultsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.SEARCH_KEY_DOWN_RESULTS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function setSearchTabInfo(searchTabInfo: SearchTabInfo) {
  return {
    type: actionsTypes.SET_SEARCH_TAB_INFO,
    payload: searchTabInfo
  };
}

export const selectors = {
  searchResults: (state: { searchResults: any }) =>
    baseSelector(state).searchResults?.data?.message,
  atributeSearchKeyDownResults: (state: { searchResults: any }) =>
    baseSelector(state).atributeSearchKeyDownResults,
  searchKeyDownResults: (state: { searchResults: any }) =>
    baseSelector(state).searchKeyDownResults?.data?.message,
  searchResultsPaginationInfo: (state: { searchResults: any }) =>
    baseSelector(state).searchResultsPaginationInfo,
  searchKeyDownResultsPaginationInfo: (state: { searchResults: any }) =>
    baseSelector(state).searchKeyDownResultsPaginationInfo,
  searchTabInfo: (state: { searchResults: any }) => baseSelector(state).searchTabInfo
};
