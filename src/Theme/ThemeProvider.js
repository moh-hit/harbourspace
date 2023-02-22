import React, {
  useContext, useState, useEffect, useCallback,
} from 'react'
// import ReactGA from 'react-ga'

// import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles'
import debounce from 'lodash/debounce'
import withStyles from '@material-ui/styles/withStyles'
import { Globals } from 'react-spring'

// import { isEmpty } from 'lodash'
import ThemeContext from './ThemeContext'

import { LIGHT, DARK } from './style_consts'
import { DISPLAY_DEVICE, THEME_TYPE_MAP, PREFERENCES } from '../utils/consts'

const darkThemeTime = {
  start: '18:00', // in hours,
  end: '06:00',
}

let timer = null

// converts the nested theme object into a flat object with `--path-to-value` keys
function toVars(obj, prefix = '-') {
  const vars = {}
  Object.entries(obj).forEach((item) => {
    const [key, value] = item
    if (typeof value === 'object') {
      const nestedVars = toVars(value, `${prefix}-${key}`)
      Object.entries(nestedVars).forEach((nestedItem) => {
        const [nestedKey, nestedValue] = nestedItem
        vars[nestedKey] = nestedValue
      })
    } else {
      vars[`${prefix}-${key}`] = value
    }
  })

  return vars
}

const toggleAnimation = (showAnimation) => {
  if (!showAnimation) {
    document.querySelector('body').classList.add('animation-disabled')
  } else document.querySelector('body').classList.remove('animation-disabled')
  Globals.assign({
    skipAnimation: !showAnimation,
  })
}

const ThemeProvider = (props) => {
  const { children } = props
  const [themeMode, setThemeMode] = useState(THEME_TYPE_MAP.LIGHT.value)
  const [isDark, setIsDark] = useState(themeMode === THEME_TYPE_MAP.DARK.value)
  const [preferences, updatePref] = useState({
    [PREFERENCES.NOTIF_POPUP]: true,
    [PREFERENCES.NOTIF_SILENT]: false,
    [PREFERENCES.SHOW_ANIMATION]: true,
  })
  const [display, updateDisplay] = useState({
    displayDevice: DISPLAY_DEVICE.DESKTOP.value,
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    isMobile: false,
  })
  const [isFocused, updateWindowFocused] = useState(true)
  const resize = debounce(() => resizeHandler(), 1000)
  //
  const resizeHandler = () => {
    const currentWidth = window.innerWidth
    const currentHeight = window.innerHeight
    let isMobile = false
    let displayDevice = DISPLAY_DEVICE.DESKTOP.value
    if (currentWidth <= 786) {
      displayDevice = DISPLAY_DEVICE.MOBILE.value
      isMobile = true
    } else if (currentWidth <= 1024) {
      displayDevice = DISPLAY_DEVICE.TAB.value
    } else if (currentWidth <= 1440) {
      displayDevice = DISPLAY_DEVICE.DESKTOP.value
    } else if (currentWidth <= 1920) {
      displayDevice = DISPLAY_DEVICE.FHD.value
    } else {
      displayDevice = DISPLAY_DEVICE.UHD.value
    }
    updateDisplay({
      displayDevice, innerHeight: currentHeight, innerWidth: currentWidth, isMobile,
    })
  }
  useEffect(() => {
    window.addEventListener('resize', resize)
    resizeHandler()
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  //
  const onWindowFocus = () => {
    if (document.visibilityState === 'visible') {
      updateWindowFocused(true)
    } else {
      updateWindowFocused(false)
    }
  }
  // const onWindowBlur = () => {
  //   updateWindowFocused(false)
  // }
  useEffect(() => {
    window.addEventListener('visibilitychange', onWindowFocus)
    // window.addEventListener('blur', () => onWindowBlur)
    // document.addEventListener('visibilitychange', () =>)
    resizeHandler()
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  //
  useEffect(() => {
    startThemeTimer()
  }, [themeMode])

  const updatePreferences = (value, prefType) => {
    if (prefType) {
      updatePref({
        ...preferences,
        [prefType]: value,
      })
      if (prefType === PREFERENCES.SHOW_ANIMATION) toggleAnimation(value)
    } else {
      updatePref(value)
      toggleAnimation(value[PREFERENCES.SHOW_ANIMATION])
    }
  }
  const toggleTheme = (updatedMode) => {
    if (!Object.keys(THEME_TYPE_MAP).includes(updatedMode)) {
      return
    }
    if (timer) clearTimeout(timer)
    setThemeMode(updatedMode)
  }
  const startThemeTimer = useCallback(() => {
    if (themeMode === THEME_TYPE_MAP.AUTO.value) {
      if (timer) {
        clearTimeout(timer)
      }
      const hr = new Date().getHours()
      const min = new Date().getMinutes()
      let setAfterTime = 0 // seconds
      let remainingHrs = 0
      let remainingMin = 0
      let setToDark = false
      const endHr = parseInt(darkThemeTime.end.split(':')[0], 10)
      const endMin = parseInt(darkThemeTime.end.split(':')[1], 10)
      const startHr = parseInt(darkThemeTime.start.split(':')[0], 10)
      const startMin = parseInt(darkThemeTime.start.split(':')[1], 10)
      let isCurrentDark = false
      if (endHr === startHr) {
        if (startMin >= min) {
          remainingHrs = 0
          setToDark = startMin !== min
          isCurrentDark = startMin === min
          remainingMin = startMin === min ? endMin - min : startMin - min
        } else if (startMin < min && endMin > min) {
          remainingHrs = 0
          setToDark = false
          isCurrentDark = true
          remainingMin = endMin - min
        } else {
          remainingHrs = 24
          setToDark = endMin === min
          remainingMin = 60 - min
        }
      } else if (hr === startHr) {
        if (startMin >= min) {
          remainingHrs = 0
          remainingMin = startMin === min ? endMin - min : startMin - min
          setToDark = startMin !== min
          isCurrentDark = startMin === min
        } else if (startHr > endHr) {
          remainingHrs = hr <= endHr ? endHr - hr : 24 - hr
          remainingMin = 60 - min
          isCurrentDark = true
        } else {
          remainingHrs = endHr - hr
          remainingMin = 60 - min
          isCurrentDark = true
        }
      } else if (hr === endHr) {
        if (endMin < min) {
          setToDark = true
          remainingMin = (60 - min) + startMin
          if (endHr > startHr) {
            remainingHrs = hr <= startHr ? startHr - hr : 24 - hr
          } else {
            remainingHrs = startHr - hr
          }
        } else if (endMin >= min) {
          isCurrentDark = true
          remainingHrs = 0
          remainingMin = endMin - min
        }
      } else if ((hr > startHr || hr < endHr)) {
        if (startHr >= endHr) {
          remainingHrs = hr < endHr ? endHr - hr : 24 - hr
          setToDark = startHr === endHr
          isCurrentDark = true
        } else if (hr > endHr) {
          remainingHrs = 24 - hr
          setToDark = true
        } else {
          remainingHrs = endHr - hr
          isCurrentDark = true
        }
        remainingMin = 60 - min
      }
      if (isCurrentDark && remainingMin !== 0) {
        setIsDark(true)
      }
      // console.log(remainingHrs, remainingMin, hr, min, isCurrentDark, 'lol remina')
      setAfterTime = (remainingHrs * 60 * 60) + (remainingMin * 60)
      // console.log(hr, setAfterTime, setToDark, 'lol time')
      if (setAfterTime > 0 && setAfterTime < 1200) {
        timer = setTimeout(() => {
          setIsDark(setToDark)
        }, setAfterTime * 1000)
      }
    } else {
      setIsDark(themeMode === THEME_TYPE_MAP.DARK.value)
    }
  }, [themeMode])

  React.useLayoutEffect(() => {
    const vars = toVars(isDark ? DARK : LIGHT)
    let themeAnimTimer
    const ele = document.querySelector('body')

    ele.classList.add('toggle-theme-anim')
    Object.entries(vars).forEach((item) => {
      const [key, value] = item
      ele.style.setProperty(key, value)
    })
    if (themeAnimTimer) clearTimeout(themeAnimTimer)
    themeAnimTimer = setTimeout(() => {
      ele.classList.remove('toggle-theme-anim')
    }, 1000)
    return () => {
      if (themeAnimTimer) clearTimeout(themeAnimTimer)
    }
  }, [isDark])

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        isDark,
        startThemeTimer,
        ...display,
        isFocused,
        updatePreferences,
        preferences,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const theme = useContext(ThemeContext)
  return theme
}

/*
Eg:

const styles = (theme) => ({
  container: { backgroundColor: theme.BG_PRIMARY }
})

withTheme(styles)(WrappedComponent)
*/
export const withTheme = (stylesheetBuilder) => {
  return (Component) => {
    const Renderer = (props) => {
      const { forwardedRef } = props
      const theme = useTheme()
      Component.displayName = getDisplayName(Component)
      return (
        <Component
          {...props}
          {...theme}
          ref={forwardedRef}
          styles={props.classes}
          classes={{}}
        />
      )
    }
    Renderer.displayName = getDisplayName(Component)
    const WithTheme = withStyles(stylesheetBuilder)(Renderer)
    return React.forwardRef((props, ref) => {
      return <WithTheme {...props} forwardedRef={ref} />
    })
  }
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export default ThemeProvider
