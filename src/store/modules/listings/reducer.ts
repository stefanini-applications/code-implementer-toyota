import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  listings: [],
  listingsPaginationInfo: [],
  listingsSubstance: [],
  listingsUploadErrors: [],
  lists: [],
  listsPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_LISTINGS_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    listings: payload.payload
  }),
  [actionsTypes.LISTINGS_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    listingsPaginationInfo: payload.payload
  }),
  [actionsTypes.GET_LISTINGS_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    listingsSubstance: payload.payload
  }),
  [actionsTypes.EDIT_LISTINGS_UPLOAD_FAILURE]: (state = INITIAL_STATE, payload) => ({
    ...state,
    listingsUploadErrors: payload.payload
  }),
  [actionsTypes.LISTS_SEARCH_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    lists: payload.payload
  }),
  [actionsTypes.LISTS_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    listsPaginationInfo: payload.payload
  })
});
