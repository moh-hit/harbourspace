/* eslint-disable no-unused-vars */
import React, {
  PureComponent,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import CustomText from '../CustomText'
import Dropdown from './index'
import Icon from '../Icon'
import KeyboardNavigator from '../KeyboardNavigator'

import { withTheme } from '../../Theme/ThemeProvider'
import {
  COLORS, SPACING, DIMENSIONS, ICONS, theme,
} from '../../Theme'

const renderLabel = ({
  label, optionObj, selected, labelRender, styles, isDark, expanded, labelStyles,
}) => {
  if (labelRender) {
    return labelRender(optionObj, label, selected)
  }
  if (optionObj.icon) {
    const {
      icon, iconSize, iconColor, optionSize = 'regular',
    } = optionObj
    let extraStyles = {}
    if (isDark) {
      extraStyles = { paddingHorizontal: SPACING.SPACE_12 }
      if (selected) extraStyles = classnames(styles.selectedOptionLabel, extraStyles)
    }
    const linkColor = isDark ? 'BLUE_300' : 'BLUE'
    const iconDefaulColor = (!iconColor || iconColor === 'TEXT')
    let modIconColor = isDark && iconDefaulColor ? 'WHITE' : iconColor
    // const labelStyle = selected ? { flex: 1 } : {}
    modIconColor = !iconDefaulColor && selected ? linkColor : modIconColor
    return (
      <div className={classnames(styles.optionLabel, extraStyles)}>
        <Icon
          name={icon}
          size={iconSize}
          color={COLORS[modIconColor]}
          style={{ width: iconSize }}
        />
        <CustomText
          weight="regular"
          size={optionSize}
          color={modIconColor}
          center
          className={classnames(styles.optionLabelText, labelStyles)}
        >
          {label}

        </CustomText>
        {/* {selected && (
          <Icon name={ICONS.TICK_ROUND_FILLED}
          color={COLORS.BLUE} size={18} style={styles.tickIcon} />
        )} */}
      </div>
    )
  }
  let textColor = 'text'
  if (isDark) {
    textColor = selected ? 'blue_300' : 'text'
  }
  return (
    <CustomText
      className={classnames(styles.item, labelStyles, selected ? styles.itemSelected : '')}
      color={textColor}
    >
      {label}
      {optionObj.expandable && (
        <Icon
          name={ICONS[expanded ? 'UP' : 'DOWN']}
          size={9}
          color={theme.text}
        />
      )}
    </CustomText>
  )
}

class ModalDropdown extends PureComponent {
  state = {
    currentIndex: this.props.isMobile ? -1 : 0,
    visible: false,
    layoutDim: { opacity: 0 },
  }

  inputRef = React.createRef()

  dropDownRef = React.createRef()

  // grpItemContainerRef = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.state
    const { visible: defaultVisible } = this.props
    if (visible !== prevState.visible && visible) {
      this.measureLabelLayout()
    }
    if (prevProps.visible !== defaultVisible && visible !== defaultVisible) {
      this.setState({ visible: false })
    }
  }

  measureLabelLayout = () => {
    const {
      dropdownOffset = 10, innerHeight: wHeight, innerWidth: wWidth, isMobile,
    } = this.props
    const { visible } = this.state
    if (isMobile && visible) {
      this.setState({
        layoutDim: {
          opacity: 1, bottom: 0,
        },
      })
    } else if (this.inputRef.current && visible) {
      const inputEle = this.inputRef.current
      const {
        height: inputHeight, top: posTop, left: inputLeft, width: inputWidth,
      } = inputEle.getBoundingClientRect()
      const { offsetHeight: ddHeight, offsetWidth: ddWidth } = this.dropDownRef.current
      const calcHeight = ddHeight > (wHeight * (3 / 4)) ? (wHeight * (3 / 4)) : ddHeight
      const calcWidth = ddWidth < 100 ? 100 : ddWidth
      const posFromTop = posTop + inputHeight + dropdownOffset
      let top = posFromTop
      const outOfScreen = (posFromTop + calcHeight) >= wHeight
      if (outOfScreen) {
        top -= (posFromTop + calcHeight) - wHeight
      }
      let left = inputLeft + (inputWidth / 2) - (calcWidth / 2)
      if (left < 0) {
        left = inputLeft
      } else if ((left + calcWidth) > wWidth) {
        left -= ((left + calcWidth) - wWidth)
      }
      // left

      this.setState({
        layoutDim: {
          top, left, height: calcHeight, opacity: 1, minWidth: calcWidth,
        },
      })
    }
  }

  keyboardNavHandler = ({
    data, keyPressed, itemParams,
  }) => {
    const {
      currentIndex,
    } = this.state
    let newIndex = 0
    const { labelKey, valueKey } = this.props
    const {
      getOptionProps, selectedValue, expanded, onItemPress,
    } = itemParams
    const item = data[currentIndex < 0 ? 0 : currentIndex]

    if (!item) {
      this.setState({ currentIndex: -1 })
      return
    }
    const len = data.length
    const parentEle = this.dropDownRef.current
    let shudScroll = Boolean(parentEle)

    if (keyPressed === 'ArrowDown') {
      newIndex = currentIndex + 1
      if (newIndex >= len) {
        newIndex = 0
        if (shudScroll) parentEle.scrollTo(0, 0)
        shudScroll = false
      }
    } else if (keyPressed === 'ArrowUp') {
      newIndex = currentIndex - 1
      if (newIndex <= -1) {
        newIndex = len - 1
        if (shudScroll) parentEle.scrollTo(0, parentEle.scrollHeight)
        shudScroll = false
      }
    } else if (keyPressed === 'Enter' && currentIndex !== -1) {
      newIndex = currentIndex
      const option = getOptionProps({
        option: item, selectedValue, lKey: labelKey, vKey: valueKey, expanded,
      })
      const {
        value, optionObj, selected, expandable,
      } = option
      this.expandedParams = expandable ? { lKey: item.labelKey, vKey: item.valueKey } : null
      onItemPress(value, optionObj, selected)
      if (!expandable) {
        this.toggleDropdown()
      }
      shudScroll = false
    }
    this.setState({ currentIndex: newIndex })
    if (shudScroll) {
      const ele = parentEle.children[newIndex]
      if (ele) {
        const viewHeight = parentEle.offsetHeight
        if ((ele.offsetTop + ele.offsetHeight) <= parentEle.scrollTop) {
          parentEle.scrollTo(0, ele.offsetTop)
        } else if (ele.offsetTop >= (parentEle.scrollTop + viewHeight)) {
          parentEle.scrollTo(0, ele.offsetTop - parentEle.offsetHeight + ele.offsetHeight)
        }
      }
    }
  }

  backDropHandler = (e) => {
    e.preventDefault()
    this.toggleDropdown()
  }

  renderOptionTitle = (optionTitle) => {
    const { styles, optionTitleStyles = '' } = this.props
    if (optionTitle) {
      return (
        <CustomText weight="semi_bold" className={classnames(styles.optionTitle, optionTitleStyles)}>
          {optionTitle}
        </CustomText>
      )
    }
    return null
  }

  toggleDropdown = () => {
    const { position, toggleCallback } = this.props
    const { visible, layoutDim } = this.state
    let changes = {}
    if (visible && !position) {
      changes = { ...layoutDim, opacity: 0 }
    }
    this.setState({ visible: !visible, ...changes }, () => {
      if (toggleCallback) toggleCallback(!visible)
    })
  }

  itemRenderer = ({
    label, key, icon, selected, expandOptions,
    optionObj, expanded, renderMenuItem, index,
  }, onPressHandler) => {
    const {
      styles, isDark, labelStyles = '', labelRender,
    } = this.props
    const { currentIndex } = this.state
    return (
      <div
        key={key}
        className={styles.optionsItem}
      >
        <button
          type="button"
          onClick={e => onPressHandler(selected)}
          className={classnames(styles.optionLabelBtn, currentIndex === index ? styles.optionLabelBtnHovered : '')}
          style={selected ? { cursor: 'default' } : {}}
        >
          {renderLabel({
            label,
            optionObj,
            selected,
            labelRender,
            styles,
            isDark,
            expanded,
            labelStyles,
          })}
        </button>
        {expanded && expandOptions.map((item) => {
          const { labelKey: lKey, valueKey: vKey } = optionObj
          return renderMenuItem(item, lKey, vKey, this.renderItem)
        })}
      </div>
    )
  }

  renderItem = (itemProps) => {
    const onPressHandler = (isSelected) => {
      if (isSelected) return
      if (!itemProps.expandable) {
        this.toggleDropdown()
      }
      itemProps.onPress()
    }
    return this.itemRenderer(itemProps, onPressHandler)
  }

  render() {
    const {
      containerStyles, inputStyles, dropDownIcon = {}, inputLabelStyles,
      inputRenderer, backdrop = {}, children, optionTitleRenderer, styles,
      isDark, isMobile, optionContainerStyle,
      // showKeyNav, // DANGER currently only support for options without expandables
    } = this.props
    const { layoutDim, visible } = this.state
    const {
      up = 'UP_HEAD_FILLED', down = 'DOWN_HEAD_FILLED', size = 10, color = isDark ? 'WHITE' : 'TEXT',
    } = dropDownIcon
    // const [labelDim, updateLabelDim] = useState({ top: 0, left: 0, width: 0 })

    let modalStyles = {}
    if (isDark) {
    // if (position === 'bottom' || isMobile) {
    //   modalStyles = { ...modalStyles, backgroundColor: COLORS.BLACK }
    // } else {
      modalStyles = { ...modalStyles, boxShadow: 'none' }
    }

    return (
      <div className={classnames(styles.container, containerStyles)}>
        <Dropdown {...this.props}>
          {({
            selectedLabel,
            placeholder,
            renderDropDownOptions,
            optionTitle,

            options,
            getOptionProps,
            onItemPress,
            expanded,
            selectedValue,
          }) => (
            <>
              <KeyboardNavigator
                addListener={visible}
                keyboardNavHandler={this.keyboardNavHandler}
                isMobile={isMobile}
                data={options}
                itemParams={{
                  getOptionProps,
                  onItemPress,
                  expanded,
                  selectedValue,
                }}
              />
              <button
                type="button"
                onClick={this.toggleDropdown}
                ref={this.inputRef}
              >
                {inputRenderer ? inputRenderer(visible, selectedLabel, selectedValue) : (
                  <div className={classnames(styles.selectBtnView, inputStyles)}>
                    <CustomText className={classnames(styles.inputLabel, inputLabelStyles)}>{`${selectedLabel || placeholder}  `}</CustomText>
                    <Icon
                      name={ICONS[visible ? up : down]}
                      size={size}
                      color={COLORS[color]}
                      style={{ marginLeft: SPACING.SPACE_8 }}
                    />
                  </div>
                )}
              </button>
              {visible && (
                ReactDOM.createPortal((
                  <>
                    <button type="button" onClick={this.backDropHandler} style={{ pointer: 'default' }}>
                      <div className={styles.backDrop} style={backdrop} />
                    </button>
                    <div
                      className={classnames(styles.modalContainer)}
                      ref={this.dropDownRef}
                      style={{ ...modalStyles, ...layoutDim }}
                    >
                      {optionTitleRenderer
                        ? optionTitleRenderer(selectedLabel, selectedValue)
                        : this.renderOptionTitle(optionTitle)}
                      {children}
                      <div className={classnames(styles.optionContainer, optionContainerStyle)}>
                        {renderDropDownOptions(this.renderItem)}
                      </div>
                    </div>
                  </>),
                document.getElementById('main'))

              )}
            </>
          )}
        </Dropdown>
      </div>
    )
  }
}

const stylesheet = {
  container: {
    position: 'relative',
  },
  selectBtnView: {
    display: 'flex',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 10,
    position: 'fixed',
    zIndex: '9999',
    backgroundColor: theme.dropdownBg,
    boxShadow: `0px 3px 20px ${theme.dropdownShadow}`,
    transition: 'opacity 250ms cubic-bezier(0.34, 0.35, 0.03, 1.04)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
      '-ms-overflow-style': 'none', /* IE and Edge */
      scrollbarWidth: 'none', /* Firefox */
    },
  },
  optionContainer: {
    // height: '100%', removed due to sort dropdown
    padding: `${SPACING.SPACE_10} 0`,
  },
  item: {
    padding: `${SPACING.SPACE_8} ${DIMENSIONS.SPACE_HORIZONTAL}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      color: `${theme.linkColor} !important`,
      backgroundColor: theme.hover,
    },
  },
  itemSelected: {
    color: `${theme.linkColor} !important`,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  optionTitle: {
    textAlign: 'center',
    padding: `${SPACING.SPACE_16} ${SPACING.SPACE_10} ${SPACING.SPACE_10}`,
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
  },
  optionLabelBtn: {
    // margin: `${SPACING.SPACE_8} 0`,
    borderRadius: SPACING.SPACE_6,
    width: '100%',
    textAlign: 'left',
  },
  optionLabel: {
    padding: `${SPACING.SPACE_10} ${DIMENSIONS.SPACE_HORIZONTAL}`,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    '&:hover': {
      backgroundColor: theme.hover,
    },
  },
  optionLabelText: {
    paddingLeft: SPACING.SPACE_12,
    // paddingRight: SPACING.SPACE_32,
    // paddingTop: SPACING.SPACE_6,
  },
  tickIcon: {
    backgroundColor: 'transparent',
    borderRadius: 40,
  },
  selectedOptionLabel: {
    backgroundColor: theme.bgSecondary,
    borderRadius: SPACING.SPACE_6,
  },
  optionsItem: {
    // marginBottom: SPACING.SPACE_20,
  },
  backDrop: {
    backgroundColor: 'transparent', // theme.backdropBg,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    cursor: 'default',
  },
  optionLabelBtnHovered: {
    backgroundColor: theme.hover,
  },
  '@media only screen and (max-width: 786px)': {
    optionLabel: {
      display: 'inline-block',
      width: '100%',
      '& > svg': {
        verticalAlign: 'text-top',
        position: 'relative',
        top: 1,
      },
    },
    optionLabelText: {
      textAlign: 'left !important',
      width: '65%',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    modalContainer: {
      width: '100%',
      left: 0,
      borderRadius: 0,
    },
  },
}

export default withTheme(stylesheet)(ModalDropdown)

ModalDropdown.defaultProps = {
}

ModalDropdown.propTypes = {
  // options: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.object),
  //   PropTypes.arrayOf(PropTypes.string),
  //   PropTypes.arrayOf(PropTypes.number),
  //   PropTypes.arrayOf(PropTypes.element),
  // ]).isRequired,
  onChangeOption: PropTypes.func.isRequired,
  // selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  // position: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
}
