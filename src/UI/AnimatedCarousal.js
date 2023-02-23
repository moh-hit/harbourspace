import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import { Transition, animated } from 'react-spring'

import classNames from 'classnames'
import Dot from './Dot'
import Icon from './Icon'
import Swipe from './Swipe'

import {
  COLORS, ICONS, SPACING, theme,
} from '../Theme'
import { withTheme } from '../Theme/ThemeProvider'

const carousalTransition = {
  back: (props) => {
    const { transalteWidth } = props
    return ({
      from: {
        transform: `translate3d(-${transalteWidth}px,0,0) scale(0.3)`, position: 'absolute',
      },
      enter: { transform: 'translate3d(0,0,0) scale(1)' },
      leave: {
        transform: `translate3d(${transalteWidth}px,0,0) scale(0.3)`, position: 'absolute',
      },
    })
  },
  next: (props) => {
    const { transalteWidth } = props
    return ({
      from: {
        transform: `translate3d(${transalteWidth}px,0,0) scale(0.3)`, position: 'absolute',
      },
      enter: { transform: 'translate3d(0,0,0) scale(1)' },
      leave: {
        transform: `translate3d(-${transalteWidth}px,0,0) scale(0.3)`, position: 'absolute',
      },
    })
  },
  default: () => {},
}

class AnimatedCarousel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      viewWidth: 1,
      page: 0,
      dataLength: 0, // data.length,
      scrollType: 'default',
      multiItemWidth: 1,
      pageSize: 1,
      // data: [],
      pages: 1, // data.length,
      updatedAt: '',
    }
    this.containerRef = React.createRef()
    this.sliderRef = React.createRef()
    this.multiViewItemRef = React.createRef()
  }

  componentDidMount() {
    // this.calculateWidth()
    this.dimCalMountTimer = setTimeout(() => {
      this.calculateWidth()
    }, 450)
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children, singleView, extraData,
    } = this.props
    const { page, multiItemWidth } = this.state
    // DANGER
    // if(children) {
    //   children.forEach((item, index) => {
    //     if (((prevProps.children[index] && children[index]
    //       && children[index].length !== prevProps.children[index].length)
    //     || (!isEqual(extraData, prevProps.extraData))
    //     ) && this.sliderRef.current) {
    //       if (this.dimCalTimer) clearTimeout(this.dimCalTimer)
    //       this.dimCalTimer = setTimeout(() => {
    //         this.calculateWidth()
    //       }, 200)
    //     }
    //   })
    if (((prevProps.children && children
      && React.Children.count(children) !== React.Children.count(prevProps.children))
    || (!isEqual(extraData, prevProps.extraData))
    ) && this.sliderRef.current) {
      if (this.dimCalTimer) clearTimeout(this.dimCalTimer)
      this.dimCalTimer = setTimeout(() => {
        this.calculateWidth()
      }, 200)
    }
    if (!singleView && prevState.page !== page) {
      this.updateSliderPos(multiItemWidth)
    }
  }

  componentWillUnmount() {
    if (this.dimCalTimer) clearTimeout(this.dimCalTimer)
    if (this.dimCalMountTimer) clearTimeout(this.dimCalMountTimer)
    if (this.scrollTime) clearTimeout(this.scrollTime)
  }

  calculateWidth = (extraChanges = {}) => {
    let viewWidth = 1
    let changes = {}
    if (this.sliderRef.current) {
      const { offsetHeight = 1, offsetWidth = 1 } = this.containerRef.current
      viewWidth = offsetWidth
      changes = { viewWidth, viewHeight: offsetHeight }

      let childWidth = 1
      let pageSize = 1
      let dataLength = 0
      const { children, singleView } = this.props
      if (this.sliderRef.current.children) {
        dataLength = this.sliderRef.current.children.length

        if (singleView) {
          dataLength = React.Children.count(children)
          changes = {
            ...changes,
            multiItemWidth: this.sliderRef.current.children[0].offsetWidth,
            pageSize: dataLength,
            dataLength,
            pages: Math.ceil(dataLength / pageSize),
          }
        } else if (dataLength === 1) {
          childWidth = this.sliderRef.current.children[0].offsetWidth
        } else if (dataLength > 1) {
          let totalWidth = 0
          pageSize = dataLength
          childWidth = 0
          for (let i = 0; i < dataLength; i++) {
            const childItem = this.sliderRef.current.children[i]
            if (childWidth !== childItem.offsetWidth) {
              // items has variable width
              childWidth = 1
            } else if (childWidth === 0) {
              childWidth = childItem.offsetWidth
            }
            totalWidth += childItem.offsetWidth
            if (totalWidth >= viewWidth && pageSize === dataLength) {
              pageSize = totalWidth === viewWidth ? i + 1 : i
              break
            }
          }
        }
        changes = {
          ...changes,
          multiItemWidth: childWidth,
          pageSize,
          dataLength,
          pages: Math.ceil(dataLength / pageSize),
        }
      }
      // console.log(changes, dataLength, pageSize, offsetWidth, 'lol chanes')
    }
    this.setState({ ...changes, ...extraChanges })
  }

  updateSliderPos = (viewWidth) => {
    // const { data } = this.state
    const { page = 0, pageSize, dataLength } = this.state
    if (this.sliderRef.current) {
      this.scrollTime = setTimeout(() => {
        if (viewWidth !== 1 || page === 0) {
          this.sliderRef.current.scrollTo({ left: page * pageSize * viewWidth, behavior: 'smooth' })
        } else {
          const currentPageFirstEle = (page * pageSize)
          const childItem = this.sliderRef.current.children[currentPageFirstEle]
          if (childItem) {
            this.sliderRef.current.scrollTo({ left: childItem.offsetLeft, behavior: 'smooth' })
          } else if (this.sliderRef.current.children[dataLength - 1]) {
            const lastEle = this.sliderRef.current.children[dataLength - 1]
            this.sliderRef.current.scrollTo({ left: lastEle.offsetLeft, behavior: 'smooth' })
          }
        }
      }, 50)
    }
  }

  goNext = () => {
    const { onNextPress, infinite } = this.props
    this.setState((prevState) => {
      const { page, pages } = prevState
      let modIndex = page
      if (infinite) {
        modIndex = ((modIndex + 1) % pages)
      } else {
        modIndex += 1
        modIndex = modIndex >= pages ? modIndex - 1 : modIndex
      }
      if (onNextPress) {
        onNextPress(modIndex)
      }

      return { page: modIndex, scrollType: 'next' }
    })
  }

  goBack = () => {
    const { onBackPress, infinite } = this.props
    this.setState((prevState) => {
      const { page, pages } = prevState
      let modIndex = page
      modIndex -= 1
      if (infinite) {
        modIndex = modIndex < 0 ? pages - 1 : modIndex
      } else {
        modIndex = modIndex < 0 ? 0 : modIndex
      }
      if (onBackPress) {
        onBackPress(modIndex)
      }

      return { page: modIndex, scrollType: 'back' }
    })
  }

  renderNavButtons = () => {
    const {
      styles,
      infinite = true, navBtnSize = 32,
      isDark,
      navBtnStyles = '',
    } = this.props
    const { page, pages, dataLength } = this.state
    if (dataLength < 2) return null
    const lastIndex = page === pages - 1
    const extraStyles = {
      height: navBtnSize,
      width: navBtnSize,
      // borderRadius: navBtnSize * 0.17,
      top: `calc(49% - ${(navBtnSize / 2) + 1}px)`,
    }

    const iconSize = navBtnSize * 0.35
    const iconColor = isDark ? COLORS.BLACK_600 : COLORS.BLACK_70
    return (
      <>
        {(!lastIndex || infinite) && (
        <button
          type="button"
          onClick={this.goNext}
          className={`${styles.navBtn} ${navBtnStyles}`}
          style={{ ...extraStyles, right: (navBtnSize / 4) }}
        >
          <Icon name={ICONS.FORWARD} color={iconColor} size={iconSize * 1.5} />
        </button>
        )}
        {(page !== 0 || infinite) && (
        <button
          type="button"
          onClick={this.goBack}
          className={`${styles.navBtn} ${navBtnStyles}`}
          style={{ ...extraStyles, left: (navBtnSize / 4) }}
        >
          <Icon name={ICONS.BACK} color={iconColor} size={iconSize * 1.5} />
        </button>
        )}
      </>
    )
  }

  renderMobileNavBtn = () => {
    const {
      styles,
      navBtnSize = 32,
      isDark,
      navBtnStyles = '',
    } = this.props
    const { dataLength } = this.state
    if (dataLength < 2) return null
    const extraStyles = {
      height: navBtnSize,
      width: navBtnSize,
      // borderRadius: navBtnSize * 0.17,
    }

    const iconSize = navBtnSize * 0.35
    const iconColor = isDark ? COLORS.BLACK_600 : COLORS.BLACK_70
    return (
      <div className={styles.mobileNavBtnsContainer}>
        <button
          type="button"
          onClick={this.goBack}
          className={`${styles.navBtnMobile} ${navBtnStyles}`}
          style={{ ...extraStyles }}
        >
          <Icon name={ICONS.BACK} color={iconColor} size={iconSize * 1.5} />
        </button>
        <button
          type="button"
          onClick={this.goNext}
          className={`${styles.navBtnMobile} ${navBtnStyles}`}
          style={{ ...extraStyles }}
        >
          <Icon name={ICONS.FORWARD} color={iconColor} size={iconSize * 1.5} />
        </button>
      </div>
    )
  }

  goToIndex = (index) => {
    this.setState((prevState) => {
      if (index === prevState.page) return {}
      return {
        scrollType: prevState.page < index ? 'next' : 'back', page: index,
      }
    })
  }

  onDotPress = (e, index) => {
    e.preventDefault()
    const { page } = this.state
    if (index === page) return
    this.goToIndex(index)
  }

  renderDots = () => {
    const {
      styles, dotProps = {},
    } = this.props
    const { page, pages, dataLength } = this.state
    if (dataLength === 0) return null
    const view = []
    for (let i = 0; i < pages; i++) {
      const isSelected = i === page
      view.push(
        <button
          key={`dot_${i}`}
          type="button"
          onClick={e => this.onDotPress(e, i)}
          className={styles.dotBtn}
        >
          <Dot color={theme.navDotsBg[isSelected]} size={12} {...dotProps} />
        </button>,
      )
    }
    return (
      <div className={styles.dotsContainer}>
        {view}
      </div>
    )
  }

  renderSingleView = ({
    itemClasses, itemStyles,
  }) => {
    const {
      page, viewWidth, scrollType,
    } = this.state
    const data = React.Children.toArray(this.props.children)
    const transalteWidth = viewWidth - (viewWidth / 10)
    return (
      <Transition
        items={page}
        keys={item => item}
        config={{
          mass: 5, tension: 2500, friction: 200,
        }}
        {...carousalTransition[scrollType]({ transalteWidth })}
      >
        {(props, itenIndex) => {
          const item = data[itenIndex]
          return (
            <animated.div style={{ ...props, ...itemStyles }} id={`acItem_${itenIndex}`} className={itemClasses}>
              {item || ''}
            </animated.div>
          )
        }}
      </Transition>
    )
  }

  renderMultiView = () => {
    const {
      styles, children,
    } = this.props
    const { multiItemWidth } = this.state
    const data = React.Children.toArray(children)
    return data.map((item, itemIndex) => {
      const { key } = item
      let extraStyles = {}
      if (multiItemWidth > 1) {
        extraStyles = { width: multiItemWidth, opacity: 1 }
      }
      return (
        <div
          // ref={this.multiViewItemRef}
          className={styles.multiViewItemWrapper}
          style={extraStyles}
          key={key}
          // key={item[keyName]}
          id={`multiItem_${itemIndex}`}
        >
          {item}
        </div>
      )
    })
  }

  render() {
    const {
      styles, showNav, isMobile,
      showDots, singleView, containerStyles = {},
    } = this.props
    const { viewWidth } = this.state
    let sliderStyles = {}
    let itemStyles = {}
    let itemClasses = ''
    let sliderClasses = ''
    if (singleView) {
      sliderStyles = {
        maxWidth: viewWidth,
      }
      itemStyles = {
        width: viewWidth,
      }
      itemClasses = styles.singleView
      sliderClasses = styles.slideSingle
    } else {
      sliderClasses = styles.sliderMultiView
    }
    return (
      <div className={`${styles.acCarousal}`} style={containerStyles} ref={this.containerRef}>
        <Swipe onSwipeLeft={this.goBack} onSwipeRight={this.goNext} key={Math.random()} />
        <div className={styles.acCarousalWrapper}>
          <div
            className={classNames(styles.slider, sliderClasses)}
            ref={this.sliderRef}
            style={sliderStyles}
          >
            {singleView ? this.renderSingleView({ itemStyles, itemClasses })
              : this.renderMultiView()}
          </div>
          {showNav && (isMobile ? this.renderMobileNavBtn() : this.renderNavButtons())}
        </div>
        {showDots && this.renderDots()}
      </div>
    )
  }
}

const stylesheet = ({
  acCarousal: {
    width: '100%',
    height: '100%',
    minHeight: 100,
    minWidth: 100,
  },
  acCarousalWrapper: {
    position: 'relative',
    width: '100%',
    height: '80%',
  },
  slider: {
    height: '100%',
  },
  slideView: {

  },
  slideSingle: {
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  singleView: {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    position: 'relative',
  },
  navBtn: {
    position: 'absolute',
    backgroundColor: theme.navBtnBg,
    border: `1px solid ${theme.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    // boxShadow: `0px 4px 6px ${theme.navBtnShadow}`,
    '&:hover': {
      backgroundColor: theme.hover,
    },
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dotBtn: {
    margin: `${SPACING.SPACE_16} ${SPACING.SPACE_4} 0`,
  },
  sliderMultiView: {
    width: '100%',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  multiViewItemWrapper: {
    display: 'inline-table',
    opacity: 1,
    verticalAlign: 'middle',
    '& *': {
      transition: 'all 0.15s var(--anim-func-ease)',
    },
  },
  mobileNavBtnsContainer: {
    position: 'absolute',
    bottom: -50,
    left: '70%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.SPACE_16,
  },
  navBtnMobile: {
    backgroundColor: theme.navBtnBg,
    border: `1px solid ${theme.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    // boxShadow: `0px 4px 6px ${theme.navBtnShadow}`,
    '&:hover': {
      backgroundColor: theme.hover,
    },
  },
})

export default withTheme(stylesheet)(AnimatedCarousel)

AnimatedCarousel.defaultProps = {
  singleView: true,
  showDots: false,
  showNav: false,
  infinite: false,
}

AnimatedCarousel.propTypes = {
  singleView: PropTypes.bool,
  showNav: PropTypes.bool,
  showDots: PropTypes.bool,
  infinite: PropTypes.bool,
}
