import React, { PureComponent } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import isEqual from 'lodash/isEqual'

import CustomText from '../CustomText'
import Dropdown from '.'
import Icon from '../Icon'
import KeyboardNavigator from '../KeyboardNavigator'

import { withTheme } from '../../Theme/ThemeProvider'
import {
  COLORS, SPACING, ICONS, FONTS, theme,
} from '../../Theme'

class ListDropdown extends PureComponent {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.dropDownRef = React.createRef()
    this.state = {
      visible: false,
      layoutDim: { opacity: 1 },
      clickAwayEnabled: false,
      currentIndex: -1,
    }
    this.grpItemContainerRef = React.createRef()
    this.insideBody = true
  }

  componentDidMount() {
    this.main = document.getElementById('main')
    if (this.main) {
      this.main.addEventListener('scroll', this.scrollListener)
      this.scrollListenerAttached = true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.props
    const { visible } = this.state
    if (visible !== prevState.visible) {
      if (visible) {
        document.addEventListener('click', this.onUserClick)
        this.measureLabelLayout()
      } else {
        document.removeEventListener('click', this.onUserClick)
      }
    }
    if (!isEqual(options, prevProps.options)) {
      this.measureLabelLayout()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onUserClick)
    if (this.scrollListenerAttached) this.main.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener = () => {
    this.measureLabelLayout()
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
    const parentEle = this.grpItemContainerRef.current
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

  onUserClick = () => {
    const { clickAwayEnabled } = this.state
    if (clickAwayEnabled) {
      this.toggleDropdown()
    }
  }

  calcElementDim = (ele, keyName, top = 0) => {
    let modTop = top
    if (!ele.offsetParent) {
      this.insideBody = false
    }
    if (ele.offsetParent && ele.offsetParent.tagName !== 'BODY') {
      modTop += this.calcElementDim(ele.offsetParent, keyName, ele[keyName])
    } else {
      modTop += ele[keyName]
    }

    return modTop
  }

  measureLabelLayout = () => {
    const { innerHeight: wHeight, searchProps, staticSearch } = this.props
    const { visible } = this.state
    if (this.inputRef.current && visible) {
      const inputEle = this.inputRef.current
      const {
        top: posTop, width, left, // height: inputHeight,
      } = inputEle.getBoundingClientRect()
      const { offsetHeight: ddHeight } = this.dropDownRef.current
      let calcHeight = ddHeight > (wHeight * (3 / 4)) ? (wHeight * (3 / 4)) : ddHeight
      // calcHeight = calcHeight < 100 && searchProps ? 120 : calcHeight
      let layoutDim = {}
      const posFromTop = posTop - 2 // + (inputHeight * 0.5)
      let top = posFromTop
      if (searchProps || staticSearch) {
        const bottomHeight = wHeight - top
        const outOfScreen = wHeight - (posFromTop + calcHeight)
        if (outOfScreen < 0) {
          if (bottomHeight >= posTop) {
            calcHeight -= (posFromTop + calcHeight) - wHeight
          } else if (calcHeight > posTop) {
            calcHeight -= calcHeight - posTop
            top = 'unset'
            layoutDim = { bottom: wHeight - posTop }
          } else {
            top = posTop - calcHeight
          }
        }
        layoutDim = {
          top,
          left,
          opacity: 1,
          height: calcHeight === 0 ? 'auto' : calcHeight,
          minWidth: width,
          ...layoutDim,
          overflow: 'auto',
        }
      } else {
        const outOfScreen = (posFromTop + calcHeight) >= wHeight
        console.log('🚀 => file: ListDropdown.js:189 => outOfScreen:', outOfScreen)
        if (outOfScreen) {
          top -= (posFromTop + calcHeight) - wHeight
        }
        layoutDim = {
          top, left, height: calcHeight, opacity: 1, minWidth: width,
        }
      }

      // left
      this.setState({
        layoutDim,
      })
    }
  }

  renderLabel = (label, optionObj, selected, expanded) => {
    const {
      labelRender, itemStyles = {}, styles, isDark,
    } = this.props
    if (labelRender) {
      return labelRender(optionObj, label, selected, expanded, isDark)
    }
    let textColor = selected ? 'blue' : 'text'
    if (isDark) {
      textColor = selected ? 'blue_300' : 'white'
    }
    return (
      <CustomText
        className={classnames(styles.item, itemStyles)}
        color={textColor}
        size="medium"
      >
        {label}
      </CustomText>
    )
  }

  renderItem = (itemProps) => {
    const onPressHandler = () => {
      if (!itemProps.expandable && !itemProps.disabled) {
        this.toggleDropdown()
      }
      itemProps.onPress()
    }
    // console.log(itemProps, 'itemProps....')
    return this.itemRenderer(itemProps, onPressHandler)
  }

  toggleDropdown = () => {
    const { toggleCallback, visible } = this.props
    this.setState(prevState => ({
      visible: !prevState.visible, layoutDim: { ...prevState.layoutDim, opacity: 0 },
    }), () => {
      if (toggleCallback) toggleCallback(!visible)
    })
  }

  itemRenderer = ({
    label, key, selected, expandOptions, index,
    optionObj, expanded, renderMenuItem,
  }, onPressHandler) => {
    const {
      styles, labelRender, isDark, itemBtnStyles,
    } = this.props
    const { currentIndex } = this.state
    return (
      <div
        key={key}
        className={styles.optionsItem}
      >
        <button
          type="button"
          onClick={() => onPressHandler(selected)}
          className={`${styles.optionLabelBtn} ${currentIndex === index ? styles.optionLabelBtnHovered : ''} ${itemBtnStyles}`}
          style={selected ? { cursor: 'default' } : {}}
        >
          {this.renderLabel(label, optionObj, selected, labelRender, styles, isDark)}
        </button>
        {expanded && expandOptions.map((item) => {
          const { labelKey: lKey, valueKey: vKey } = optionObj
          return renderMenuItem(item, lKey, vKey, this.renderItem)
        })}
      </div>
    )
  }

    renderError = () => {
      const {
        error, errorMsg, errorTextStyles, styles,
      } = this.props
      if (error) {
        return (
          <div className={styles.error}>
            {!!errorMsg && (
              <CustomText
                ellipsis
                size="tiny"
                className={classnames(styles.errorText, errorTextStyles)}
              >
                {errorMsg}
              </CustomText>
            )}
            <Icon name={ICONS.WARN} size={12} color={COLORS.RED} />
          </div>
        )
      }
      return null
    }

    onSearchFocus = () => {
      if (this.state.visible) return
      this.toggleDropdown()
    }

    onSearchBlur = () => {
    }

    render() {
      const {
        label, labelStyles, inputStyles, containerStyles, inputContainerStyles, styles,
        dropDownIconName, showDropDownIcon = true, error, dropdownIconSize = 10,
        inputBtnStyles = {}, modalStyles, inputRenderer, isDark, defaultLabel, isMobile,
        showKeyNav, inputLabelSize, // DANGER currently only support for options without expandables
      } = this.props
      const { visible, layoutDim } = this.state
      const dropDownIcon = dropDownIconName || (visible ? 'UP_HEAD_FILLED' : 'DOWN_HEAD_FILLED')
      return (
        <div
          className={classnames(styles.container, containerStyles)}
        >
          {label && (
          <div className={styles.header}>
            <CustomText size="small" weight="medium" className={classnames(styles.labelStyles, labelStyles)}>{label}</CustomText>
            {this.renderError()}
          </div>
          )}
          <Dropdown {...this.props} visible={visible}>
            {({
              selectedLabel = '',
              placeholder,
              renderDropDownOptions,
              searchProps,
              options,
              getOptionProps,
              onItemPress,
              expanded,
              selectedValue,
            }) => {
              const extraProps = {
                onMouseOver: () => this.setState({ clickAwayEnabled: false }),
                onMouseOut: () => this.setState({ clickAwayEnabled: true }),
                onFocus: () => this.setState({ clickAwayEnabled: false }),
                onBlur: () => this.setState({ clickAwayEnabled: true }),
              }
              return (
                <>
                  {showKeyNav && (
                  <KeyboardNavigator
                    addListener={visible}
                    isMobile={isMobile}
                    keyboardNavHandler={this.keyboardNavHandler}
                    data={options}
                    itemParams={{
                      getOptionProps,
                      onItemPress,
                      expanded,
                      selectedValue,
                    }}
                  />
                  )}
                  <div
                    className={classnames(styles.inputContainer, error ? styles.inputError : '', inputContainerStyles)}
                    ref={this.inputRef}
                    {...extraProps}
                  >
                    {searchProps && (!inputRenderer || (inputRenderer && visible)) ? (
                      <input
                        // defaultValue={searchValue}
                        placeholder={placeholder}
                        className={
                          classnames(styles.inputBtn, styles.searchInput, inputBtnStyles)
                        }
                        onFocus={this.onSearchFocus}
                        onBlur={this.onSearchBlur}
                        {...searchProps}
                        value={visible ? searchProps.value : (defaultLabel || selectedLabel)}
                      />
                    ) : (
                      <button type="button" onClick={this.toggleDropdown} className={classnames(styles.inputBtn, inputBtnStyles, visible ? styles.inputBtnSelected : '')}>
                        {inputRenderer ? inputRenderer() : (
                          <>
                            <CustomText
                              className={classnames(styles.input, inputStyles)}
                              size={inputLabelSize}
                            >
                              {selectedLabel ? selectedLabel.toString() : placeholder ? <span className={styles.placeholder}>{placeholder}</span> : ''}
                            </CustomText>
                            {showDropDownIcon && <Icon className={styles.dropDownIcon} name={ICONS[dropDownIcon]} color={COLORS[isDark ? 'GREY_600' : 'TEXT']} size={dropdownIconSize} />}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {visible && ReactDOM.createPortal(
                    (
                      <div
                        className={classnames(styles.modalContainer, modalStyles)}
                        ref={this.dropDownRef}
                        style={layoutDim}
                      >
                        <div
                          className={styles.optionContainer}
                          ref={this.grpItemContainerRef}
                        >
                          {renderDropDownOptions(this.renderItem)}
                        </div>
                      </div>
                    ), document.getElementById('main'),
                  )}
                </>
              )
            }}
          </Dropdown>
        </div>
      )
    }
}

const stylesheet = ({
  container: {
    borderRadius: 6,
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    zIndex: '999999',
  },
  inputBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    borderRadius: 6,
    backgroundColor: theme.inputLightBg,
    padding: `${SPACING.SPACE_8} ${SPACING.SPACE_10}`,
    border: `1px solid ${theme.inputBorder}`,
    width: '100%',
    boxSizing: 'border-box',
  },
  inputBtnSelected: {
    borderColor: theme.linkColor,
  },
  modalContainer: {
    position: 'fixed',
    zIndex: '99999',
    borderRadius: 100,
    // width: '100%',
    // backgroundColor: theme.dropdownBg,
    // boxShadow: `0px 3px 20px ${theme.dropdownShadow}`,
    transition: 'opacity 1000ms cubic-bezier(0.34, 0.35, 0.03, 1.04)',
  },
  optionContainer: {
    overflow: 'auto',
    height: '100%',
    borderRadius: 30,
    borderBottom: `1px solid ${theme.inputBorder}`,
    borderRight: `1px solid ${theme.inputBorder}`,
    borderLeft: `1px solid ${theme.inputBorder}`,
  },
  item: {
    padding: `${SPACING.SPACE_10} ${SPACING.SPACE_20}`,
  },
  optionLabelBtnHovered: {
    backgroundColor: theme.hover,
  },
  input: {
    flex: 1,
    fontSize: FONTS.LARGE_2,
  },
  labelStyles: {
    marginBottom: SPACING.SPACE_4,
    flex: 0.6,
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.SPACE_4,
    flex: 0.4,
    alignSelf: 'flex-end',
  },
  errorText: {
    marginRight: SPACING.SPACE_12,
  },
  inputError: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    borderBottomColor: COLORS.RED,
    borderBottomWidth: 1,
  },
  dropDownIcon: {
    display: 'flex',
    marginRight: SPACING.SPACE_12,
    alignItems: 'center',
    textAlignVertical: 'center',
    position: 'relative',
    left: SPACING.SPACE_8,
    alignSelf: 'center',
  },
  searchInput: {
    '&:focus': {
      outline: 'none',
    },
  },
  placeholder: {
    color: theme.textSecondary,
    fontWeight: 300,
  },
  optionsItem: {
    backgroundColor: theme.bgSecondary,
  },
  optionLabelBtn: {
    width: '100%',
    height: '100%',
    padding: `${SPACING.SPACE_10} 0`,
    '&:hover': {
      backgroundColor: theme.hover,
    },
  },
})

export default withTheme(stylesheet)(ListDropdown)
