import { ToastSuccess, ToastError } from '../../../components/Toast/index';
import { translate } from '../../../locales';
import { IGetSearchResults } from '../searchResults/types';
import { IGetRegulationRecord, INewRegulation, IEditRegulation } from './types';

export const actionsTypes = {
  LIST_REGULATIONS_REQUEST: '@regulations/LIST_REGULATIONS_REQUEST',
  LIST_REGULATIONS_SUCCESS: '@regulations/LIST_REGULATIONS_SUCCESS',
  LIST_REGULATIONS_FAILURE: '@regulations/LIST_REGULATIONS_FAILURE',
  LIST_REGULATION_RECORD_REQUEST: '@regulations/LIST_REGULATION_RECORD_REQUEST',
  LIST_REGULATION_RECORD_SUCCESS: '@regulations/LIST_REGULATION_RECORD_SUCCESS',
  LIST_REGULATION_RECORD_FAILURE: '@regulations/LIST_REGULATION_RECORD_FAILURE',
  REGULATIONS_PAGINATION_INFO: '@regulations/REGULATIONS_PAGINATION_INFO',
  REGULATION_SUBSTANCE_PHASE: '@regulations/REGULATIONS_SUBSTANCE_PHASE',
  REGULATION_SUBSTANCE_PHASE_SUCCESS:
    '@regulations/REGULATION_SUBSTANCE_PHASE_SUCCESS',
  CREATE_REGULATION_RECORD_REQUEST:
    '@regulations/CREATE_REGULATION_RECORD_REQUEST',
  CREATE_REGULATION_RECORD_SUCCESS:
    '@regulations/CREATE_REGULATION_RECORD_SUCCESS',
  CREATE_REGULATION_RECORD_FAILURE:
    '@regulations/CREATE_REGULATION_RECORD_FAILURE',
  EDIT_REGULATION_RECORD_REQUEST: '@regulations/EDIT_REGULATION_RECORD_REQUEST',
  EDIT_REGULATION_RECORD_SUCCESS: '@regulations/EDIT_REGULATION_RECORD_SUCCESS',
  EDIT_REGULATION_RECORD_FAILURE: '@regulations/EDIT_REGULATION_RECORD_FAILURE',
  DELETE_REGULATION_RECORD_REQUEST:
    '@regulations/DELETE_REGULATION_RECORD_REQUEST',
  DELETE_REGULATION_RECORD_SUCCESS:
    '@regulations/DELETE_REGULATION_RECORD_SUCCESS',
  DELETE_REGULATION_RECORD_FAILURE:
    '@regulations/DELETE_REGULATION_RECORD_FAILURE',
};

const baseSelector = (state: { regulations: any }) => state.regulations;

export function getRegulationsRequest(data: IGetSearchResults) {
  return { type: actionsTypes.LIST_REGULATIONS_REQUEST, payload: data };
}

export function getRegulationsSuccess(regulations: any) {
  return {
    type: actionsTypes.LIST_REGULATIONS_SUCCESS,
    payload: regulations
  };
}

export function getRegulationsFailure() {
  return { type: actionsTypes.LIST_REGULATIONS_FAILURE };
}

export function getRegulationRecordRequest(data: IGetRegulationRecord) {
  return { type: actionsTypes.LIST_REGULATION_RECORD_REQUEST, payload: data };
}

export function getRegulationRecordSuccess(regulationRecord: any) {
  return {
    type: actionsTypes.LIST_REGULATION_RECORD_SUCCESS,
    payload: regulationRecord
  };
}

export function getRegulationRecordFailure() {
  return { type: actionsTypes.LIST_REGULATION_RECORD_FAILURE };
}

export function getRegulationsPaginationInfo(paginationInfo: any) {
  return {
    type: actionsTypes.REGULATIONS_PAGINATION_INFO,
    payload: paginationInfo
  };
}
export function getRegulationSubstancePhase(
  regulationId: any,
  substanceId: any
) {
  return {
    type: actionsTypes.REGULATION_SUBSTANCE_PHASE,
    payload: {
      regulationId,
      substanceId
    }
  };
}
export function getRegulationSubstancePhaseSuccess(regulations: any) {
  return {
    type: actionsTypes.REGULATION_SUBSTANCE_PHASE_SUCCESS,
    payload: regulations
  };
}

export function createRegulationRecordRequest(newRecord: INewRegulation) {
  return {
    type: actionsTypes.CREATE_REGULATION_RECORD_REQUEST,
    payload: newRecord
  };
}

export function createRegulationRecordSuccess(newRegulationRecord: any) {
  ToastSuccess(translate('pages.regulations.toastSuccessNewRegulation'));
  return {
    type: actionsTypes.CREATE_REGULATION_RECORD_SUCCESS,
    payload: newRegulationRecord
  };
}

export function createRegulationRecordFailure() {
  return { type: actionsTypes.CREATE_REGULATION_RECORD_FAILURE };
}

export function editRegulationRecordRequest(editRecord: IEditRegulation) {
  return {
    type: actionsTypes.EDIT_REGULATION_RECORD_REQUEST,
    payload: editRecord
  };
}

export function editRegulationRecordSuccess(editRegulationRecord: any) {
  ToastSuccess(translate('pages.regulations.toastSuccessEditRegulation'));
  return {
    type: actionsTypes.EDIT_REGULATION_RECORD_SUCCESS,
    payload: editRegulationRecord
  };
}

export function editRegulationRecordFailure() {
  return { type: actionsTypes.EDIT_REGULATION_RECORD_FAILURE };
}

export function deleteRegulationRecordRequest(payload) {
  return {
    type: actionsTypes.DELETE_REGULATION_RECORD_REQUEST,
    payload
  };
}

export function deleteRegulationRecordSuccess() {
  ToastSuccess(translate('pages.regulations.toastSuccessDeleteRegulation'));
  return {
    type: actionsTypes.DELETE_REGULATION_RECORD_SUCCESS
  };
}

export function deleteRegulationRecordFailure(error: any) {
  return { type: actionsTypes.DELETE_REGULATION_RECORD_FAILURE };
}

export const selectors = {
  regulations: (state: { regulations: any }) =>
    baseSelector(state).regulations?.data?.message,
  regulationRecord: (state: { regulations: any }) =>
    baseSelector(state).regulationRecord?.data?.message,
  regulationsPaginationInfo: (state: { regulations: any }) =>
    baseSelector(state).regulationsPaginationInfo,
  regulationSubstancePhase: (state: { regulations: any }) =>
    baseSelector(state).regulationSubstancePhase?.data?.message,
  newRegulationRecord: (state: { regulations: any }) =>
    baseSelector(state).newRegulationRecord,
  editRegulationRecord: (state: { regulations: any }) =>
    baseSelector(state).editRegulationRecord
};
