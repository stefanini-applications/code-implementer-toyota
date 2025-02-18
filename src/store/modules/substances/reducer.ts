import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  substances: [],
  substanceRecord: [],
  substanceAttachments: [],
  newSubstanceRecord: [],
  jurisdictionContentBySubstance: [],
  substancesPaginationInfo: [],
  substanceAttachmentPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_SUBSTANCES_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    substances: payload.payload
  }),
  [actionsTypes.LIST_SUBSTANCE_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceRecord: payload.payload
  }),
  [actionsTypes.LIST_SUBSTANCE_ATTACHMENTS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceAttachments: payload.payload
  }),
  [actionsTypes.CREATE_SUBSTANCE_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    newSubstanceRecord: payload.payload
  }),
  [actionsTypes.LIST_JURISDICTION_CONTENT_BY_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    jurisdictionContentBySubstance: payload.payload
  }),
  [actionsTypes.SUBSTANCES_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substancesPaginationInfo: payload.payload
  }),
  [actionsTypes.SUBSTANCE_ATTACHMENT_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceAttachmentPaginationInfo: payload.payload
  }),
  [actionsTypes.CLEAR_SUBSTANCE_RECORD]: (state = INITIAL_STATE, payload) => ({
    ...state,
    substanceRecord: []
  }),
});
