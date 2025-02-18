import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  newRelatedSubstance: [],
  relatedSubstances: [],
  relatedSubstancesPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_RELATED_SUBSTANCES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    relatedSubstances: payload.payload?.data?.message
  }),
  [actionsTypes.RELATED_SUBSTANCES_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    relatedSubstancesPaginationInfo: payload.payload
  }),
  [actionsTypes.CREATE_RELATED_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    newRelatedSubstance: payload.payload?.data?.message
  }),
  [actionsTypes.CLEAR_RELATED_SUBSTANCES]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    relatedSubstances: []
  }),
});
