import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetPriorityReportRequest } from './types';

export const actionsTypes = {
  GET_PRIORITY_REPORT_REQUEST: '@priorityReport/GET_PRIORITY_REPORT_REQUEST',
  GET_PRIORITY_REPORT_SUCCESS: '@priorityReport/GET_PRIORITY_REPORT_SUCCESS',
  GET_PRIORITY_REPORT_FAILURE: '@priorityReport/GET_PRIORITY_REPORT_FAILURE',
  GET_PRIORITY_REPORT_TABS_REQUEST: '@priorityReport/GET_PRIORITY_REPORT_TABS_REQUEST',
  GET_PRIORITY_REPORT_TABS_SUCCESS: '@priorityReport/GET_PRIORITY_REPORT_TABS_SUCCESS',
  GET_PRIORITY_REPORT_TABS_FAILURE: '@priorityReport/GET_PRIORITY_REPORT_TABS_FAILURE',
  PRIORITY_PAGINATION_INFO: '@priorityReport/PRIORITY_PAGINATION_INFO'
};

const baseSelector = (state: { priorityReport: any }) => state.priorityReport;

export function getPriorityReportRequest(payload: IGetPriorityReportRequest) {
  return {
    type: actionsTypes.GET_PRIORITY_REPORT_REQUEST,
    payload
  };
}

export function getPriorityPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.PRIORITY_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getPriorityReportSuccess(priorityReport: any) {
  return {
    type: actionsTypes.GET_PRIORITY_REPORT_SUCCESS,
    payload: priorityReport
  };
}

export function getPriorityReportFailure() {
  return { type: actionsTypes.GET_PRIORITY_REPORT_FAILURE };
}

export function getPriorityReportTabsRequest(priorityReportTabs: any) {
  return {
    type: actionsTypes.GET_PRIORITY_REPORT_TABS_REQUEST,
    payload: priorityReportTabs
  };
}

export function getPriorityReportTabsSuccess(priorityReportTabs: any) {
  return {
    type: actionsTypes.GET_PRIORITY_REPORT_TABS_SUCCESS,
    payload: priorityReportTabs
  };
}

export function getPriorityReportTabsFailure() {
  return {
    type: actionsTypes.GET_PRIORITY_REPORT_TABS_FAILURE
  };
}

export const selectors = {
  priorityReport: (state: { priorityReport: any }) =>
    baseSelector(state).priorityReport,
  priorityPaginationInfo: (state: { priorityReport: any }) =>
    baseSelector(state).priorityPaginationInfo,
  priorityReportTabs: (state: { priorityReport: any }) =>
    baseSelector(state).priorityReportTabs,
};
