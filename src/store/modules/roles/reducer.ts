import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  roles: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_ROLES_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    roles: payload.payload
  })
});
