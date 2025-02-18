import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  LIST_SEARCH_BAR_RESULTS_REQUEST: '@searchBar/LIST_SEARCH_BAR_RESULTS_REQUEST',
  LIST_SEARCH_BAR_RESULTS_SUCCESS: '@searchBar/LIST_SEARCH_BAR_RESULTS_SUCCESS',
  LIST_SEARCH_BAR_RESULTS_FAILURE: '@searchBar/LIST_SEARCH_BAR_RESULTS_FAILURE'
};

const baseSelector = (state: { searchBar: any }) => state.searchBar;

export function getSearchBarResultsRequest(searchText: string) {
  return { type: actionsTypes.LIST_SEARCH_BAR_RESULTS_REQUEST, searchText };
}

export function getSearchBarResultsSuccess(searchBarResults: any) {
  return {
    type: actionsTypes.LIST_SEARCH_BAR_RESULTS_SUCCESS,
    payload: searchBarResults
  };
}

export function getSearchBarResultsFailure() {
  return { type: actionsTypes.LIST_SEARCH_BAR_RESULTS_FAILURE };
}

export const selectors = {
  searchBarResults: (state: { searchBar: any }) =>
    baseSelector(state).searchBarResults
};
