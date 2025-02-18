import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  impactAssessmentRecord: null,
  impactAssessmentRecordClone: null,
  impactAssessmentBySubstance: [],
  impactAssessmentByGroup: [],
  impactAssessmentListUploadError: [],
  impactAssessmentGroupPaginationInfo: [],
  impactAssessmentById: null,
  impactAssessmentBySubstanceRegulationAndToyotaRegion: null
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_IMPACT_ASSESSMENT_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentRecord: payload.payload
  }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_CLONE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentRecordClone: payload.payload
  }),
  [actionsTypes.ATTACHMENTS_SUBSTANCE_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceAttachmentsPagination: payload.payload
  }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentBySubstance: payload.payload.data.message
  }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_BY_GROUP_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentByGroup: payload.payload.data.message
  }),
  [actionsTypes.UPLOAD_IMPACT_ASSESSMENT_LIST_UPLOAD_FAILURE]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentListUploadError: payload.payload
  }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_BY_ID_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentById: payload?.payload?.data?.message
  }),
  [actionsTypes.IMPACT_ASSESSMENT_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentGroupPaginationInfo: payload.payload
  }),
  [actionsTypes.IMPACT_ASSESSMENT_SUBSTANCE_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    impactAssessmentBySubstancePaginationInfo: payload.payload
  }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_BY_SUBSTANCE_REGULATION_TOYOTA_REGION_SUCCESS]:
    (state = INITIAL_STATE, payload) => ({
      ...state,
      impactAssessmentBySubstanceRegulationAndToyotaRegion:
        payload?.payload?.data?.message
    }),
  [actionsTypes.GET_IMPACT_ASSESSMENT_SUBSTANCE_ATTACHMENT_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    substanceAttachmentImpactAssessment: payload?.payload?.data?.message
  }),
  [actionsTypes.CLEAR_IMPACT_ASSESSMENT_DATA]: (state = INITIAL_STATE) => ({
    ...state,
    impactAssessmentRecord: null
  })
});
