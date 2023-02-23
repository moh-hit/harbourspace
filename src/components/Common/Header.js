import React from 'react'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import {
  COLORS, DIMENSIONS, ICONS, SPACING,
} from '../../Theme'
import Icon from '../../UI/Icon'

const Header = ({ styles, isMobile }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <CustomText color="white" size="medium_1" weight="semi_bold">HARBOUR SPACE</CustomText>
        <CustomText color="white" size="small">/ INTERACTION DESIGN</CustomText>
      </div>
      <div className={styles.rightContent}>
        {!isMobile && (
        <div className={styles.applyNowBtn}>
          <CustomText center color="white">APPLY NOW</CustomText>
        </div>
        )}
        <button type="button">
          <Icon name={ICONS.MENU} size={24} color="white" />
        </button>
      </div>
    </div>
  )
}

const stylesheet = () => ({
  container: {
    backgroundColor: COLORS.THEME_PRIMARY,
    padding: `${SPACING.SPACE_16} ${SPACING.SPACE_24}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: DIMENSIONS.HEADER_HEIGHT,
  },
  leftContent: {
    display: 'flex',
    gap: SPACING.SPACE_10,
    alignItems: 'center',
  },
  rightContent: {
    display: 'flex',
    gap: SPACING.SPACE_16,
    alignItems: 'center',
  },
  applyNowBtn: {
    position: 'absolute',
    right: SPACING.SPACE_96,
    top: SPACING.SPACE_16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GREEN_300,
    padding: SPACING.SPACE_40,
    height: SPACING.SPACE_64,
    width: SPACING.SPACE_64,
    borderRadius: SPACING.SPACE_64,
  },
})

export default withTheme(stylesheet)(Header)
