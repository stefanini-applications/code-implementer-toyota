/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import { searchUsers, editUser } from '../../../services/api';
import {
  actionsTypes,
  getSearchUsersSuccess,
  getSearchUsersFailure,
  editUsersSuccess,
  editUsersFailure,
  getSearchUsersRequest,
  getUsersPaginationInfo
} from './actions';
import { IEditUsers, IGetUsersSearch } from './types';

interface TypedIterableIterator<T, N = any> {
  next(value: N): T;
}

export function* searchAllUsers({
  payload
}: {
  payload: IGetUsersSearch;
  type: typeof actionsTypes.LIST_SEARCH_USERS_REQUEST;
}) {
  try {
    const { 
      searchText, 
      pageNumber, 
      pageSize,
      sortKey,
      direction
    } = payload;
    const response: AxiosResponse<any> = yield call(searchUsers, {
      searchText,
      pageNumber,
      pageSize,
      sortKey,
      direction
    });
    const paginationInfo = response?.headers['x-pagination'];
    if (paginationInfo) {
      yield put(getUsersPaginationInfo(JSON.parse(paginationInfo)));
    }
    yield put(getSearchUsersSuccess(response));
  } catch (error: any) {
    yield put(getSearchUsersFailure());
  }
}

export function* editUsers({
  payload
}: {
  payload: IEditUsers;
  type: typeof actionsTypes.EDIT_USERS_REQUEST;
}) {
  try {
    const userRole = {
      userId: payload.userId,
      roleId: payload.roleId
    };
    yield call(editUser, userRole);
    yield put(
      getSearchUsersRequest({
        searchText: payload.searchText,
        pageNumber: payload.pageNumber,
        pageSize: payload.pageSize
      })
    );
    yield put(editUsersSuccess());
  } catch (error: any) {
    yield put(editUsersFailure());
  }
}

export default function* usersSagas() {
  yield all([
    fork(function* root(): TypedIterableIterator<any, any> {
      return [
        yield takeLatest(
          actionsTypes.LIST_SEARCH_USERS_REQUEST,
          searchAllUsers
        ),
        yield takeLatest(actionsTypes.EDIT_USERS_REQUEST, editUsers)
      ];
    })
  ]);
}
