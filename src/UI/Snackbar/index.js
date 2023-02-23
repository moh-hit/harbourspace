import React, { Component } from 'react'

import SnackbarPopup from './SnackBarPopup'

import { withTheme } from '../../Theme/ThemeProvider'
import { SPACING } from '../../Theme'

const SnackbarRef = React.createRef()

class Snackbar extends Component {
  state = {
    msgList: [],
  }

  hideSnackbar = (renderKey) => {
    this.setState(prevState => ({
      msgList: prevState.msgList.filter(item => item.renderKey !== renderKey),
    }))
  }

  updateList(msg, {
    showDelay, hideDelay, showReadMore, link,
    readMoreText,
  }, msgType, renderKey) {
    this.setState((prevState) => {
      const modList = [...prevState.msgList]
      modList.push({
        renderKey,
        msg,
        msgType,
        showDelay,
        hideDelay,
        showReadMore,
        readMoreText,
        link,
      })
      return ({
        msgList: modList,
      })
    })
  }

  render() {
    const { styles, isDark } = this.props
    const { msgList } = this.state
    let content = null
    if (msgList.length) {
      content = msgList.map(item => (
        <SnackbarPopup
          key={item.renderKey}
          styles={styles}
          isDark={isDark}
          {...item}
          updateSnackbar={this.hideSnackbar}
        />
      ))
    }
    return <div className="snackbar-container hideScrollbar">{content}</div>
  }
}

const stylesheet = ({
  snackbar: {
    padding: '8px 12px 8px 20px',
    marginBottom: 15,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 280,
    transition: 'all 1s var(--anim-func-bouncy)',
    zIndex: 999999999,
  },
  closeBtn: {
    borderRadius: '50%',
    display: 'flex',
    height: '30px',
    width: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.SPACE_10,
    '&:hover': {
      backgroundColor: '#00000012',
    },
  },
})

const SnackbarWithTheme = withTheme(stylesheet)(Snackbar)
const SnackbarComponent = <SnackbarWithTheme ref={SnackbarRef} />

export const showSnackbar = (msg, duration = {}, type, id = 0) => {
  if (SnackbarRef.current) {
    SnackbarRef.current.updateList(msg, duration, type, Math.random() + id)
  }
}

export default SnackbarComponent
