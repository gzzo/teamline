import { put, call } from 'redux-saga/effects'

export const fetchAPI = path => {
  return fetch(path)
    .then(response => {
      return {
        response,
      }
    })
    .catch(error => {
      return {
        error,
      }
    })
}

export const receiveType = type => {
  return `${type}_RECEIVE`
}

const receiveAction = (action, response) => {
  return {
    ...action,
    type: receiveType(action.type),
    response,
  }
}

export function* requestSaga(action) {
  const { path } = action
  const { response, error } = yield call(fetchAPI, path)

  if (error || response.ok === false) {
    return
  }

  const responseJson = yield call([response, 'json'])
  yield put(receiveAction(action, responseJson))
}
