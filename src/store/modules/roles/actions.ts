import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  GET_ROLES_REQUEST: '@roles/GET_ROLES_REQUEST',
  GET_ROLES_SUCCESS: '@roles/GET_ROLES_SUCCESS',
  GET_ROLES_FAILURE: '@roles/GET_ROLES_FAILURE'
};

const baseSelector = (state: { roles: any }) => state.roles;

export function getRolesRequest() {
  return {
    type: actionsTypes.GET_ROLES_REQUEST
  };
}

export function getRolesSuccess(results: any) {
  return {
    type: actionsTypes.GET_ROLES_SUCCESS,
    payload: results
  };
}

export function getRolesFailure() {
  return { type: actionsTypes.GET_ROLES_FAILURE };
}

export const selectors = {
  roles: (state: { roles: any }) => baseSelector(state).roles?.data?.message
};
