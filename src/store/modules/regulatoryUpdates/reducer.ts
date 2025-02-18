import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  regulatoryUpdatesRecords: [],
  regulatoryUpdatesSubstance: [],
  regulatoryUpdatesSubstancePaginationInfo: [],
  regulatoryUpdatesClass: [],
  regulatoryUpdatesPaginationInfo: [],
  regulatoryUpdatesAttachedFiles: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_REGULATORY_UPDATES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulatoryUpdatesRecords: payload.payload
  }),
  [actionsTypes.LIST_REGULATORY_UPDATES_BY_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulatoryUpdatesRecords: payload.payload
  }),
  [actionsTypes.REGULATORY_UPDATES_BY_SUBSTANCE_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulatoryUpdatesSubstancePaginationInfo: payload.payload
  }),
  [actionsTypes.REGULATORY_UPDATES_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulatoryUpdatesPaginationInfo: payload.payload
  }),
  [actionsTypes.ATTACHMENT_REGULATORY_UPDATES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulatoryUpdatesAttachedFiles: payload.payload
  })
});
