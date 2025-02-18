import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';


export const actionsTypes = {
  LIST_GROUP_SUBSTANCES_REQUEST:
    '@groupSubstances/LIST_GROUP_SUBSTANCES_REQUEST',
  LIST_GROUP_SUBSTANCES_SUCCESS:
    '@groupSubstances/LIST_GROUP_SUBSTANCES_SUCCESS',
  LIST_GROUP_SUBSTANCES_FAILURE:
    '@groupSubstances/LIST_GROUP_SUBSTANCES_FAILURE',
  GROUP_SUBSTANCES_PAGINATION_INFO:
    '@groupSubstances/GROUP_SUBSTANCES_PAGINATION_INFO'
};

const baseSelector = (state: { regulationGroupSubstances: any }) =>
  state.regulationGroupSubstances;

export function getGroupSubstancesRequest(data: any) {
  return {
    type: actionsTypes.LIST_GROUP_SUBSTANCES_REQUEST,
    payload: data
  };
}

export function getGroupSubstancesSuccess(groupSubstances: any) {
  return {
    type: actionsTypes.LIST_GROUP_SUBSTANCES_SUCCESS,
    payload: groupSubstances
  };
}

export function getGroupSubstancesFailure() {
  return { type: actionsTypes.LIST_GROUP_SUBSTANCES_FAILURE };
}

export function getGroupSubstancesPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.GROUP_SUBSTANCES_PAGINATION_INFO,
    payload: paginationInfo
  };
}


export const selectors = {
  groupSubstances: (state: { regulationGroupSubstances: any }) =>
    baseSelector(state).groupSubstances,
  groupSubstancesPaginationInfo: (state: { regulationGroupSubstances: any }) =>
    baseSelector(state).groupSubstancesPaginationInfo
};
