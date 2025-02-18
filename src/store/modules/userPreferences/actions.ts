import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetUsersSearch, IEditUsers } from './types';

export const actionsTypes = {
  GET_USER_PREFERENCES_REQUEST: '@userPreferences/GET_USER_PREFERENCES_REQUEST',
  GET_USER_PREFERENCES_SUCCESS: '@userPreferences/GET_USER_PREFERENCES_SUCCESS',
  GET_USER_PREFERENCES_FAILURE: '@userPreferences/GET_USER_PREFERENCES_FAILURE',
  EDIT_USER_PREFERENCES_REQUEST:
    '@userPreferences/EDIT_USER_PREFERENCES_REQUEST',
  EDIT_USER_PREFERENCES_SUCCESS:
    '@userPreferences/EDIT_USER_PREFERENCES_SUCCESS',
  EDIT_USER_PREFERENCES_FAILURE:
    '@userPreferences/EDIT_USER_PREFERENCES_FAILURE',
  EDIT_USER_TOYOTA_REGION_REQUEST:
    '@userPreferences/EDIT_USER_TOYOTA_REGION_REQUEST',
  EDIT_USER_TOYOTA_REGION_SUCCESS:
    '@userPreferences/EDIT_USER_TOYOTA_REGION_SUCCESS',
  EDIT_USER_TOYOTA_REGION_FAILURE:
    '@userPreferences/EDIT_USER_TOYOTA_REGION_FAILURE'
};

const baseSelector = (state: { userPreferences: any }) => state.userPreferences;

export function getUserPreferencesRequest() {
  return {
    type: actionsTypes.GET_USER_PREFERENCES_REQUEST
  };
}

export function getUserPreferencesSuccess(result: any) {
  return {
    type: actionsTypes.GET_USER_PREFERENCES_SUCCESS,
    payload: result
  };
}

export function getUserPreferencesFailure() {
  return { type: actionsTypes.GET_USER_PREFERENCES_FAILURE };
}

export function editUserPreferencesRequest(userPreferences: any) {
  return {
    type: actionsTypes.EDIT_USER_PREFERENCES_REQUEST,
    payload: userPreferences
  };
}

export function editUserPreferencesSuccess() {
  ToastSuccess(translate('pages.users.toastSuccessEditUserPreferences'));
  return { type: actionsTypes.EDIT_USER_PREFERENCES_SUCCESS };
}

export function editUserPreferencesFailure() {
  return { type: actionsTypes.EDIT_USER_PREFERENCES_FAILURE };
}

export function editUserToyotaRegionRequest(toyotaRegion: any) {
  return {
    type: actionsTypes.EDIT_USER_TOYOTA_REGION_REQUEST,
    payload: toyotaRegion
  };
}

export function editUserToyotaRegionSuccess() {
  return { type: actionsTypes.EDIT_USER_TOYOTA_REGION_SUCCESS };
}

export function editUserToyotaRegionFailure() {
  return { type: actionsTypes.EDIT_USER_TOYOTA_REGION_FAILURE };
}

export const selectors = {
  userPreferences: (state: { userPreferences: any }) =>
    baseSelector(state).userPreferences?.data?.message
};
