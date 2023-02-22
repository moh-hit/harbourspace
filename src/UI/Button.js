import React from 'react'
import classnames from 'classnames'
import makeStyles from '@material-ui/styles/makeStyles'
import PropTypes from 'prop-types'

import Icon from './Icon'
import CustomText from './CustomText'

import {
  ICONS, SPACING, COLORS, theme, ASSETS,
} from '../Theme'
import { useTheme } from '../Theme/ThemeProvider'

const Button = ({
  btnStyles,
  children,
  mode, // this can have following values "text", "outlined", "contained"
  iconName,
  iconProps,
  text,
  labelColor,
  onPress,
  disabled,
  buttonColor,
  uppercase,
  labelStyle,
  roundness,
  // fullWidth,
  transparent,
  params,
  labelSize,
  labelWeight,
  animationStyles = {},
  btnRef,
  loading,
  respText,
}) => {
  const styles = stylesheet()
  const { innerWidth } = useTheme()
  let buttonLabelSize = labelSize
  if (respText && innerWidth > 768 && innerWidth < 1030) {
    buttonLabelSize = labelSize !== 'small' ? labelSize : 'small_0'
  }

  const btnClass = buttonColor ? styles[`${mode}_${buttonColor.toLowerCase()}`] : ''
  const onPressHandler = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (!disabled) {
      onPress(params, ev)
    }
  }
  let extraStyles = {}
  let extraStylesLabel = {}
  if (labelColor && !transparent) {
    extraStyles = {
      ...extraStyles, backgroundColor: theme[buttonColor] || COLORS[buttonColor.toUpperCase()],
    }
  }
  if (uppercase) extraStylesLabel = { textTransform: 'uppercase' }
  return (
    <button
      type="button"
      className={classnames(styles[mode], btnClass, btnStyles, disabled ? styles.disabledBtn : '')}
      onClick={onPressHandler}
      disabled={disabled}
      ref={btnRef}
      style={{ borderRadius: roundness, ...extraStyles, ...animationStyles }}
    >
      {loading ? (
        <div className={styles.loader}>
          <img src={ASSETS.DotLoaderWhite} alt="loading" className={styles.loaderImg} />
        </div>
      ) : (
        <>
          {Boolean(iconName) && (
          <Icon
            name={ICONS[iconName]}
            size={12}
            style={{ marginRight: text ? SPACING.SPACE_10 : 0 }}
            {...iconProps}
          />
          )}
          {Boolean(text) && (
          <CustomText
            color={mode === 'outlined' ? buttonColor : labelColor}
            className={classnames(styles.text, labelStyle)}
            style={extraStylesLabel}
            weight={labelWeight}
            size={buttonLabelSize}
          >
            {text}
          </CustomText>
          )}
          {children}
        </>
      )}
    </button>
  )
}

const stylesheet = makeStyles({
  contained: {
    padding: `${SPACING.SPACE_6} ${SPACING.SPACE_20}`,
    border: '1px solid transparent',
    verticalAlign: 'top',
    transition: 'all 0.3s var(--anim-func-ease)',
    '& $text': {
      color: `${COLORS.WHITE} !important`,
    },
  },
  outlined: {
    padding: `${SPACING.SPACE_6} ${SPACING.SPACE_20}`,
    border: '1px solid transparent',
  },
  contained_primary: {
    backgroundColor: COLORS.THEME_PRIMARY,
    borderColor: COLORS.THEME_PRIMARY,
  },
  contained_blue: {
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
  },
  contained_green: {
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.GREEN,
  },
  contained_red: {
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  contained_grey: {
    backgroundColor: COLORS.BACKDROP_BG,
    borderColor: COLORS.BACKDROP_BG,
  },
  contained_orange: {
    backgroundColor: COLORS.ORANGE,
    borderColor: COLORS.ORANGE,
  },
  contained_white: {
    // backgroundColor: COLORS.,
    borderColor: COLORS.WHITE,
  },
  contained_lightGrey: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
  outlined_blue: {
    borderColor: theme.linkColor,
    '&:hover': {
      backgroundColor: theme.blueLightBg,
    },
  },
  outlined_green: {
    borderColor: COLORS.GREEN,
    '&:hover': {
      backgroundColor: theme.greenLightBg,
    },
  },
  outlined_red: {
    borderColor: COLORS.RED,
    '&:hover': {
      backgroundColor: theme.redLightBg,
    },
  },
  outlined_orange: {
    borderColor: COLORS.ORANGE,
  },

  text: {
    backgroundColor: 'transparent',
  },
  text_blue: {
  },
  text_green: {
  },
  text_red: {
  },
  disabledBtn: {
    backgroundColor: theme.btnDisabled,
    borderColor: theme.btnDisabled,
  },
  loader: {
    width: '100%',
  },
  loaderImg: {
    width: '100%',
    maxWidth: 40,
  },
})

export default React.forwardRef((props, ref) => (
  <Button btnRef={ref} {...props} />
))

Button.propTypes = {
  mode: PropTypes.string,
  iconName: PropTypes.string,
  iconProps: PropTypes.object,
  roundness: PropTypes.number,
  labelSize: PropTypes.string,
  labelWeight: PropTypes.string,
  respText: PropTypes.bool,
}

Button.defaultProps = {
  mode: 'contained',
  iconName: '',
  iconProps: {},
  roundness: 6,
  labelSize: 'small',
  labelWeight: 'medium',
  respText: false,
}
