import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  DOWNLOAD_ATTACHMENT_REQUEST:
    '@substanceAttachments/DOWNLOAD_ATTACHMENT_REQUEST',
  DOWNLOAD_ATTACHMENT_SUCCESS:
    '@substanceAttachments/DOWNLOAD_ATTACHMENT_SUCCESS',
  DOWNLOAD_ATTACHMENT_FAILURE:
    '@substanceAttachments/DOWNLOAD_ATTACHMENT_FAILURE'
};

const baseSelector = (state: { attachment: any }) => state.attachment;

export function downloadAttachmentRequest(id: any) {
  return {
    type: actionsTypes.DOWNLOAD_ATTACHMENT_REQUEST,
    id
  };
}

export function downloadAttachmentSuccess(attachment: any) {
  return {
    type: actionsTypes.DOWNLOAD_ATTACHMENT_SUCCESS,
    payload: attachment
  };
}

export function downloadAttachmentFailure() {
  return { type: actionsTypes.DOWNLOAD_ATTACHMENT_FAILURE };
}

export const attSelectors = {
  attachment: (state: { attachment: any }) => baseSelector(state).attachment
};
