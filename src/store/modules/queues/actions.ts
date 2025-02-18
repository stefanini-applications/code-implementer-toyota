import { ToastInfo } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  QUEUE_IMPACT_ASSESSMENT_UPLOAD_REQUEST: '@s3file/QUEUE_IMPACT_ASSESSMENT_UPLOAD_REQUEST',
  QUEUE_IMPACT_ASSESSMENT_UPLOAD_SUCCESS: '@s3file/QUEUE_IMPACT_ASSESSMENT_UPLOAD_SUCCESS',
  QUEUE_IMPACT_ASSESSMENT_UPLOAD_FAILURE: '@s3file/QUEUE_IMPACT_ASSESSMENT_UPLOAD_FAILURE',
  QUEUE_DELETE_GROUP_REQUEST: '@s3file/QUEUE_DELETE_GROUP_REQUEST',
  QUEUE_DELETE_GROUP_SUCCESS: '@s3file/QUEUE_DELETE_GROUP_SUCCESS',
  QUEUE_DELETE_GROUP_FAILURE: '@s3file/QUEUE_DELETE_GROUP_FAILURE'
};

const baseSelector = (state: { queue: any }) => state.queue;

export function queueImpactAssessmentUploadRequest(payload:any) {
  return {
    type: actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_REQUEST,
    payload
  };
}

export function queueImpactAssessmentUploadSuccess(results: any) {
  ToastInfo(translate('queuesToast.impactAssessmentUpload.message'), translate('queuesToast.impactAssessmentUpload.description'));
  return {
    type: actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_SUCCESS,
    payload: results
  };
}

export function queueImpactAssessmentUploadFailure() {
  return { type: actionsTypes.QUEUE_IMPACT_ASSESSMENT_UPLOAD_FAILURE };
}


export function queueDeleteGroupRequest(payload:any) {
  return {
    type: actionsTypes.QUEUE_DELETE_GROUP_REQUEST,
    payload
  };
}

export function queueDeleteGroupSuccess(results: any) {
  ToastInfo(translate('queuesToast.deleteGroup.message'), translate('queuesToast.deleteGroup.description'));
  return {
    type: actionsTypes.QUEUE_DELETE_GROUP_SUCCESS,
    payload: results
  };
}

export function queueDeleteGroupFailure() {
  return { type: actionsTypes.QUEUE_DELETE_GROUP_FAILURE };
}

export const selectors = {
  queue: (state: { queue: any }) => baseSelector(state).queue?.data
};
