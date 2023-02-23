import React, { Component } from 'react'
import Header from './components/Common/Header'
import HeroSection from './containers/Home/HeroSection'
import { withTheme } from './Theme/ThemeProvider'
import About from './containers/Home/About'
import Faq from './containers/Home/Faq'
import Testimonials from './containers/Home/Testimonials'
import Footer from './components/Common/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef()
  }

  render() {
    const { styles, isMobile } = this.props
    return (
      <main className={`${styles.main}`} id="main" ref={this.scrollRef}>
        <Header />
        <HeroSection />
        <About />
        <Testimonials />
        <Faq />
        {!isMobile && <Footer />}
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
