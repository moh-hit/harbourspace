import React from 'react'
import PropTypes from 'prop-types'

const Dot = React.memo(({
  color,
  size,
  styles,
}) => {
  const calcStyles = {
    borderRadius: '50%',
    height: size,
    width: size,
    backgroundColor: color,
    display: 'inline-block',
    ...styles,
  }
  return (
    <div style={calcStyles} />
  )
})

export default Dot

Dot.defaultProps = {
  size: 6,
  color: '#000',
}

Dot.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
