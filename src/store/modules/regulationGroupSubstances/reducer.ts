import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  newRelatedSubstance: [],
  groupSubstances: [],
  groupSubstancesPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_GROUP_SUBSTANCES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    groupSubstances: payload.payload?.data?.message
  }),
  [actionsTypes.GROUP_SUBSTANCES_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    groupSubstancesPaginationInfo: payload.payload
  })
});
