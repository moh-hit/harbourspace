import React from 'react'
import PropTypes from 'prop-types'

import Icons from '../Theme/svg-defs.svg'

const Icon = ({
  name, color, size, style = {}, className = '', extraProps = {},
}) => (
  <svg
    className={`icon icon-${name} ${className}`}
    fill={color}
    width={size}
    height={size}
    style={{ ...style, pointerEvents: 'none' }}
    {...extraProps}
  >
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
}

Icon.defaultProps = {
  color: '#000000',
  size: 16,
}

export default Icon
