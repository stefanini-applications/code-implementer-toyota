import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  users: [],
  usersPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.LIST_SEARCH_USERS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    users: payload.payload
  }),
  [actionsTypes.USERS_PAGINATION_INFO]: (state = INITIAL_STATE, payload) => ({
    ...state,
    usersPaginationInfo: payload.payload
  })
});
