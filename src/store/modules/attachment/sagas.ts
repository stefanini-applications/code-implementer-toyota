/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { downloadAttachment } from '../../../services/api';
import {
  actionsTypes,
  downloadAttachmentFailure,
  downloadAttachmentSuccess
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getDownloadAttachment({
  id
}: {
  id: any;
  type: typeof actionsTypes.DOWNLOAD_ATTACHMENT_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(downloadAttachment, id);
    yield put(downloadAttachmentSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(downloadAttachmentFailure());
    }
  }
}

export default function* substanceAttachmentsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.DOWNLOAD_ATTACHMENT_REQUEST,
          getDownloadAttachment
        )
      ];
    })
  ]);
}
