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
  [actionsTypes.LIST_LINKED_LEGISLATIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    linkedLegislations: payload.payload
  }),
  [actionsTypes.GET_LINKED_LEGISLATIONS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    linkedLegislationsPaginationInfo: payload.payload
  }),
});
