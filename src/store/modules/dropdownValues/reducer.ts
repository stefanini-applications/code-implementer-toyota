import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  dropdownValues: [],
  dropDownRegulationSubstance: [],
  dropDownRelatedSubstance: [],
  dropDownUpdatesRelatedSubstance: [],
  dropDownListings: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_ALL_REGULATIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    dropdownValues: payload.payload
  }),
  [actionsTypes.LIST_REGULATIONS_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    dropDownRegulationSubstance: payload.payload
  }),
  [actionsTypes.LIST_RELATED_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    dropDownRelatedSubstance: payload.payload
  }),
  [actionsTypes.LIST_UPDATES_RELATED_SUBSTANCE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    dropDownUpdatesRelatedSubstance: payload.payload
  }),
  [actionsTypes.LIST_ALL_LISTINGS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    dropDownListings: payload.payload
  })
});
