import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  regulationReport: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.REGULATION_REPORT_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulationReport: payload.payload
  })
});
