import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  substanceExecSummary: null,
  execReport: null
};
export default createReducer(INITIAL_STATE, {
  [actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    substanceExecSummary: payload.payload
  }),
  [actionsTypes.POST_EXEC_REPORT_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    execReport: payload.payload
  })
});
