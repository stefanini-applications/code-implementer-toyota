import { IAdminTabInfo } from './types';

export const actionsTypes = {
  SET_ADMIN_TAB: '@admin/SET_ADMIN_TAB'
};

const baseSelector = (state: { admin: any }) => state.admin;

export function setAdminTab(info: IAdminTabInfo) {
  return {
    type: actionsTypes.SET_ADMIN_TAB,
    payload: info
  };
}

export const selectors = {
  tabInfo: (state: { admin: any }) => baseSelector(state).tabInfo
};
