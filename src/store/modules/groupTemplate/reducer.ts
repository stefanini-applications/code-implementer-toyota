import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  adminGroupTemplate: [],
  groupTemplate: [],
  groupTemplatePaginationInfo: [],
  adminGroupTemplatePaginationInfo: [],
  successCreateGroup: null,
  groupForEdit: null,
  urlTemplate: null,
  templateForEdit: null
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GROUP_TEMPLATE_SEARCH_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    groupTemplate: payload.payload
  }),
  [actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    adminGroupTemplate: payload.payload
  }),
  [actionsTypes.GROUP_TEMPLATE_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    groupTemplatePaginationInfo: payload.payload
  }),
  [actionsTypes.GROUP_TEMPLATE_ADMIN_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    adminGroupTemplatePaginationInfo: payload.payload
  }),
  [actionsTypes.GET_GROUP_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    groupForEdit: payload.payload
  }),
  [actionsTypes.DOWNLOAD_TEMPLATE_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    urlTemplate: payload.payload
  }),
  [actionsTypes.CLEAR_TEMPLATE_DATA]: (state = INITIAL_STATE) => ({
    ...state,
    groupTemplate: []
  }),
  [actionsTypes.CLEAR_GROUP_DATA]: (state = INITIAL_STATE) => ({
    ...state,
    groupForEdit: null
  }),
  [actionsTypes.GET_TEMPLATE_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    templateForEdit: payload.payload
  }),
  [actionsTypes.CLEAR_SELECTED_TEMPLATE_DATA]: (state = INITIAL_STATE) => ({
    ...state,
    templateForEdit: null
  }),
});
