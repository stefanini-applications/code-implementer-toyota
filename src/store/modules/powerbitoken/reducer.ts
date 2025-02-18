import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  powerbitoken: [],
  heatmapToken: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.POWER_BI_TOKEN_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    powerbitoken: payload.payload
  }),
  [actionsTypes.HEATMAP_TOKEN_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    heatmapToken: payload.payload
  })
});
