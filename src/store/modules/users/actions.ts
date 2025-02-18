import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetUsersSearch, IEditUsers } from './types';

export const actionsTypes = {
  LIST_SEARCH_USERS_REQUEST: '@users/LIST_SEARCH_USERS_REQUEST',
  LIST_SEARCH_USERS_SUCCESS: '@users/LIST_SEARCH_USERS_SUCCESS',
  LIST_SEARCH_USERS_FAILURE: '@users/LIST_SEARCH_USERS_FAILURE',
  EDIT_USERS_REQUEST: '@users/EDIT_USERS_REQUEST',
  EDIT_USERS_SUCCESS: '@users/EDIT_USERS_SUCCESS',
  EDIT_USERS_FAILURE: '@users/EDIT_USERS_FAILURE',
  USERS_PAGINATION_INFO: '@users/USERS_PAGINATION_INFO'
};

const baseSelector = (state: { users: any }) => state.users;

export function getSearchUsersRequest(data: IGetUsersSearch) {
  return {
    type: actionsTypes.LIST_SEARCH_USERS_REQUEST,
    payload: data
  };
}

export function getSearchUsersSuccess(searchUsersResults: any) {
  return {
    type: actionsTypes.LIST_SEARCH_USERS_SUCCESS,
    payload: searchUsersResults
  };
}

export function getSearchUsersFailure() {
  return { type: actionsTypes.LIST_SEARCH_USERS_FAILURE };
}

export function editUsersRequest(editUsers: IEditUsers) {
  return {
    type: actionsTypes.EDIT_USERS_REQUEST,
    payload: editUsers
  };
}

export function editUsersSuccess() {
  ToastSuccess(translate('pages.users.toastSuccessEditUsers'));
  return { type: actionsTypes.EDIT_USERS_SUCCESS };
}

export function editUsersFailure() {
  return { type: actionsTypes.EDIT_USERS_FAILURE };
}

export function getUsersPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.USERS_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export const selectors = {
  users: (state: { users: any }) => baseSelector(state).users?.data?.message,
  usersPaginationInfo: (state: { users: any }) =>
    baseSelector(state).usersPaginationInfo
};
