import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Home from './Home'
import { fetchPageData } from './actions'

const mapStateToProps = (state) => {
  return {
    ...state.home,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPageData: params => dispatch(fetchPageData(params)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home),
)
