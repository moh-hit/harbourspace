import React, { useEffect, useRef } from 'react'

// should be the first child of the swipe element
const Swipe = React.memo(({
  onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, params,
}) => {
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
  const swipeRef = useRef(null)
  let xDown = null
  let yDown = null
  const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }
  const handleTouchMove = (evt) => {
    const { clientY, clientX } = evt.touches[0]
    if (swipeRef.current && swipeRef.current.parentElement) {
      const {
        top, left, width, height,
      } = swipeRef.current.parentElement.getBoundingClientRect()

      if (top > clientY || (top + height) < clientY
        || (left + width) < clientX || left > clientX) return
    }
    if (!xDown || !yDown) {
      return
    }

    const xDiff = xDown - clientX
    const yDiff = yDown - clientY

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
      if (xDiff > 0 && onSwipeRight) {
        onSwipeRight(evt, params)
      } else if (onSwipeLeft) {
        onSwipeLeft(evt, params)
      }
    } else if (yDiff > 0 && onSwipeDown) {
      onSwipeDown(evt, params)
    } else if (onSwipeUp) {
      onSwipeUp(evt, params)
    }
    /* reset values */
    xDown = null
    yDown = null
  }
  return <div ref={swipeRef} />
})

export default Swipe
