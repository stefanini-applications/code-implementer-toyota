import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  notifications: [],
  notificationsPaginationInfo: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_NOTIFCATIONS_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    notifications: payload.payload
  }),
  [actionsTypes.NOTIFCATIONS_PAGINATION_INFO]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    notificationsPaginationInfo: payload.payload
  })
});
