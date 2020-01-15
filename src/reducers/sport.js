import { takeLatest } from 'redux-saga/effects'

import { requestSaga, receiveType } from 'api/v1'

const FETCH_PAIRING = 'pairings/FETCH_PAIRING'

export const fetchPairing = sport => {
  return {
    type: FETCH_PAIRING,
    path: `/pairings/${sport}.json`,
    sport
  }
}

export function* watchFetch() {
  yield takeLatest(FETCH_PAIRING, requestSaga)
}

const initialState = {
  sports: {}
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case receiveType(FETCH_PAIRING): {

      return {
        sports: {
          ...state.sports,
          [action.sport]: {
            ...state.sports[action.sport],
            ...action.response,
          }
        }
      }
    }

    default: {
      return state
    }
  }
}
