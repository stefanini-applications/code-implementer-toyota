import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  userPreferences: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_USER_PREFERENCES_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    userPreferences: payload.payload
  })
});
