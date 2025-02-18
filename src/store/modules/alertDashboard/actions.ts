import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  GET_ALERT_DASHBOARD_REQUEST: '@alertDashboard/GET_ALERT_DASHBOARD_REQUEST',
  GET_ALERT_DASHBOARD_SUCCESS: '@alertDashboard/GET_ALERT_DASHBOARD_SUCCESS',
  GET_ALERT_DASHBOARD_FAILURE: '@alertDashboard/GET_ALERT_DASHBOARD_FAILURE',
  CREATE_ALERT_DASHBOARD_REQUEST:
    '@alertDashboard/CREATE_ALERT_DASHBOARD_REQUEST',
  CREATE_ALERT_DASHBOARD_SUCCESS:
    '@alertDashboard/CREATE_ALERT_DASHBOARD_SUCCESS',
  CREATE_ALERT_DASHBOARD_FAILURE:
    '@alertDashboard/CREATE_ALERT_DASHBOARD_FAILURE',
  ALERT_DASHBOARD_PAGINATION_INFO:
    '@alertDashboard/ALERT_DASHBOARD_PAGINATION_INFO'
};

const baseSelector = (state: { alertDashboard: any }) => state.alertDashboard;

export function getAlertDashboardRequest(payload) {
  return { type: actionsTypes.GET_ALERT_DASHBOARD_REQUEST, payload };
}

export function getAlertDashboardSuccess(alertDashboard: any) {
  return {
    type: actionsTypes.GET_ALERT_DASHBOARD_SUCCESS,
    payload: alertDashboard
  };
}

export function getAlertDashboardFailure() {
  return { type: actionsTypes.GET_ALERT_DASHBOARD_FAILURE };
}

export function actInAlertDashboardRequest(payload, changelog) {
  return {
    type: actionsTypes.CREATE_ALERT_DASHBOARD_REQUEST,
    payload,
    changelog
  };
}

export function getAlertDashboardPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.ALERT_DASHBOARD_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function actInAlertDashboardSuccess(payload: any, action: string) {
  if (action === 'ack') {
    ToastSuccess(translate('pages.alertDashboard.toastSuccessAck'));
  } else {
    ToastSuccess(translate('pages.alertDashboard.toastSuccessUndoAck'));
  }
  return {
    type: actionsTypes.CREATE_ALERT_DASHBOARD_SUCCESS,
    payload
  };
}

export function actInAlertDashboardFailure() {
  return { type: actionsTypes.CREATE_ALERT_DASHBOARD_FAILURE };
}

export function actInAlertDashboardDuplicateFailure() {
  return { type: actionsTypes.CREATE_ALERT_DASHBOARD_FAILURE };
}

export const selectors = {
  alertDashboard: (state: { alertDashboard: any }) =>
    baseSelector(state).alertDashboard,
  alertDashboardPagination: (state: { alertDashboard: any }) =>
    baseSelector(state).alertDashboardPagination
};
