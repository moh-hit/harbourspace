import { ICONS } from '../Theme'

// value and key name shud be same
export const THEME_TYPE_MAP = {
  DARK: {
    label: 'Dark', value: 'DARK', icon: ICONS.MOON_CRESCENT_FILLED, iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
  LIGHT: {
    label: 'Light', value: 'LIGHT', icon: ICONS.SUN, iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
  AUTO: {
    label: 'Auto', value: 'AUTO', icon: ICONS.MOON_CRESCENT_OUTLINED_FILLED, iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
}

export const PREFERENCES = {
  THEME: 'theme',
}

export const DISPLAY_DEVICE = {
  MOBILE: {
    value: 0, valueKey: 'mobile',
  },
  TAB: {
    value: 1, valueKey: 'tab',
  },
  DESKTOP: {
    value: 2, valueKey: 'desktop',
  },
  FHD: {
    value: 3, valueKey: '2k',
  },
  UHD: {
    value: 4, valueKey: '4k',
  },
  SMALL_MOBILE: {
    value: 5, valueKey: 'smallMobile',
  },
}
