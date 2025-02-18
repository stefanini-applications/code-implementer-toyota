import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  priorityReport: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_PRIORITY_REPORT_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    priorityReport: payload.payload
  }),
  [actionsTypes.PRIORITY_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    priorityPaginationInfo: payload.payload
  }),
  [actionsTypes.GET_PRIORITY_REPORT_TABS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    priorityReportTabs: payload.payload
  }),
});
