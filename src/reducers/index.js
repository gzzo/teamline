import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { all } from 'redux-saga/effects'

import { reducer as sport, watchFetch as sportSaga } from './sport'

export function* rootSaga() {
  yield all([sportSaga()])
}

export const reducers = history =>
  combineReducers({
    sport,
    router: connectRouter(history),
  })
