/**
 *   @akshay
 *   how to use
 *   <CustomText color="textSecondary" size="large"></CustomText>
 */

import React from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'

import {
  COLORS, FONTS, FONTWEIGHT, theme,
} from '../Theme'

const CustomText = ({
  className,
  style,
  color = 'text',
  weight = 'regular',
  size = 'regular',
  children,
  center,
  flex,
  extraProps,
  ellipsis,
  textRef,
}) => {
  const fontWeight = weight ? FONTWEIGHT[weight.toUpperCase()] : 'regular'
  let extraStyles = {}
  if (center) {
    extraStyles = {
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    }
  }
  if (flex) {
    extraStyles = {
      ...extraStyles,
      flex,
    }
  }
  if (ellipsis) {
    extraStyles = {
      ...extraStyles,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }
  const styles = {
    fontWeight,
    fontSize: FONTS[size.toUpperCase()],
    // transition: 'all 0.3s var(--anim-func-ease)', // DANGER
    ...extraStyles,
    color: theme[color] || COLORS[color.toUpperCase()] || color,
    ...style,
  }
  return (
    <animated.p
      className={className}
      style={styles}
      ref={textRef}
      {...extraProps}
    >
      {children}
    </animated.p>
  )
}

CustomText.defaultProps = {
  weight: 'regular',
  size: 'regular',
  className: '',
  color: 'text',
  extraProps: {},
  center: false,
  flex: 0,
  ellipsis: false,
  textRef: null,
}

CustomText.propTypes = {
  weight: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  extraProps: PropTypes.object,
  center: PropTypes.bool,
  flex: PropTypes.number,
  className: PropTypes.string,
  ellipsis: PropTypes.bool,
  textRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}

export default React.forwardRef((props, ref) => (
  <CustomText textRef={ref} {...props} />
))
