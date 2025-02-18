import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  priorityRankSubstance: [],
  updatesSubstance: [],
  updatesRegulation: [],
  updatesPaginationInfo: [],
  priorityRankPaginationInfo: [],
  recentlyView: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.UPDATES_REGULATION_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    updatesRegulation: payload.payload
  }),
  [actionsTypes.UPDATES_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    updatesSubstance: payload.payload
  }),
  [actionsTypes.UPDATES_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    updatesPaginationInfo: payload.payload
  }),
  [actionsTypes.PRIORITY_RANK_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    priorityRankPaginationInfo: payload.payload
  }),
  [actionsTypes.CLEAR_UPDATES_REGULATION]: (state) => ({
    ...state,
    updatesRegulation: [],
  }),
  [actionsTypes.RECENTLY_VIEW_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    recentlyView: payload.payload
  }),
});
