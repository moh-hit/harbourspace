import React from 'react'
import {
  Route,
} from 'react-router-dom'

// import { pathname_mapping } from './utils/navigationConstant'

// const Discover = lazy(() => import('./containers/MarketPlace/Discover-redux'))

export const commonRoutes = [
  // { Component: Auth, path: pathname_mapping.Auth, exact: true },
]

const CommonRoutes = () => {
  return (
    commonRoutes.map((item) => {
      const { path, exact, Component } = item
      return (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={props => (
            // pass the sub-routes down to keep nesting
            <Component {...props} />
          )}
        />
      )
    })
  )
}

export default CommonRoutes
