import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  POST_SUBSTANCE_EXEC_SUMMARY_REQUEST: '@llm/POST_SUBSTANCE_EXEC_SUMMARY_REQUEST',
  POST_SUBSTANCE_EXEC_SUMMARY_SUCCESS: '@llm/POST_SUBSTANCE_EXEC_SUMMARY_SUCCESS',
  POST_SUBSTANCE_EXEC_SUMMARY_FAILURE: '@llm/POST_SUBSTANCE_EXEC_SUMMARY_FAILURE',
  POST_EXEC_REPORT_REQUEST: '@llm/POST_EXEC_REPORT_REQUEST',
  POST_EXEC_REPORT_SUCCESS: '@llm/POST_EXEC_REPORT_SUCCESS',
  POST_EXEC_REPORT_FAILURE: '@llm/POST_EXEC_REPORT_FAILURE'
};

const baseSelector = (state: { llm: any }) => state.llm;

export function postSubstanceExecSummaryRequest(payload:any) {
  return {
    type: actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_REQUEST,
    payload
  };
}

export function postSubstanceExecSummarySuccess(llm: any) {
  return {
    type: actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_SUCCESS,
    payload: llm
  };
}

export function postSubstanceExecSummaryFailure() {
  return { type: actionsTypes.POST_SUBSTANCE_EXEC_SUMMARY_FAILURE };
}

export function postExecReportRequest(payload:any) {
  return {
    type: actionsTypes.POST_EXEC_REPORT_REQUEST,
    payload
  };
}

export function postExecReportSuccess(llm: any) {
  return {
    type: actionsTypes.POST_EXEC_REPORT_SUCCESS,
    payload: llm
  };
}

export function postExecReportFailure() {
  return { type: actionsTypes.POST_EXEC_REPORT_FAILURE };
}

export const selectors = {
  substanceExecSummary: (state: { llm: any }) => baseSelector(state).substanceExecSummary?.data?.message,
  execReport: (state: { llm: any }) => baseSelector(state).execReport?.data?.message
};
