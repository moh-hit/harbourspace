import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'
import CustomText from '../CustomText'

import { theme, ICONS } from '../../Theme'
import Button from '../Button'

const colorMap = isDark => ({
  1: isDark ? '#3DBC00' : theme.green,
  0: isDark ? '#EB1D54' : theme.red,
  default: isDark ? '#EB1D54' : '#FF892E',
})

const backgroundColorMap = isDark => ({
  1: isDark ? '#CBF0B9' : theme.greenLightBg,
  0: isDark ? '#F2BDCB' : theme.redLightBg,
  default: isDark ? '#969696' : '#fbf1ea',
})

const SnackBarPopup = React.memo(({
  msg,
  msgType,
  showDelay,
  hideDelay,
  updateSnackbar,
  styles,
  renderKey,
  showReadMore,
  readMoreText = 'Read More',
  link,
}) => {
  const [show, toggleShow] = useState(!showDelay)
  const [layoutDim, updateDim] = useState({ transform: 'translateY(100%)' })
  useEffect(() => {
    let timer = null
    let showTimer = null
    let duration = hideDelay
    if (showDelay) {
      showTimer = setTimeout(() => {
        toggleShow(true)
      }, showDelay)
      duration += showDelay
    }
    timer = setTimeout(() => { updateSnackbar(renderKey) }, duration)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (showTimer) {
        clearTimeout(showTimer)
      }
    }
  }, [])

  useEffect(() => {
    if (show) {
      updateDim({ transform: 'translateY(0%)' })
    }
  }, [show])

  const onReadMore = () => {
    window.open(link, '_blank')
  }

  if (!show) return null
  const color = colorMap()[msgType] || colorMap().default
  return (
    <div
      className={styles.snackbar}
      style={{
        color,
        background: backgroundColorMap()[msgType] || backgroundColorMap().default,
        ...layoutDim,
      }}
    >
      <div>
        <CustomText color={color} style={{ flex: 1, whiteSpace: 'pre-line' }}>{msg}</CustomText>
        {showReadMore && (
          <div
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'underline' }}
          >
            <Button
              text={readMoreText}
              mode="text"
              transparent
              labelColor={color}
              onPress={onReadMore}
              labelWeight="semi_bold"
            />
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              <Icon
                name={ICONS.EXTERNAL_LINK}
                size={12}
                color={colorMap()[msgType]}
                style={{ marginLeft: '4px' }}
              />
            </a>
          </div>
        )}
      </div>
      <button type="button" className={styles.closeBtn} onClick={() => updateSnackbar(renderKey)}>
        <Icon name={ICONS.CLOSE} color={theme.text} size={10} />
      </button>
    </div>
  )
})

export default SnackBarPopup

SnackBarPopup.propTypes = {
  msg: PropTypes.string.isRequired,
  msgType: PropTypes.number, // 1 (success), 0 (error)
  hideDelay: PropTypes.number, // 3000ms
  showDelay: PropTypes.number,
  showReadMore: PropTypes.bool,
  link: PropTypes.string,
}

SnackBarPopup.defaultProps = {
  msgType: -1,
  showDelay: 0,
  hideDelay: 3000,
  showReadMore: false,
  link: '',
}
