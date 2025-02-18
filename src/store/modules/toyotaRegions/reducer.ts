import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  toyotaRegions: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_ALL_TOYOTA_REGIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    toyotaRegions: payload.payload
  })
});
