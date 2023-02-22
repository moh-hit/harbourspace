import { useEffect } from 'react'

const KeyboardNavigator = ({
  data, keyboardNavHandler: keyPressHandler, keysToRegister = ['ArrowDown', 'ArrowUp', 'Enter'], addListener = true,
  itemParams, isMobile,
}) => {
  useEffect(() => {
    if (addListener && !isMobile) {
      document.addEventListener('keydown', keyboardNavHandler)
    }
    return () => {
      document.removeEventListener('keydown', keyboardNavHandler)
    }
  }, [addListener, isMobile])
  const keyboardNavHandler = (e) => {
    const { key: keyPressed } = e
    if (!keysToRegister.includes(keyPressed)) return
    e.preventDefault()
    keyPressHandler({
      data, keyPressed, itemParams,
    })
  }
  return null
}

export default KeyboardNavigator
