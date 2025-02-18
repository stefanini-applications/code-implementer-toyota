import { ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetFilteredRecordsAdSearch } from './types';

export const actionsTypes = {
  LIST_FILTERED_RECORDS_AD_SEARCH_REQUEST:
    '@advancedSearch/LIST_FILTERED_RECORDS_AD_SEARCH_REQUEST',
  LIST_FILTERED_RECORDS_AD_SEARCH_SUCCESS:
    '@advancedSearch/LIST_FILTERED_RECORDS_AD_SEARCH_SUCCESS',
  LIST_FILTERED_RECORDS_AD_SEARCH_FAILURE:
    '@advancedSearch/LIST_FILTERED_RECORDS_AD_SEARCH_FAILURE',
  ADVANCED_SEARCH_RESULTS_PAGINATION_INFO:
    '@advancedSearch/ADVANCED_SEARCH_RESULTS_PAGINATION_INFO',
  SET_DATE_RANGE_VALUES: '@advancedSearch/SET_DATE_RANGE_VALUES',
  SET_VALUES: '@advancedSearch/SET_VALUES'
};

const baseSelector = (state: { advancedSearch: any }) => state.advancedSearch;

export function getFilteredRecordsAdSearchRequest(
  data: IGetFilteredRecordsAdSearch
) {
  return {
    type: actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_REQUEST,
    payload: data
  };
}

export function getFilteredRecordsAdSearchSuccess(
  filteredRecordsAdSearch: any
) {
  return {
    type: actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_SUCCESS,
    payload: filteredRecordsAdSearch
  };
}

export function getFilteredRecordsAdSearchFailure() {
  return { type: actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_FAILURE };
}

export function setDateRangeValues(dateRangeValues: any) {
  return {
    type: actionsTypes.SET_DATE_RANGE_VALUES,
    payload: dateRangeValues
  };
}

export function setValues(values: any) {
  return {
    type: actionsTypes.SET_VALUES,
    payload: values
  };
}

export function getAdvancedSearchResultsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.ADVANCED_SEARCH_RESULTS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export const selectors = {
  filteredRecordsAdSearch: (state: { advancedSearch: any }) =>
    baseSelector(state).filteredRecordsAdSearch,
  advancedSearchResultsPaginationInfo: (state: { advancedSearch: any }) =>
    baseSelector(state).advancedSearchResultsPaginationInfo,
  dateRangeValues: (state: { advancedSearch: any }) =>
    baseSelector(state).dateRangeValues,
  values: (state: { advancedSearch: any }) => baseSelector(state).values
};
