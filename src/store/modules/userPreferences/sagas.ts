/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import {
  searchUserPreferences,
  changeUserPreferences,
  changeToyotaRegion
} from '../../../services/api';
import {
  actionsTypes,
  getUserPreferencesFailure,
  getUserPreferencesSuccess,
  editUserPreferencesFailure,
  editUserPreferencesSuccess,
  editUserToyotaRegionSuccess,
  editUserToyotaRegionFailure
} from './actions';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* getUserPreferences() {
  try {
    const response: AxiosResponse<any> = yield call(searchUserPreferences);
    yield put(getUserPreferencesSuccess(response));
  } catch (error: any) {
    yield put(getUserPreferencesFailure());
  }
}

export function* editUserPreferences({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.EDIT_USER_PREFERENCES_REQUEST;
}) {
  try {
    yield call(changeUserPreferences, payload);
    localStorage.setItem('user.jurisdictions', payload.jurisdictions.join(','));
    localStorage.setItem('user.toyotaRegions', payload.toyotaRegions.join(','));
    localStorage.setItem(
      'user.reportJurisdictions',
      payload.reportJurisdictions.join(',')
    );
    yield put(editUserPreferencesSuccess());
  } catch (error: any) {
    yield put(editUserPreferencesFailure());
  }
}

export function* setUserToyotaRegion({
  payload
}: {
  payload: any;
  type: typeof actionsTypes.EDIT_USER_TOYOTA_REGION_REQUEST;
}) {
  try {
    yield call(changeToyotaRegion, payload);
    localStorage.setItem('user.toyotaRegion', payload);
    yield put(editUserToyotaRegionSuccess());
  } catch (error: any) {
    yield put(editUserToyotaRegionFailure());
  }
}

export default function* usersSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.GET_USER_PREFERENCES_REQUEST,
          getUserPreferences
        ),
        yield takeLatest(
          actionsTypes.EDIT_USER_PREFERENCES_REQUEST,
          editUserPreferences
        ),
        yield takeLatest(
          actionsTypes.EDIT_USER_TOYOTA_REGION_REQUEST,
          setUserToyotaRegion
        )
      ];
    })
  ]);
}
