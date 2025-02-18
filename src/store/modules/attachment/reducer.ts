import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  attachment: []
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.DOWNLOAD_ATTACHMENT_SUCCESS]: (
    state = INITIAL_STATE,
    payload
  ) => ({
    ...state,
    attachment: payload.payload
  })
});
