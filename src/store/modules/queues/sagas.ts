/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { postQueue } from '../../../services/api';
import { 
  actionsTypes, 
  queueImpactAssessmentUploadSuccess, 
  queueImpactAssessmentUploadFailure, 
  queueDeleteGroupSuccess, 
  queueDeleteGroupFailure } from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* queueImpactAssessmentUpload({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(postQueue, payload, 'ImpactAssessmentUpload');
    yield put(queueImpactAssessmentUploadSuccess(response));
  } catch (error: any) {
    yield put(queueImpactAssessmentUploadFailure());
  }
}

export function* queueDeleteGroup({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.QUEUE_DELETE_GROUP_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(postQueue, payload, 'DeleteGroup');
    yield put(queueDeleteGroupSuccess(response));
  } catch (error: any) {
    yield put(queueDeleteGroupFailure());
  }
}

export default function* rolesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_REQUEST, queueImpactAssessmentUpload),
        yield takeLatest(actionsTypes.QUEUE_DELETE_GROUP_REQUEST, queueDeleteGroup)
      ];
    })
  ]);
}
