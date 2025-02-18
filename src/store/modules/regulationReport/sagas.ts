/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { getRegulationReport } from '../../../services/api';
import {
  actionsTypes,
  getRegulationReportSuccess,
  getRegulationReportFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findAllRegulationReport({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.REGULATION_REPORT_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(
      getRegulationReport,
      payload
    );
    yield put(getRegulationReportSuccess(response));
  } catch (error: any) {
    yield put(getRegulationReportFailure());
  }
}

export default function* substancesSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.REGULATION_REPORT_REQUEST,
          findAllRegulationReport
        )
      ];
    })
  ]);
}
