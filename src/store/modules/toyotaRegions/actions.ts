import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  LIST_ALL_TOYOTA_REGIONS_REQUEST:
    '@toyotaRegions/LIST_ALL_TOYOTA_REGIONS_REQUEST',
  LIST_ALL_TOYOTA_REGIONS_SUCCESS:
    '@toyotaRegions/LIST_ALL_TOYOTA_REGIONS_SUCCESS',
  LIST_ALL_TOYOTA_REGIONS_FAILURE:
    '@toyotaRegions/LIST_ALL_TOYOTA_REGIONS_FAILURE'
};

const baseSelector = (state: { toyotaRegions: any }) => state.toyotaRegions;

export function getToyotaRegionsRequest() {
  return { type: actionsTypes.LIST_ALL_TOYOTA_REGIONS_REQUEST };
}

export function getToyotaRegionsSuccess(toyotaRegions: any) {
  return {
    type: actionsTypes.LIST_ALL_TOYOTA_REGIONS_SUCCESS,
    payload: toyotaRegions
  };
}

export function getToyotaRegionsFailure() {
  return { type: actionsTypes.LIST_ALL_TOYOTA_REGIONS_FAILURE };
}

export const selectors = {
  toyotaRegions: (state: { toyotaRegions: any }) =>
    baseSelector(state).toyotaRegions?.data?.message
};
