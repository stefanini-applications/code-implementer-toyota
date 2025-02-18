import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';
import { SearchKeys } from './types';

const INITIAL_STATE = {
  searchResults: [],
  atributeSearchKeyDownResults: [],
  searchKeyDownResults: [],
  searchResultsPaginationInfo: [],
  searchKeyDownResultsPaginationInfo: [],
  searchTabInfo: {
    tabId: 0,
    searchKeys: undefined
  }
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_SEARCH_RESULTS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchResults: payload.payload
  }),
  [actionsTypes.LOCATE_SEARCH_KEY_DOWN_RESULTS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    atributeSearchKeyDownResults: payload.payload
  }),
  [actionsTypes.LIST_SEARCH_KEY_DOWN_RESULTS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchKeyDownResults: payload.payload
  }),
  [actionsTypes.SEARCH_RESULTS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchResultsPaginationInfo: payload.payload
  }),
  [actionsTypes.SEARCH_KEY_DOWN_RESULTS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchKeyDownResultsPaginationInfo: payload.payload
  }),
  [actionsTypes.SET_SEARCH_TAB_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchTabInfo: payload.payload
  })
});
