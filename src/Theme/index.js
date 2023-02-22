import ASSETS from './assets'
import {
  COLORS,
  LIGHT,
  DARK,
  FONTS,
  DIMENSIONS,
  FONTWEIGHT,
  normalize,
  SPACING,
} from './style_consts'
import ICONS from './icons'

// converts the nested theme object with theme values into one with
// the theme variables as the value
function toVarNames(obj, prefix = '-') {
  const vars = {}
  Object.entries(obj).forEach((item) => {
    const [key, value] = item
    if (typeof value === 'object') {
      vars[key] = toVarNames(value, `${prefix}-${key}`)
    } else {
      vars[key] = `var(${prefix}-${key})`
    }
  })
  return vars
}
// create a variables object with any theme:
const theme = toVarNames(LIGHT)

export {
  ASSETS,
  // ANIMATIONS,
  COLORS,
  LIGHT,
  DARK,
  FONTS,
  DIMENSIONS,
  FONTWEIGHT,
  ICONS,
  SPACING,
  normalize,
  theme,
}
