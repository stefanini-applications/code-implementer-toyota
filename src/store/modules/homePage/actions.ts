import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  UPDATES_SUBSTANCE_REQUEST: '@homePage/UPDATES_SUBSTANCE_REQUEST',
  UPDATES_SUBSTANCE_SUCCESS: '@homePage/UPDATES_SUBSTANCE_SUCCESS',
  UPDATES_SUBSTANCE_FAILURE: '@homePage/UPDATES_SUBSTANCE_FAILURE',
  UPDATES_REGULATION_REQUEST: '@homePage/UPDATES_REGULATION_REQUEST',
  UPDATES_REGULATION_SUCCESS: '@homePage/UPDATES_REGULATION_SUCCESS',
  UPDATES_REGULATION_FAILURE: '@homePage/UPDATES_REGULATION_FAILURE',
  UPDATES_PAGINATION_INFO: '@homePage/UPDATES_PAGINATION_INFO',
  PRIORITY_RANK_PAGINATION_INFO: '@homePage/PRIORITY_RANK_PAGINATION_INFO',
  CLEAR_UPDATES_REGULATION: '@HOMEPAGE/CLEAR_UPDATES_REGULATION',
  RECENTLY_VIEW_REQUEST: '@homePage/RECENTLY_VIEW_REQUEST',
  RECENTLY_VIEW_SUCCESS: '@homePage/RECENTLY_VIEW_SUCCESS',
  RECENTLY_VIEW_FAILURE: '@homePage/RECENTLY_VIEW_FAILURE',
};

const baseSelector = (state: { homePage: any }) => state.homePage;

export function updatesRegulationRequest(payload) {
  return {
    type: actionsTypes.UPDATES_REGULATION_REQUEST,
    payload
  };
}

export function updatesRegulationSuccess(updatesRegulation: any) {
  return {
    type: actionsTypes.UPDATES_REGULATION_SUCCESS,
    payload: updatesRegulation
  };
}

export function updatesRegulationFailure() {
  return { type: actionsTypes.UPDATES_REGULATION_FAILURE };
}

export const clearUpdatesRegulation = () => ({
  type: actionsTypes.CLEAR_UPDATES_REGULATION,
});

export function updatesSubstanceRequest(payload) {
  return {
    type: actionsTypes.UPDATES_SUBSTANCE_REQUEST,
    payload
  };
}

export function updatesSubstanceSuccess(updatesSubstance: any) {
  return {
    type: actionsTypes.UPDATES_SUBSTANCE_SUCCESS,
    payload: updatesSubstance
  };
}

export function updatesSubstanceFailure() {
  return { type: actionsTypes.UPDATES_SUBSTANCE_FAILURE };
}

export function getUpdatesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.UPDATES_PAGINATION_INFO,
    payload: paginationInfo
  };
}
export function getPriorityRankPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.PRIORITY_RANK_PAGINATION_INFO,
    payload: paginationInfo
  };
}


export function recentlyViewRequest(payload) {
  return {
    type: actionsTypes.RECENTLY_VIEW_REQUEST,
    payload
  };
}

export function recentlyViewSuccess(recentlyView: any) {
  return {
    type: actionsTypes.RECENTLY_VIEW_SUCCESS,
    payload: recentlyView
  };
}

export function recentlyViewFailure() {
  return { type: actionsTypes.RECENTLY_VIEW_FAILURE };
}

export const selectors = {
  priorityRankSubstance: (state: { homePage: any }) =>
    baseSelector(state).priorityRankSubstance?.data?.message,
  updatesRegulation: (state: { homePage: any }) =>
    baseSelector(state).updatesRegulation?.data?.message,
  updatesSubstance: (state: { homePage: any }) =>
    baseSelector(state).updatesSubstance?.data?.message,
  updatesPaginationInfo: (state: { homePage: any }) =>
    baseSelector(state).updatesPaginationInfo,
  priorityRankPaginationInfo: (state: { homePage: any }) =>
    baseSelector(state).priorityRankPaginationInfo,
  recentlyView: (state: { homePage: any }) =>
    baseSelector(state).recentlyView?.data?.message,
};
