import { all, fork } from 'redux-saga/effects'

import * as homeSagas from './containers/Home/Home-saga'

const home = Object.values(homeSagas).map((saga) => {
  return fork(saga)
})

export default function* root() {
  yield all([
    ...home,
  ])
}
