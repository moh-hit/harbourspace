import makeStyles from '@material-ui/styles/makeStyles'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from './Icon'
import CustomText from './CustomText'

import {
  COLORS,
  ICONS, SPACING, theme,
} from '../Theme'

const Expandable = React.memo(({
  title,
  titleIcon,
  showArrow,
  children,
  titleIconProps,
  defaultExpanded,
  titleProps,
  contentStyles,
  onExpandCallback,
  expandKey,
  containerStyles = '',
  disabled,
  extraData = false,
  headerStyle,
  headerContainerStyles,
  showWhenExpanded = true,
  strLength,
  useCustomExpandIcon = false,
}) => {
  const [expanded, toggleExpand] = useState(defaultExpanded)
  // const [isHovered, setIsHovered] = React.useState(false)

  const [layoutDim, updateDim] = useState({})
  const styles = stylesheet()
  const contentRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    if (defaultExpanded !== expanded) {
      toggleExpand(defaultExpanded)
    }
  }, [defaultExpanded])

  const expandTitles = ['Entry', 'Exit', 'Conditions']

  useEffect(() => {
    if (!disabled) {
      if(expanded && contentRef.current && expandTitles.includes(title)) {
        updateDim({ maxHeight: contentRef.current.scrollHeight + strLength, opacity: 1 })
      } else if (expanded && contentRef.current) {
        updateDim({ maxHeight: contentRef.current.scrollHeight, opacity: 1 })
      }else {
        updateDim({ opacity: 0, maxHeight: 0 })
      }
    }
  }, [expanded, extraData])

  // if child height changes then update the maxHeight
  useEffect(() => {
    let updateTimer = null
    const update = null
    if (!disabled) {
      updateTimer = setTimeout(() => {
        if (expanded && contentRef.current) {
          return updateDim({
            maxHeight: contentRef.current.scrollHeight, opacity: 1,
          })
        }
        return null
      },
      300)
      if (contentRef.current) {
        contentRef.current.addEventListener('click', update)
      }
    } else {
      updateDim({ maxHeight: 'unset' })
    }
    return () => {
      if (contentRef.current && update) {
        contentRef.current.removeEventListener('click', update)
      }
      if (updateTimer) clearTimeout(updateTimer)
    }
  }, [disabled])

  const expandHandler = () => {
    if (disabled) return
    if (onExpandCallback) {
      onExpandCallback(expandKey, !expanded, extraData)
    }
    toggleExpand(!expanded)
  }

  // const onHoverIn = () => {
  //   setIsHovered(true)
  // }

  // const onHoverOut = () => {
  //   setIsHovered(false)
  // }

  const expandIcon = () => {
    const icon = expanded ? ICONS.MINUS : ICONS.PLUS
    const iconColor = expanded ? COLORS.WHITE : COLORS.THEME_PRIMARY

    return (
      <div
        className={classnames(styles.expandIconContainer, 'expandIconContainer')}
        // onMouseEnter={onHovers
        style={{ backgroundColor: expanded ? COLORS.THEME_PRIMARY : COLORS.WHITE }}
      >
        <Icon name={icon} className="expandIcon" color={iconColor} size={18} />
      </div>
    )
  }

  return (
    <div className={`${styles.expandable} ${containerStyles}`} ref={containerRef}>
      <button type="button" disabled={disabled} onClick={expandHandler} className={classnames(styles.headerContainer, headerContainerStyles)}>
        <div className={classnames(styles.header, headerStyle)}>
          {titleIcon && (
            <div className={styles.iconContainer}>
              <Icon name={ICONS[titleIcon]} size={12} color={theme.linkColor} {...titleIconProps} />
            </div>
          )}
          {typeof title === 'string' ? <CustomText weight="medium" {...titleProps}>{title}</CustomText>
            : title()}
        </div>
        {useCustomExpandIcon ? expandIcon() : showArrow && !disabled && (
          <Icon
            className={`${styles.expandIcon} ${expanded ? styles.rotate : ''}`}
            name={ICONS.DOWN_HEAD_FILLED}
            size={30}
            color={theme.textGrey}
          />
        )}
      </button>
      {showWhenExpanded && (
      <div ref={contentRef} className={`${styles.content} ${contentStyles}`} style={layoutDim}>
        {children}
      </div>
      )}
    </div>
  )
})

const stylesheet = makeStyles({
  expandable: {
    borderRadius: 8,
    // padding: `${SPACING.SPACE_24} 0`,
    backgroundColor: theme.bgPrimary,
    borderTop: `1px solid ${theme.borderColor}`,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: `${SPACING.SPACE_20} ${SPACING.SPACE_24}`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    backgroundColor: theme.blueLightBg,
    borderRadius: 4,
    marginRight: SPACING.SPACE_6,
  },
  expandIcon: {
    transition: 'all 0.32s var(--anim-func-ease)',
    transform: 'rotate3d(1, 0, 0, 0)',
  },
  rotate: {
    transform: 'rotate3d(1, 0, 0, -165deg)',
  },
  content: {
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
  },
  expandIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: COLORS.THEME_PRIMARY,
    borderWidth: 1,
    borderStyle: 'solid',
  },
})

export default Expandable

Expandable.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  titleIcon: PropTypes.string,
  showArrow: PropTypes.bool,
  titleIconProps: PropTypes.object,
  defaultExpanded: PropTypes.bool,
  titleProps: PropTypes.object,
  contentStyles: PropTypes.string,
  expandKey: PropTypes.string,
}

Expandable.defaultProps = {
  titleIcon: '',
  showArrow: true,
  titleIconProps: {},
  defaultExpanded: false,
  titleProps: {},
  contentStyles: '',
  expandKey: '',
}
