import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  s3file: null
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    s3file: payload.payload
  })
});
