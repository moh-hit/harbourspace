import React, { Component } from 'react'
import Header from './components/Common/Header'
import { withTheme } from './Theme/ThemeProvider'

class App extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef()
  }

  render() {
    const { styles } = this.props
    return (
      <main className={`${styles.main}`} id="main" ref={this.scrollRef}>
        <Header />
      </main>
    )
  }
}

const stylesheet = theme => ({
  main: {
    height: '100vh',
    // do not change this other this are dependent on scrollBehavior
    // search for getElementById('main')
    overflow: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.screenBg,
    // pos = relative used for tour
    position: 'relative',
  },
})

export default withTheme(stylesheet)(App)
