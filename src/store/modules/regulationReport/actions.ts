import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  REGULATION_REPORT_REQUEST: '@regulationReport/REGULATION_REPORT_REQUEST',
  REGULATION_REPORT_SUCCESS: '@regulationReport/REGULATION_REPORT_SUCCESS',
  REGULATION_REPORT_FAILURE: '@regulationReport/REGULATION_REPORT_FAILURE'
};

const baseSelector = (state: { regulationReport: any }) =>
  state.regulationReport;

export function getRegulationReportRequest(payload) {
  return { type: actionsTypes.REGULATION_REPORT_REQUEST, payload };
}

export function getRegulationReportSuccess(regulationReport: any) {
  return {
    type: actionsTypes.REGULATION_REPORT_SUCCESS,
    payload: regulationReport
  };
}

export function getRegulationReportFailure() {
  return { type: actionsTypes.REGULATION_REPORT_FAILURE };
}

export const selectors = {
  regulationReport: (state: { regulationReport: any }) =>
    baseSelector(state).regulationReport?.data?.message
};
