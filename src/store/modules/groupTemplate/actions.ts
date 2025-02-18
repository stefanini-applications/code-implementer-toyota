import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import {
  IGetAdminGroupTemplateSearch,
  IGetGroupTemplateSearch,
  IPostRegulationGroupAll,
  IPostTemplate
} from './types';

export const actionsTypes = {
  GROUP_TEMPLATE_SEARCH_REQUEST: '@groupTemplate/GROUP_TEMPLATE_SEARCH_REQUEST',
  GROUP_TEMPLATE_SEARCH_SUCCESS: '@groupTemplate/GROUP_TEMPLATE_SEARCH_SUCCESS',
  GROUP_TEMPLATE_SEARCH_FAILURE: '@groupTemplate/GROUP_TEMPLATE_SEARCH_FAILURE',
  GROUP_TEMPLATE_PAGINATION_INFO:
    '@groupTemplate/GROUP_TEMPLATE_PAGINATION_INFO',
  GROUP_TEMPLATE_ADMIN_SEARCH_REQUEST:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_SEARCH_REQUEST',
  GROUP_TEMPLATE_ADMIN_SEARCH_SUCCESS:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_SEARCH_SUCCESS',
  GROUP_TEMPLATE_ADMIN_SEARCH_FAILURE:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_SEARCH_FAILURE',
  GROUP_TEMPLATE_ADMIN_PAGINATION_INFO:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_PAGINATION_INFO',
  GROUP_TEMPLATE_ADMIN_DELETE_REQUEST:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_DELETE_REQUEST',
  GROUP_TEMPLATE_ADMIN_DELETE_SUCCESS:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_DELETE_SUCCESS',
  GROUP_TEMPLATE_ADMIN_DELETE_FAILURE:
    '@groupTemplate/GROUP_TEMPLATE_ADMIN_DELETE_FAILURE',
  CREATE_EDIT_GROUP_REQUEST: '@groupTemplate/CREATE_EDIT_GROUP_REQUEST',
  CREATE_EDIT_GROUP_SUCCESS: '@groupTemplate/CREATE_EDIT_GROUP_SUCCESS',
  CREATE_EDIT_GROUP_FAILURE: '@groupTemplate/CREATE_EDIT_GROUP_FAILURE',
  CREATE_EDIT_TEMPLATE_REQUEST: '@groupTemplate/CREATE_EDIT_TEMPLATE_REQUEST',
  CREATE_EDIT_TEMPLATE_SUCCESS: '@groupTemplate/CREATE_EDIT_TEMPLATE_SUCCESS',
  CREATE_EDIT_TEMPLATE_FAILURE: '@groupTemplate/CREATE_EDIT_TEMPLATE_FAILURE',
  GET_GROUP_REQUEST: '@groupTemplate/GET_GROUP_REQUEST',
  GET_GROUP_SUCCESS: '@groupTemplate/GET_GROUP_SUCCESS',
  GET_GROUP_FAILURE: '@groupTemplate/GET_GROUP_FAILURE',
  GET_TEMPLATE_REQUEST: '@groupTemplate/GET_TEMPLATE_REQUEST',
  GET_TEMPLATE_SUCCESS: '@groupTemplate/GET_TEMPLATE_SUCCESS',
  GET_TEMPLATE_FAILURE: '@groupTemplate/GET_TEMPLATE_FAILURE',
  DOWNLOAD_TEMPLATE_REQUEST: '@groupTemplate/DOWNLOAD_TEMPLATE_REQUEST',
  DOWNLOAD_TEMPLATE_SUCCESS: '@groupTemplate/DOWNLOAD_TEMPLATE_SUCCESS',
  DOWNLOAD_TEMPLATE_FAILURE: '@groupTemplate/DOWNLOAD_TEMPLATE_FAILURE',
  CLEAR_TEMPLATE_DATA: '@groupTemplate/CLEAR_TEMPLATE_DATA',
  CLEAR_GROUP_DATA: '@groupTemplate/CLEAR_GROUP_DATA',
  CLEAR_SELECTED_TEMPLATE_DATA: '@groupTemplate/CLEAR_SELECTED_TEMPLATE_DATA'
};

const baseSelector = (state: { groupTemplate: any }) => state.groupTemplate;

export function getGroupTemplateRequest(data: IGetGroupTemplateSearch) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_SEARCH_REQUEST,
    payload: data
  };
}

export function getGroupTemplateSuccess(searchResults: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_SEARCH_SUCCESS,
    payload: searchResults
  };
}

export function getGroupTemplateFailure() {
  return { type: actionsTypes.GROUP_TEMPLATE_SEARCH_FAILURE };
}

export function getGroupTemplatePaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getAdminGroupTemplatePaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function getAdminGroupTemplateRequest(
  data: IGetAdminGroupTemplateSearch
) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_REQUEST,
    payload: data
  };
}

export function getAdminGroupTemplateSuccess(groupTemplate: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_SUCCESS,
    payload: groupTemplate
  };
}

export function getAdminGroupTemplateFailure() {
  return { type: actionsTypes.GROUP_TEMPLATE_ADMIN_SEARCH_FAILURE };
}

export function getAdmingGroupTemplatePaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_PAGINATION_INFO,
    payload: paginationInfo
  };
}

export function deleteAdminGroupTemplateRequest(ids: any) {
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_DELETE_REQUEST,
    payload: ids
  };
}

export function deleteAdminGroupTemplatesSuccess(payload: any) {
  ToastSuccess(translate('pages.templates.toastSuccessDeleteRecord'));
  return {
    type: actionsTypes.GROUP_TEMPLATE_ADMIN_DELETE_SUCCESS,
    payload
  };
}

export function deleteAdminGroupTemplatesFailure() {
  return { type: actionsTypes.GROUP_TEMPLATE_ADMIN_DELETE_FAILURE };
}

export function createEditGroupRequest(data: IPostRegulationGroupAll) {
  return {
    type: actionsTypes.CREATE_EDIT_GROUP_REQUEST,
    payload: data
  };
}

export function createEditGroupSuccess() {
  ToastSuccess(
    translate('pages.regulations.toastSuccessCreateEditRegulationGroup')
  );
  return {
    type: actionsTypes.CREATE_EDIT_GROUP_SUCCESS
  };
}

export function createEditGroupFailure() {
  return { type: actionsTypes.CREATE_EDIT_GROUP_FAILURE };
}

export function createEditTemplateRequest(data: IPostTemplate) {
  return {
    type: actionsTypes.CREATE_EDIT_TEMPLATE_REQUEST,
    payload: data
  };
}

export function createEditTemplateSuccess() {
  ToastSuccess(translate('pages.regulations.toastSuccessCreateEditTemplate'));
  return {
    type: actionsTypes.CREATE_EDIT_TEMPLATE_SUCCESS
  };
}

export function createEditTemplateFailure() {
  return { type: actionsTypes.CREATE_EDIT_TEMPLATE_FAILURE };
}

export function getTemplateRequest(data: any) {
  return {
    type: actionsTypes.GET_TEMPLATE_REQUEST,
    payload: data
  };
}

export function getTemplateSuccess(template: any) {
  return {
    type: actionsTypes.GET_TEMPLATE_SUCCESS,
    payload: template
  };
}

export function getTemplateFailure() {
  ToastError(
    translate('pages.regulations.toastErrorCreateEditRegulationGroup')
  );
  return { type: actionsTypes.GET_TEMPLATE_FAILURE };
}

export function getGroupRequest(id: number) {
  return {
    type: actionsTypes.GET_GROUP_REQUEST,
    payload: id
  };
}

export function getGroupRequestSuccess(data: any) {
  return {
    type: actionsTypes.GET_GROUP_SUCCESS,
    payload: data
  };
}

export function getGroupRequestFailure() {
  ToastError(translate('pages.regulations.toastErrorGetRegulationGroup'));
  return { type: actionsTypes.GET_GROUP_FAILURE };
}

export function downloadTemplatesRequest() {
  return {
    type: actionsTypes.DOWNLOAD_TEMPLATE_REQUEST
  };
}

export function downloadTemplatesRequestSuccess(data: any) {
  return {
    type: actionsTypes.DOWNLOAD_TEMPLATE_SUCCESS,
    payload: data
  };
}

export function downloadTemplatesRequestFailure() {
  ToastError(translate('pages.regulations.toastErrorGetRegulationGroup'));
  return { type: actionsTypes.DOWNLOAD_TEMPLATE_FAILURE };
}

export function clearTemplateData() {
  return {
    type: actionsTypes.CLEAR_TEMPLATE_DATA
  };
}

export function clearGroupData() {
  return {
    type: actionsTypes.CLEAR_GROUP_DATA
  };
}
export function clearSelectedTemplateData() {
  return {
    type: actionsTypes.CLEAR_SELECTED_TEMPLATE_DATA
  };
}

export const selectors = {
  groupTemplate: (state: { groupTemplate: any }) =>
    baseSelector(state).groupTemplate?.data?.message,
  adminGroupTemplate: (state: { groupTemplate: any }) =>
    baseSelector(state).adminGroupTemplate?.data?.message,
  groupTemplatePaginationInfo: (state: { groupTemplate: any }) =>
    baseSelector(state).groupTemplatePaginationInfo,
  adminGroupTemplatePaginationInfo: (state: { groupTemplate: any }) =>
    baseSelector(state).adminGroupTemplatePaginationInfo,
  groupForEdit: (state: { groupTemplate: any }) =>
    baseSelector(state).groupForEdit?.data?.message,
  urlTemplate: (state: { groupTemplate: any }) =>
    baseSelector(state).urlTemplate?.data?.message,
  templateForEdit: (state: { groupTemplate: any }) =>
    baseSelector(state).templateForEdit?.data?.message
};
