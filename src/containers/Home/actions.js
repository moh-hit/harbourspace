import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_SUCCESS,
  FETCH_PAGE_DATA_FAILURE,
} from './actionTypes'

export function fetchPageData(params) {
  return {
    type: FETCH_PAGE_DATA,
    params,
  }
}

export function fetchPageDataFailure(error) {
  return {
    type: FETCH_PAGE_DATA_FAILURE,
    error,
  }
}

export function fetchPageDataSuccess(data) {
  return {
    type: FETCH_PAGE_DATA_SUCCESS,
    data,
  }
}
