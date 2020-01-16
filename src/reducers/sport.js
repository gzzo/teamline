import { takeLatest } from 'redux-saga/effects'

import { requestSaga, receiveType } from 'api/v1'

const FETCH_PAIRING = 'pairings/FETCH_PAIRING'
const HIGHLIGHT_LINE = 'pairings/HIGHLIGHT_LINE'
const SELECT_LINE = 'pairings/SELECT_LINE'

export const fetchPairing = sportName => {
  return {
    type: FETCH_PAIRING,
    path: `/pairings/${sportName}.json`,
    sportName,
  }
}

export const highlightLine = (sportName, lineType, lineId) => {
  return {
    type: HIGHLIGHT_LINE,
    sportName,
    lineType,
    lineId,
  }
}

export const selectLine = (sportName, lineType, lineId) => {
  return {
    type: SELECT_LINE,
    sportName,
    lineType,
    lineId,
  }
}

export function* watchFetch() {
  yield takeLatest(FETCH_PAIRING, requestSaga)
}

const initialState = {
  sports: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case receiveType(FETCH_PAIRING): {
      return {
        sports: {
          ...state.sports,
          [action.sportName]: {
            ...state.sports[action.sportName],
            ...action.response,
            isLoaded: true,
          },
        },
      }
    }

    case HIGHLIGHT_LINE: {
      const sport = state.sports[action.sportName]
      const line = sport[action.lineType][action.lineId]

      return {
        sports: {
          ...state.sports,
          [action.sportName]: {
            ...sport,
            [action.lineType]: {
              ...sport[action.lineType],
              [action.lineId]: {
                ...line,
                isHighlighted: !line.isHighlighted,
              },
            },
          },
        },
      }
    }

    case SELECT_LINE: {
      const sport = state.sports[action.sportName]
      const line = sport[action.lineType][action.lineId]

      return {
        sports: {
          ...state.sports,
          [action.sportName]: {
            ...sport,
            [action.lineType]: {
              ...sport[action.lineType],
              [action.lineId]: {
                ...line,
                isSelected: !line.isSelected,
              },
            },
          },
        },
      }
    }

    default: {
      return state
    }
  }
}
