import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_FAILURE,
  FETCH_PAGE_DATA_SUCCESS,
} from './actionTypes'

const initialState = {
  isFetchingData: false,
  pageData: {},
  fetchDataErr: false,
  fetchDataErrMsg: '',
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGE_DATA:
      return {
        ...state,
        isFetchingData: true,
        fetchDataErr: false,
        fetchDataErrMsg: '',
      }
    case FETCH_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        pageData: action.data,
      }
    case FETCH_PAGE_DATA_FAILURE:
      return {
        ...state,
        isFetchingData: false,
        fetchDataErr: true,
        fetchDataErrMsg: action.err,
      }
    default:
      return state
  }
}
