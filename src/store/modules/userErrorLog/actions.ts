import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { ICreateUserErrorLog } from './types';

export const actionsTypes = {
  CREATE_USER_ERROR_LOG_REQUEST: '@uses/CREATE_USER_ERROR_LOG_REQUEST'
};

const baseSelector = (state: { userErrorLog: any }) => state.userErrorLog;


export function createUserErrorLogRequest(obj: ICreateUserErrorLog) {
  return {
    type: actionsTypes.CREATE_USER_ERROR_LOG_REQUEST,
    payload: obj
  };
}

export const selectors = {
  userErrorLog: (state: { userErrorLog: any }) =>
    baseSelector(state).userErrorLog?.data?.message
};
