import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  agency: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_AGENCY_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    agency: payload.payload
  })
});
