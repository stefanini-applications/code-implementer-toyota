/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import history from '../../../routes/history';
import {
  listRegulationsAdmin,
  listRegulationRecord,
  getRegulationSubstancePhase,
  createRegulationRecord,
  editRegulationRecord,
  deleteRegulations
} from '../../../services/api';
import { IGetSearchResults as IGetSearchResultsRegulations } from '../searchResults/types';
import {
  actionsTypes,
  getRegulationsRequest,
  getRegulationsSuccess,
  getRegulationsFailure,
  getRegulationRecordSuccess,
  getRegulationRecordFailure,
  getRegulationsPaginationInfo,
  getRegulationSubstancePhaseSuccess,
  createRegulationRecordSuccess,
  createRegulationRecordFailure,
  editRegulationRecordSuccess,
  editRegulationRecordFailure,
  getRegulationRecordRequest,
  deleteRegulationRecordSuccess,
  deleteRegulationRecordFailure
} from './actions';
import { IGetRegulationRecord, INewRegulation, IEditRegulation } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* findRegulations({
  payload
}: {
  payload: IGetSearchResultsRegulations;
  type: typeof actionsTypes.LIST_REGULATIONS_REQUEST;
}) {
  try {
    const { type, searchText, pageNumber, pageSize,sortKey,direction,originregulationID } = payload;

    // Set recordType to 'Both' if 'type' is 'Both', otherwise default to 'Regulation'
    const recordType = type === 'Both' ? 'Both' : 'Regulation';
    const response: AxiosResponse<any> = yield call(listRegulationsAdmin, {
      recordType,
      searchText,
      pageNumber,
      pageSize,
      loading:true,
      sortKey,
      direction, 
      originregulationID, 
    });
    
    const paginationInfo = response?.headers['x-pagination'];
    yield put(getRegulationsPaginationInfo(JSON.parse(paginationInfo)));
    yield put(getRegulationsSuccess(response));
  } catch (error: any) {
    yield put(getRegulationsFailure());
  }
}

export function* findRegulationRecord({
  payload
}: {
  payload: IGetRegulationRecord;
  type: typeof actionsTypes.LIST_REGULATION_RECORD_REQUEST;
}) {
  try {
    const { id } = payload;
    const response: AxiosResponse<any> = yield call(listRegulationRecord, {
      id
    });
    yield put(getRegulationRecordSuccess(response));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(getRegulationRecordFailure());
    }
  }
}

export function* findRegulationSubstancePhase({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.REGULATION_SUBSTANCE_PHASE;
}) {
  try {
    const { regulationId, substanceId } = payload;
    const response: AxiosResponse<any> = yield call(
      getRegulationSubstancePhase,
      {
        regulationId,
        substanceId
      }
    );
    yield put(getRegulationSubstancePhaseSuccess(response));
  } catch (error: any) {
    yield put(getRegulationsFailure());
  }
}

export function* createNewRegulationRecord({
  payload
}: {
  payload: INewRegulation;
  type: typeof actionsTypes.CREATE_REGULATION_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      billTitle,
      nickname,
      year,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags
    } = payload;
    const response = yield call(createRegulationRecord, {
      billTitle,
      nickname,
      year,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags
    });
    yield put(createRegulationRecordSuccess(response?.data?.message));

    history.push(`/regulation/${response.data.message.id}`);
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(createRegulationRecordFailure());
    }
  }
}

export function* changeRegulationRecord({
  payload
}: {
  payload: IEditRegulation;
  type: typeof actionsTypes.EDIT_REGULATION_RECORD_REQUEST;
}): TypedIterableIterator<any, any> {
  try {
    const {
      id,
      billTitle,
      nickname,
      year,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags
    } = payload;
    const response = yield call(editRegulationRecord, {
      id,
      billTitle,
      nickname,
      year,
      billEpaDocket,
      recordType,
      typeId,
      categoryId,
      agencyId,
      jurisdictionId,
      active,
      tags
    });
    yield put(editRegulationRecordSuccess(response));
    yield put(getRegulationRecordRequest({ id }));
  } catch (error: any) {
    if (error.response.status !== 401) {
      yield put(editRegulationRecordFailure());
    }
  }
}

export function* deleteRegulationsRecord({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.DELETE_REGULATION_RECORD_REQUEST;
}) {
  try {
    const response: AxiosResponse<any> = yield call(deleteRegulations, payload);
    yield put(
      getRegulationsRequest({
        searchText: '',
        type: 'Regulation',
        pageNumber: 1,
        pageSize: 10,
        sortKey:'',
        direction:''
      })
    );
    yield put(deleteRegulationRecordSuccess());
  } catch (error: any) {
    yield put(deleteRegulationRecordFailure(error));
  }
}

export default function* regulationsSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_REGULATIONS_REQUEST,
          findRegulations
        ),
        yield takeLatest(
          actionsTypes.LIST_REGULATION_RECORD_REQUEST,
          findRegulationRecord
        ),
        yield takeLatest(
          actionsTypes.REGULATION_SUBSTANCE_PHASE,
          findRegulationSubstancePhase
        ),
        yield takeLatest(
          actionsTypes.CREATE_REGULATION_RECORD_REQUEST,
          createNewRegulationRecord
        ),
        yield takeLatest(
          actionsTypes.EDIT_REGULATION_RECORD_REQUEST,
          changeRegulationRecord
        ),
        yield takeLatest(
          actionsTypes.DELETE_REGULATION_RECORD_REQUEST,
          deleteRegulationsRecord
        )
      ];
    })
  ]);
}
