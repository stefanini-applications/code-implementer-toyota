import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  alertDashboard: [],
  alertDashboardPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_ALERT_DASHBOARD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    alertDashboard: payload.payload
  }),
  [actionsTypes.ALERT_DASHBOARD_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    alertDashboardPagination: payload.payload
  }),
});
