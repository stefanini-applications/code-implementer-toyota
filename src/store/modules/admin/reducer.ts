import { createReducer } from 'reduxsauce';
import { actionsTypes } from './actions';

const INITIAL_STATE = {
  tabInfo: {
    tabId: 1,
    timeStamp: new Date().valueOf()
  }
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.SET_ADMIN_TAB]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    tabInfo: payload.payload
  })
});
