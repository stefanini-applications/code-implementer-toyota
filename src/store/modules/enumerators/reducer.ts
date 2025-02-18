import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  itemsPerPage: {
    optionValue: 10,
    optionId: 1
  },
  jurisdictions: [],
  agency: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_ITEMS_PER_PAGE_REQUEST]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    itemsPerPage: payload.payload
  }),
  [actionsTypes.LIST_JURISDICTIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    jurisdictions: payload.payload?.data?.message
  }),
  [actionsTypes.LIST_AGENCY_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    agency: payload.payload?.data?.message
  })
});
