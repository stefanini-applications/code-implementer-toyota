import { createReducer } from 'reduxsauce';

import { actionsTypes } from './actions';

const INITIAL_STATE = {
  s3file: null
};

export default createReducer(INITIAL_STATE, {
  [actionsTypes.GET_S3_FILE_SUCCESS]: (state = INITIAL_STATE, payload) => ({
    ...state,
    s3file: payload.payload
  })
});
