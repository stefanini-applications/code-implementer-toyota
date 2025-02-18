import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  signed: false,
  failure: false,
  token: null
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.SIGN_IN_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    token: payload.payload,
    // signed: true,
    failure: false
  }),
  [actionsTypes.SIGN_IN_FAILURE]: (state = INITIAL_STATE) => ({
    ...state,
    failure: true
  }),
  [actionsTypes.SIGN_OUT]: state => ({ ...state, signed: false, userData: {} })
});
