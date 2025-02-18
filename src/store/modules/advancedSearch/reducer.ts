import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  filteredRecordsAdSearch: [],
  advancedSearchResultsPaginationInfo: [],
  dateRangeValues: {},
  values: {}
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_FILTERED_RECORDS_AD_SEARCH_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    filteredRecordsAdSearch: payload.payload?.data?.message
  }),
  [actionsTypes.ADVANCED_SEARCH_RESULTS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    advancedSearchResultsPaginationInfo: payload.payload
  }),
  [actionsTypes.SET_DATE_RANGE_VALUES]: (state = INITIAL_STATE, payload) => ({
    ...state,
    dateRangeValues: payload.payload
  }),
  [actionsTypes.SET_VALUES]: (state = INITIAL_STATE, payload) => ({
    ...state,
    values: payload.payload
  })
});
