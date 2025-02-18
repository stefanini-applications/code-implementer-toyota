import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  substanceUses: [],
  substanceUsesPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_USES_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    substanceUses: payload.payload
  }),
  [actionsTypes.LIST_SEARCH_USES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceUses: payload.payload
  }),
  [actionsTypes.SUBSTANCE_USES_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceUsesPaginationInfo: payload.payload
  })
});
