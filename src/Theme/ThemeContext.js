import React from 'react'
import { THEME_TYPE_MAP } from '../utils/consts'

const ThemeContext = React.createContext({
  themeMode: THEME_TYPE_MAP.LIGHT.value,
  themes: {},
  isDark: false,
  toggleTheme: () => {},
  setIsDark: () => {},
  displayDevice: 'desktop',
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  updatePreferences: () => {},
  preferences: {},
  isMobile: false,
})

export default ThemeContext
