import { IGetNotifications } from './types';

export const actionsTypes = {
  GET_NOTIFCATIONS_REQUEST: '@users/GET_NOTIFCATIONS_REQUEST',
  GET_NOTIFCATIONS_SUCCESS: '@users/GET_NOTIFCATIONS_SUCCESS',
  GET_NOTIFCATIONS_FAILURE: '@users/GET_NOTIFCATIONS_FAILURE',
  NOTIFCATIONS_PAGINATION_INFO: '@users/NOTIFCATIONS_PAGINATION_INFO'
};

const baseSelector = (state: { notifications: any }) => state.notifications;

export function getNotificationsRequest(data: IGetNotifications) {
  return {
    type: actionsTypes.GET_NOTIFCATIONS_REQUEST,
    payload: data
  };
}

export function getNotificationsSuccess(results: any) {
  return {
    type: actionsTypes.GET_NOTIFCATIONS_SUCCESS,
    payload: results
  };
}

export function getNotificationsFailure() {
  return { type: actionsTypes.GET_NOTIFCATIONS_FAILURE };
}

export function getNotificationsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.NOTIFCATIONS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export const selectors = {
  notifications: (state: { notifications: any }) =>
    baseSelector(state).notifications?.data?.message,
  notificationsPaginationInfo: (state: { notifications: any }) =>
    baseSelector(state).notificationsPaginationInfo
};
