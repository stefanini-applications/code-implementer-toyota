import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';

export const actionsTypes = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT'
};

const baseSelector = (state: { auth: any }) => state.auth;

export const signInRequest = () => {
  return {
    type: actionsTypes.SIGN_IN_REQUEST
  };
};

export const signInSuccess = (token: any) => {
  return {
    type: actionsTypes.SIGN_IN_SUCCESS,
    payload: token
  };
};

export const signInFailure = () => {
  return {
    type: actionsTypes.SIGN_IN_FAILURE
  };
};

export const signOut = () => {
  return { type: actionsTypes.SIGN_OUT };
};

export const selectors = {
  isSigned: (state: { auth: any }) => baseSelector(state)?.signed,
  token: (state: { auth: any }) => baseSelector(state)?.token,
  failure: (state: { auth: any }) => baseSelector(state)?.failure
};
