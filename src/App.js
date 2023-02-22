import React, { Component } from 'react'
import { withTheme } from './Theme/ThemeProvider'
import CustomText from './UI/CustomText'

class App extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef()
  }

  render() {
    const { styles } = this.props
    return (
      <main className={`${styles.main}`} id="main" ref={this.crollRef}>
        <CustomText>HELLO</CustomText>
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
