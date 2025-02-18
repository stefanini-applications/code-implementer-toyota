/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { postSubstanceExecutiveSummaryLlm, postExecReportLlm } from '../../../services/api';
import { 
  actionsTypes, 
  postSubstanceExecSummarySuccess, 
  postSubstanceExecSummaryFailure, 
  postExecReportSuccess, 
  postExecReportFailure 
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* postSubstanceExecSummaryRequest({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(postSubstanceExecutiveSummaryLlm, payload);
    yield put(postSubstanceExecSummarySuccess(response));
  } catch (error: any) {
    yield put(postSubstanceExecSummaryFailure());
  }
}

export function* postExecReportRequest({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.POST_EXEC_REPORT_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(postExecReportLlm, payload);
    yield put(postExecReportSuccess(response));
  } catch (error: any) {
    yield put(postExecReportFailure());
  }
}

export default function* rolesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_REQUEST, postSubstanceExecSummaryRequest),
        yield takeLatest(actionsTypes.POST_EXEC_REPORT_REQUEST, postExecReportRequest)
      ];
    })
  ]);
}
