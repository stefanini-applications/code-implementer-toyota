import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  searchBarResults: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_SEARCH_BAR_RESULTS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    searchBarResults: payload.payload
  })
});
