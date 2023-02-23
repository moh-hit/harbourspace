import {
  combineReducers, applyMiddleware, createStore, compose,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

/* eslint-disable-next-line import/no-cycle */
import rootSaga from './rootSaga'
import home from './containers/Home/Home-reducer'

const appReducer = combineReducers({
  home,
})

let enhancer

const sagaMiddleware = createSagaMiddleware()

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(sagaMiddleware)
} else {
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      maxAge: 25,
    })
    : compose
  enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
}

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_USER_DETAILS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
