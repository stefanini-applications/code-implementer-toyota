import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  regulations: [],
  regulationRecord: [],
  regulationsPaginationInfo: [],
  regulationSubstancePhase: {},
  newRegulationRecord: [],
  editRegulationRecord: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_REGULATIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulations: payload.payload
  }),
  [actionsTypes.LIST_REGULATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulationRecord: payload.payload
  }),
  [actionsTypes.REGULATIONS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulationsPaginationInfo: payload.payload
  }),
  [actionsTypes.REGULATION_SUBSTANCE_PHASE_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    regulationSubstancePhase: payload.payload
  }),
  [actionsTypes.CREATE_REGULATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    newRegulationRecord: payload.payload
  }),
  [actionsTypes.EDIT_REGULATION_RECORD_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    editRegulationRecord: payload.payload
  })
});
