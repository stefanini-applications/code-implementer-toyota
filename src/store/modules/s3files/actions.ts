import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  GET_S3_FILE_REQUEST: '@s3file/GET_S3_FILE_REQUEST',
  GET_S3_FILE_SUCCESS: '@s3file/GET_S3_FILE_SUCCESS',
  GET_S3_FILE_FAILURE: '@s3file/GET_S3_FILE_FAILURE'
};

const baseSelector = (state: { s3file: any }) => state.s3file;

export function getS3FileRequest(url:any) {
  return {
    type: actionsTypes.GET_S3_FILE_REQUEST,
    url
  };
}

export function getS3FileSuccess(results: any) {
  return {
    type: actionsTypes.GET_S3_FILE_SUCCESS,
    payload: results
  };
}

export function getS3FileFailure() {
  return { type: actionsTypes.GET_S3_FILE_FAILURE };
}

export const selectors = {
  s3file: (state: { s3file: any }) => baseSelector(state).s3file?.data
};
