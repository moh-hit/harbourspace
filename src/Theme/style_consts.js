const { innerWidth: windowWidth, innerHeight: windowHeight } = window

export const normalize = value => `${value}px`

// 300 is darker then 200

export const COLORS = {
  UNDERLAY: '#fbfbfb',
  SCREEN_BG: '#FBFDFF',
  BORDER_COLOR: '#00000012',
  INPUT_BORDER: '#BFCAD9',
  BACKDROP: '#636363',
  SHADOW_BLUE: '#f3f9ff', // e0e0ff
  SHADOW_GREY: '#eaeaea', // '#e7e7e7' '#dee3ff',
  SHADOW_GREY_LIGHT: '#F3F3F3',
  SHADOW_GREY_LIGHTER: '#F6F6F6',
  CHECKBOX_BORDER: '#e2e2e2',
  TEXT: '#000',
  WHITE: '#FFF',
  WHITE_60: '#FFFFFF60',
  REFERALHEADERBG: '#FFFBFA',
  REFERALHEADERBGDARK: '#1F2022',
  REFERAL_BG: '#FFF8F5',
  REFERAL_BG_DARK: '#1B1B1B',

  BLACK: '#000',
  BLACK_30: '#333232',
  BLACK_60: '#2E2D32',
  BLACK_80: '#2D2D2D', // light input bg
  BLACK_90: '#191B1B', // side bar
  BLACK_100: '#1B1B1B', // primary
  BLACK_200: '#161616', // screenerbg
  BLACK_600: 'rgb(169 174 181)', // #9BABC6', // text
  BLACK_500: '#7B828B',
  BLACK_700: '#54575A',
  BLACK_70: '#1B1B1B70',

  GREY: '#9BABC6',
  GREY_LIGHT: '#818181',
  GREY_000: 'rgba(255,255,255,0.9)',
  GREY_100: '#ECECEC',
  GREY_200: '#666666',
  GREY_300: '#313131',
  GREY_400: '#6B6B6B',
  GREY_500: '#5B5B5B',
  GREY_600: '#676767', // use when dark input bg
  GREY_700: '#8C8C8C', // use when lighter input bg
  GREY_800: '#323436', // scanner card chip
  GREY_900: '#5D5D5D',
  // #F6F6F6

  BLUE: '#0013F4',
  BLUE_000: '#EEEEFF',
  BLUE_100: '#EEEEFF',
  BLUE_200: '#DFDEFF',
  BLUE_300: '#3E72FF', // rgb(169 174 181)
  BLUE_400: '#140DFA',
  BLUE_500: '#E3F3EF',
  BLUE_DARK: '#0000fa',
  // BLUE_400: '#4400EF',
  // BLUE: '#2626B8'

  NAVY: '#3D5493',

  ORANGE: '#FF892E',
  ORANGE_000: '#FFFCFA',
  ORANGE_001: '#FDF3EA',
  ORANGE_100: '#FFEAD9',
  ORANGE_150: '#FFA1A1',
  ORANGE_200: '#FFB881',
  ORANGE_300: '#FD892E',
  ORANGE_400: '#3E3025',
  ORANGE_500: '#FFE6DE',

  YELLOW: '#FFDC88',
  YELLOW_000: '#FFF9E6',
  YELLOW_100: '#FFF9E6',
  YELLOW_200: '#FFF1C1',
  YELLOW_300: '#FFD700',
  YELLOW_400: '#FFC107',
  YELLOW_500: '#FFC107',
  YELLOW_600: '#F8B600',

  GREEN: '#3CBB00',
  GREEN_100: '#E2FFD5',
  GREEN_200: '#B6F09C',
  GREEN_300: '#449444',
  GREEN_DARK: '#39B43D',
  GREEN_LIGHT: '#E4FFE4',

  RED: '#EB1D54',
  RED_100: '#FFE2EB',
  RED_200: '#FF5B8D',
  RED_300: '#FF667D',
  RED_400: '#BA4E5D',
  DARK_RED_100: '#312024',

  PURPLE: '#A350FF',
  PURPLE_100: '#F0E5FF',
  PURPLE_200: '#32325A',
  PURPLE_500: '#CDC1FF',

  VOILET: '#6B0FE9', // #5534DA',
  VOILET_100: '',
  VOILET_200: '#EEE6FF',
  VOILET_400: '#372E4A',

  ORDERLOG_PROGRESS_BAR: '#FFC88A',
  YOUTUBE_RED: '#FF0000',
  KITE_ORANGE: '#F6461A',
  AB_BLUE: '#1D65AB',
  GOLDEN: '#FEC301',
  CONTENT_PLACEHOLDER: '#F2F2F2',
  CATEGORY_BLUE: '#0001FC',
  CATEGORY_GREEN: '#3DBC00',
  CATEGORY_VOILET: '',
  CATEGORY_YELLOW: '#FF892E',
  BOX_SHADOW: '#162B740A',
  DROPDOWN_SHADOW: '#162B7424',
  HOVER: '#F7F7FA',
  HOVER_DARK: '#2E2E2E',
  TABS_BG: '#F6F8FB',
  GAIN_BG: '#DEFFE7',
  LOSS_BG: '#FFEFEF',
  DROPDOWN_BG: '#F7F7FF',
  BACKDROP_BG: '#00000080',
  BROWN: '#954A0F',
  BAR_SELECTED: '#9595FF',
  USAGE_BG: '#D9D8FC',
  MAGENTA: '#b140b9',
  PINK: '#b70f4c',
  SCANNER_PINK: '#FF5B8D',
  STEPS_BAR: '#EAEDF4',
  STEPS_CIRCLE: '#DDDFFF',
  STEPS_CIRCLE_ERROR: '#ffdde5',

  // DO NOT CHANGE
  LIST_RED: '#FF4143',
  LIST_BLUE_100: '#E1E1FB',
  LIST_GREEN: '#0EC213',
  LIST_GREEN_100: '#B6EDB7',
  LIST_GREEN_200: '#6EDA71',
  LIST_RED_100: '#FFE4E8',

  THEME_PRIMARY: '#685DC5',

}

export const LIGHT = {
  red: COLORS.RED,
  green: COLORS.GREEN,
  orange: COLORS.ORANGE,
  purple: COLORS.PURPLE,
  voilet: COLORS.VOILET,
  peach: '#FCDECA',
  yellow: COLORS.YELLOW_400,

  // general colors
  bgPrimary: COLORS.WHITE,
  bgSecondary: COLORS.WHITE,
  bgTertiary: COLORS.WHITE,
  screenBg: COLORS.SCREEN_BG,
  bgSidebar: COLORS.WHITE,
  bgHeaderReferal: COLORS.REFERALHEADERBG,
  bgReferal: COLORS.REFERAL_BG,
  ReferalInput: COLORS.ORANGE_500,
  refText: COLORS.BLUE,

  btnPrimary: COLORS.BLUE,
  btnSecondary: '',
  btnDisabled: COLORS.GREY_100,

  text: COLORS.BLACK,
  textSecondary: COLORS.GREY_LIGHT,
  textTertiary: COLORS.BLACK,

  backdrop: COLORS.BACKDROP,
  borderColor: COLORS.BORDER_COLOR,

  notifBg: COLORS.BLUE_100,
  paperBg: COLORS.GREEN_100,
  scannerBg: COLORS.ORANGE_100,
  navBtnBg: COLORS.WHITE,
  navDotsBg: {
    false: COLORS.BLUE_200,
    true: COLORS.GREY,
  },
  navBtnShadow: 'rgb(208 210 220)',
  filterOptionBg: '#FAFAFF',

  // context specific colors
  inputDarkBg: COLORS.WHITE,
  placeholderDarkColor: COLORS.INPUT_BORDER,
  inputLightBg: COLORS.WHITE,
  placeholderLightColor: COLORS.GREY_100,
  inputFocusBorderColor: COLORS.BLUE,

  progress25: COLORS.RED_300,
  progress50: COLORS.BLUE_400,
  progress75: COLORS.GREEN,
  underlay: COLORS.UNDERLAY,
  linkColor: COLORS.BLUE, // '#2F44C6',
  linkWhite: COLORS.BLUE,
  linkGrey: COLORS.BLUE,
  primaryLink: COLORS.BLUE,
  secondaryLink: COLORS.BLUE,
  switchTrack: {
    false: COLORS.BLUE_100,
    true: COLORS.BLUE,
  },
  switchThumb: {
    false: COLORS.BORDER_COLOR,
    true: COLORS.BLUE_100,
  },
  disabled: COLORS.GREY_100,
  boxShadow: COLORS.BOX_SHADOW,
  dropdownShadow: COLORS.DROPDOWN_SHADOW,
  dropdownBg: COLORS.WHITE,
  listDropDownBg: COLORS.DROPDOWN_BG,
  hover: COLORS.HOVER,
  scannerTimeIntervalBg: COLORS.BLUE_100,
  lossBg: COLORS.LOSS_BG,
  gainBg: COLORS.GAIN_BG,
  inputBorder: COLORS.INPUT_BORDER,
  sell: COLORS.ORANGE,
  checkboxBorder: COLORS.CHECKBOX_BORDER,
  horizontalTabBg: COLORS.BLUE_100,
  tabsBg: COLORS.TABS_BG,
  activeTabsBg: COLORS.WHITE,
  stoppedBg: COLORS.GREY,
  createBtnBg: COLORS.ORANGE_000,
  cardPlaceHolderColor: COLORS.CONTENT_PLACEHOLDER,
  backdropBg: COLORS.BACKDROP_BG,
  tourBackdrop: '#0000004d',
  redLightBg: COLORS.RED_100,
  greyLightBg: COLORS.GREY_100,
  greenLightBg: COLORS.GREEN_100,
  blueLightBg: COLORS.BLUE_100,
  orangeLightBg: COLORS.ORANGE_100,
  purpleLightBg: COLORS.PURPLE_100,
  yellowLightBg: COLORS.YELLOW_100,

}

export const DARK = {
  red: COLORS.RED,
  green: COLORS.GREEN,
  orange: COLORS.ORANGE,
  purple: COLORS.PURPLE,
  voilet: COLORS.VOILET,
  peach: '#3E372A',
  yellow: COLORS.YELLOW_400,
  // general colors
  bgPrimary: COLORS.BLACK_100,
  bgSecondary: COLORS.BLACK_60, // 1f1f1f
  bgTertiary: COLORS.BLACK_30,
  screenBg: COLORS.BLACK_200,
  bgSidebar: COLORS.BLACK_90,
  bgHeaderReferal: COLORS.REFERALHEADERBGDARK,
  bgReferal: COLORS.REFERAL_BG_DARK,
  ReferalInput: COLORS.GREY_300,
  refText: COLORS.WHITE,

  btnPrimary: COLORS.BLUE_DARK,
  btnSecondary: COLORS.BLUE_300,
  btnDisabled: COLORS.BLACK_80,

  text: COLORS.WHITE,
  textSecondary: COLORS.BLACK_600,
  textTertiary: COLORS.BLACK_500,

  backdrop: COLORS.BACKDROP,
  borderColor: COLORS.BLACK_80,

  notifBg: '#2F44C6',
  paperBg: '#009109',
  scannerBg: '#FF892E',

  navBtnBg: '#4E4E4E',
  navDotsBg: {
    true: '#737881',
    false: '#3E3E3E',
  },
  navBtnShadow: 'rgba(22, 43, 116, 0.14)',
  // navDotsHover: '',

  // context specific colors
  inputDarkBg: COLORS.BLACK_100,
  placeholderDarkColor: COLORS.GREY_600,
  inputLightBg: COLORS.BLACK_80,
  placeholderLightColor: COLORS.GREY_700,
  inputFocusBorderColor: COLORS.BLUE_300,

  disabled: COLORS.GREY_300,
  progress25: COLORS.RED_300,
  progress50: COLORS.BLUE_300,
  progress75: COLORS.GREEN_300,
  underlay: COLORS.BLACK_200,
  linkColor: COLORS.BLUE_300,
  linkWhite: COLORS.WHITE,
  linkGrey: COLORS.BLACK_600,
  primaryLink: COLORS.WHITE,
  secondaryLink: COLORS.BLACK_500,
  switchTrack: {
    false: COLORS.BLACK_80,
    true: COLORS.BLUE_300,
  },
  switchThumb: {
    false: COLORS.WHITE,
    true: COLORS.WHITE,
  },
  boxShadow: COLORS.BOX_SHADOW,
  dropdownShadow: COLORS.DROPDOWN_SHADOW,
  dropdownBg: '#242727',
  listDropDownBg: COLORS.BLACK_80,
  hover: COLORS.HOVER_DARK,
  scannerTimeIntervalBg: '#23233C',
  lossBg: '#2C2121',
  gainBg: '#1D241A',
  inputBorder: '#7070701A', // COLORS.GREY_600,
  sell: COLORS.ORANGE,
  checkboxBorder: COLORS.BLACK_600,
  horizontalTabBg: COLORS.BLACK_30,
  tabsBg: COLORS.BLACK_80,
  activeTabsBg: COLORS.BLACK_80,
  stoppedBg: COLORS.BLACK_700,
  createBtnBg: COLORS.BLACK_100,
  cardPlaceHolderColor: COLORS.BLACK_30,
  backdropBg: '#00000060',
  tourBackdrop: '#00000060', // #9a9a9a1f',
  filterOptionBg: '#2B2B2B',
  redLightBg: COLORS.DARK_RED_100,
  greyLightBg: '#292929',
  greenLightBg: '#1B2F12',
  blueLightBg: '#23233C',
  yellowLightBg: '#3D3D3D',
  orangeLightBg: COLORS.ORANGE_100,
  purpleLightBg: COLORS.PURPLE_100,
}

export const FONTS = {
  TINY_1: normalize(8),
  TINY: normalize(9),
  SMALL_0: normalize(11),
  SMALL: normalize(12),
  SMALL_1: normalize(13),
  REGULAR: 13, // 16
  REGULAR_1: normalize(14),
  REGULAR_2: normalize(15),
  MEDIUM: normalize(16), // 18
  MEDIUM_1: normalize(18),
  LARGE: normalize(20),
  LARGE_1: normalize(23),
  LARGE_25: normalize(25),
  LARGE_2: normalize(28),
  LARGE_3: normalize(30),
  LARGE_4: normalize(32),
  LARGE_5: normalize(34),
  LARGE_48: normalize(48),
  XLARGE: normalize(36),
  LARGE_68: normalize(68),
}

export const FONTWEIGHT = {
  LIGHT: 200,
  REGULAR: 300,
  MEDIUM: 400,
  SEMI_BOLD: 600,
}

export const SPACING = {
  SPACE_2: normalize(2),
  SPACE_4: normalize(4),
  SPACE_5: normalize(5),
  SPACE_6: normalize(6),
  SPACE_8: normalize(8),
  SPACE_10: normalize(10),
  SPACE_11: normalize(11),
  SPACE_12: normalize(12),
  SPACE_14: normalize(14),
  SPACE_16: normalize(16),
  SPACE_18: normalize(18),
  SPACE_20: normalize(20),
  SPACE_22: normalize(22),
  SPACE_24: normalize(24),
  SPACE_28: normalize(28),
  SPACE_30: normalize(30),
  SPACE_32: normalize(32),
  SPACE_34: normalize(34),
  SPACE_36: normalize(36),
  SPACE_38: normalize(38),
  SPACE_40: normalize(40),
  SPACE_48: normalize(48),
  SPACE_50: normalize(50),
  SPACE_54: normalize(54),
  SPACE_60: normalize(60),
  SPACE_64: normalize(64),
  SPACE_68: normalize(68),
  SPACE_96: normalize(96),
  HEADER_HEIGHT: 54,
  HEADER_HEIGHT_MOBILE: 60,
}

export const FONTFAMILY = {
  REGULAR: 300,
  SEMI_BOLD: 500,
  MEDIUM: 400,
}

export const DIMENSIONS = {
  HEIGHT: windowHeight,
  WIDTH: windowWidth,
  SPACE_VERTICAL: SPACING.SPACE_20,
  SPACE_HORIZONTAL: SPACING.SPACE_96,
  HEADER_SEPERATOR: SPACING.SPACE_14,
  ROW_SEPERATOR: SPACING.SPACE_20,
  SECTION_SEPERATOR: SPACING.SPACE_24,
  INPUT_VERTICAL: SPACING.SPACE_12,
  HEADER_HEIGHT: SPACING.SPACE_54,
  HEADER_HEIGHT_MOBILE: SPACING.SPACE_60,
  SPACE_SECTION: SPACING.SPACE_96,
}
