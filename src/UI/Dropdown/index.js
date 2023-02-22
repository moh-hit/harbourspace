import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'

const getSelectedObj = (options, labelKey, valueKey, selected) => {
  for (let i = 0; i < options.length; i++) {
    const item = options[i]
    const key = valueKey || 'value'
    if (typeof item === 'object') {
      if (item.options && item.options.length) {
        const { labelKey: lKey, valueKey: vKey, options: subOptions } = item
        const obj = getSelectedObj(subOptions, lKey, vKey, selected)
        if (!isEmpty(obj)) {
          return obj
        }
      }
      if (item[key] === selected) {
        return { defaultLabel: item[labelKey || 'label'], defaultValue: selected }
      }
    } else if (item === selected) {
      return { defaultLabel: selected, defaultValue: selected }
    }
  }
  return { defaultLabel: selected, defaultValue: selected }
}

const getOptionProps = ({
  option, selectedValue, lKey, vKey, expanded,
}) => {
  let optionLabel = option
  let optionValue = option
  let optionObj = {}
  let optionKey = option
  let optionIcon = null
  let expandOptions = null
  let expandable = false
  let isDisabled = false
  if (typeof option === 'object') {
    optionLabel = lKey ? option[lKey] : option.label
    optionValue = vKey ? option[vKey] : option.value
    optionObj = option
    optionKey = optionValue
    optionIcon = option.icon
    expandOptions = option.expandable && option.options
    expandable = !!option.expandable
    isDisabled = option.disabled
  }
  const isSelected = selectedValue === optionValue
  return {
    label: optionLabel,
    value: optionValue,
    icon: optionIcon,
    expanded: expanded[optionKey],
    key: optionKey,
    expandOptions,
    optionObj,
    expandable,
    disabled: isDisabled,
    selected: isSelected,
  }
}

const Dropdown = React.memo(({
  options,
  selected,
  onChangeOption,
  styles,
  // position,
  optionTitle,
  placeholder,
  labelKey,
  valueKey,
  children,
  changeKey,
  disabled,
  staticSearch,
  searchProps: parentSearchProps,
  searchKeyMap = ['label', 'value'],
  visible,
}) => {
  // const [visible, toggle] = useState(false)
  const [expanded, toggleExpand] = useState({})
  const [filteredOptions, updateOptions] = useState(staticSearch ? options : [])
  const [selectedOption, updateSeletcted] = useState(
    { selectedValue: selected, selectedLabel: selected },
  )
  useEffect(() => {
    let defaultValue = selected
    let defaultLabel = selected
    if (options && options.length) {
      ({ defaultLabel, defaultValue } = getSelectedObj(options, labelKey, valueKey, selected))
    }
    updateSeletcted({ selectedLabel: defaultLabel, selectedValue: defaultValue })
  }, [selected])
  const { selectedValue, selectedLabel } = selectedOption
  // if (selectedOption && typeof selectedOption === 'object') {
  //   selectedValue = valueKey ? selectedOption[valueKey] : selectedOption.value
  //   selectedLabel = labelKey ? selectedOption[labelKey] : selectedOption.label
  // }
  const onItemPress = (optionValue, optionObj, isSelected) => {
    if (isSelected) return
    if (optionObj.expandable) {
      toggleExpand({
        ...expanded,
        [optionValue]: !expanded[optionValue],
      })
      return
    }
    if (disabled) {
      return
    }
    // updateSeletcted(isEmpty(optionObj) ? optionValue : optionObj)
    onChangeOption(optionValue, optionObj, changeKey)
    // toggle(!visible)
  }
  const renderMenuItem = (option, lKey, vKey, itemRenderer, index) => {
    const optionProps = getOptionProps({
      option, lKey, vKey, selectedValue, expanded,
    })
    const { selected: isSelected, optionObj, value } = optionProps
    return itemRenderer({
      ...optionProps,
      index,
      onPress: () => onItemPress(value, optionObj, isSelected),
      renderMenuItem,
    })
  }
  const renderDropDownOptions = (itemRenderer) => {
    if (staticSearch) {
      return filteredOptions.map((option, index) => {
        if (!option) {
          return null
        }
        return renderMenuItem(option, labelKey, valueKey, itemRenderer, index)
      })
    }
    return options.map((option, index) => {
      if (!option) {
        return null
      }
      return renderMenuItem(option, labelKey, valueKey, itemRenderer, index)
    })
  }

  const [value, updateValue] = useState('')
  useEffect(() => {
    if (visible && staticSearch) {
      updateValue('')
      updateOptions(options)
    }
  }, [visible])
  const debouncedHandler = useCallback(debounce(v => filterOptions(v), 50), [])
  const matchOptions = (query, optionsToFilter) => {
    const modOptions = []
    optionsToFilter.forEach((optionItem) => {
      let isMatched = false
      let newItem = optionItem
      if (typeof optionItem === 'object') {
        if (optionItem.options && optionItem.options.length) {
          const matchedArr = matchOptions(query, optionItem.options)
          isMatched = matchedArr.length > 0
          newItem = { ...newItem, options: matchedArr }
        } else {
          searchKeyMap.forEach((searchKey) => {
            const itemString = optionItem[searchKey] ? optionItem[searchKey].toLowerCase() : ''
            isMatched = isMatched || itemString.includes(query.toLowerCase())
          })
        }
      } else {
        isMatched = optionItem.toLowerCase().includes(query.toLowerCase())
      }
      if (isMatched) {
        modOptions.push(newItem)
      }
    })
    return modOptions
  }
  const filterOptions = (query) => {
    updateOptions(matchOptions(query, options))
  }
  const onSearch = (ev) => {
    const { target } = ev
    const stockQuery = target.value
    updateValue(stockQuery)
    debouncedHandler(stockQuery)
  }
  let searchProps = parentSearchProps
  if (staticSearch && !parentSearchProps) {
    searchProps = {
      onChange: onSearch,
      value,
    }
  }
  return children({
    selectedLabel,
    onChangeOption,
    styles,
    placeholder,
    renderDropDownOptions,
    optionTitle,
    searchProps,
    options,
    expanded,
    getOptionProps,
    onItemPress,
    selectedValue,
  })
})

export default Dropdown

Dropdown.defaultProps = {
}

Dropdown.propTypes = {
  // options: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.object),
  //   PropTypes.arrayOf(PropTypes.string),
  //   PropTypes.arrayOf(PropTypes.number),
  //   PropTypes.arrayOf(PropTypes.element),
  // ]).isRequired,
  onChangeOption: PropTypes.func.isRequired,
  // selected: PropTypes.oneOfType(PropTypes.string, PropTypes.number, PropTypes.object),
  // position: PropTypes.oneOfType(PropTypes.string, PropTypes.number, PropTypes.object),
}
