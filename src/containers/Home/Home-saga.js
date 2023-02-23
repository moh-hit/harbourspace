import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects'
import {
  FETCH_PAGE_DATA,
} from './actionTypes'
import {
  fetchPageDataFailure,
  fetchPageDataSuccess,
} from './actions'
import { getRequest } from '../../utils/apiRequests'

function* fetchPageData() {
  try {
    const url = 'https://harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab'
    const response = yield call(
      getRequest, url, {}, { 'content-type': 'application/json' }, false,
    )
    console.log('🚀 => file: Home-saga.js:22 => function*fetchPageData => response:', response)

    if (!response.error) {
      yield put(fetchPageDataSuccess(response))
    } else {
      yield put(fetchPageDataFailure(response.error_msg || 'Some error occurred'))
    }
  } catch (err) {
    yield put(fetchPageDataFailure(err))
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* fetchPageDataSaga() {
  yield takeLatest(FETCH_PAGE_DATA, fetchPageData)
}
