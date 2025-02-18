import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  legislations: [],
  legislationRecord: null,
  legislationImpactAssessment: [],
  legislationAttachments: [],
  legislationsPaginationInfo: [],
  newLegislationRecord: [],
  editLegislationRecord: [],
  attachmentPaginationInfo: [],
  bulkLegislationRecord: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_LEGISLATIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    legislations: payload.payload
  }),
  [actionsTypes.LIST_LEGISLATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    legislationRecord: payload.payload?.data?.message
  }),
  [actionsTypes.GET_LEGISLATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    oneLegislationRecord: payload.payload?.data?.message
  }),
  [actionsTypes.LIST_LEGISLATION_RECORD_IA_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    legislationImpactAssessment: payload.payload
  }),
  [actionsTypes.LIST_LEGISLATION_RECORD_ATTACHMENTS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    legislationAttachments: payload.payload?.data?.message
  }),
  [actionsTypes.LEGISLATIONS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    legislationsPaginationInfo: payload.payload
  }),
  [actionsTypes.CREATE_LEGISLATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    newLegislationRecord: payload.payload
  }),
  [actionsTypes.CREATE_BULK_LEGISLATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    bulkLegislationRecord: payload.payload
  }),
  [actionsTypes.EDIT_LEGISLATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    editLegislationRecord: payload.payload
  }),
  [actionsTypes.PAGINATION_LEGISLATION_RECORD_ATTACHMENTS_FAILURE]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    attachmentPaginationInfo: payload.payload
  })
});
