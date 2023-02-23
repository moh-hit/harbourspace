import React from 'react'
import classNames from 'classnames'
import CustomText from '../../UI/CustomText'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  ASSETS, COLORS, DIMENSIONS, FONTWEIGHT, SPACING, theme,
} from '../../Theme'
import Button from '../../UI/Button'

const { SECTION_PATTERN, HEROLEFT, ZEPTOLOGO } = ASSETS

const renderField = (label, value, value2) => {
  return (
    <div style={{
      width: '40%', display: 'flex', flexDirection: 'column', gap: SPACING.SPACE_10,
    }}
    >
      <CustomText color={COLORS.THEME_PRIMARY} size="medium">{label}</CustomText>
      <CustomText weight="light" size="medium">{value}</CustomText>
      {value2 && <CustomText weight="light" size="medium">{value2}</CustomText>}
    </div>
  )
}

function HeroSection({ styles }) {
  return (
    <div className={styles.container}>
      <img src={SECTION_PATTERN} className={styles.sectionPattern} alt="pattern" />
      <div className={styles.leftContainer}>
        <img src={HEROLEFT} alt="interactive-design" className={styles.leftStamp} />
        <CustomText size="large_48" weight="semi_bold" color={COLORS.THEME_PRIMARY}>Interaction Design Apprenticeship</CustomText>
        <CustomText weight="medium" size="large_2">A fully funded work-study program to launch your tech career </CustomText>
        <CustomText weight="light" size="large_25">
          Harbour.Space has partnered with SCG to empower
          driven talent and eliminate the barriers to accessing exceptional education and
          career opportunities through a Masters Fellowship.
        </CustomText>
        <CustomText className={styles.positionText} weight="semi_bold" size="large">
          Position:
          {' '}
          <span>Marketing Performance</span>
        </CustomText>
        <Button
          text="Apply Now"
          buttonColor="primary"
          labelColor={COLORS.WHITE}
          labelSize="medium_1"
          btnStyles={styles.applyNowBtn}
          roundness={50}
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.powerwedBtContainer}>
          <img src={ZEPTOLOGO} alt="zepto-logo" className={styles.zeptoLogo} />
          <div>
            <CustomText weight="light" size="large">Powered By</CustomText>
            <CustomText size="large_1">Zeptolab</CustomText>
          </div>
        </div>
        <div className={styles.card}>
          <CustomText color={COLORS.THEME_PRIMARY} size="medium_1">Application closes in</CustomText>
          <CustomText size="large" weight="light">6 Day  :  22 Hrs  :  56 Min  :  13 Seg </CustomText>
        </div>
        <div className={classNames(styles.card, styles.cardDetails)}>
          {renderField('Location', 'Bangkok')}
          {renderField('Duration', '1 Year', ' Full Time')}
          {renderField('Start Date', '30 June 2020')}
          {renderField('End date', '30 Aug 2020')}
        </div>
      </div>
    </div>
  )
}

const stylesheet = () => ({
  container: {
    padding: DIMENSIONS.SPACE_SECTION,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  sectionPattern: {
    position: 'absolute',
    bottom: 100,
    right: 0,
    width: 400,
    zIndex: -1,
  },
  leftContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: SPACING.SPACE_40,
    width: '40%',
  },
  rightContainer: {
    width: '40%',
  },
  positionText: {
    '& span': {
      fontWeight: FONTWEIGHT.LIGHT,
    },
  },
  applyNowBtn: {
    padding: `${SPACING.SPACE_16} ${SPACING.SPACE_30}`,
  },
  leftStamp: {
    position: 'absolute',
    top: -80,
    right: -50,
    width: 250,
  },
  powerwedBtContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SPACE_40,
  },
  card: {
    border: `1px solid ${COLORS.BORDER_COLOR}`,
    borderRadius: 4,
    padding: SPACING.SPACE_20,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.SPACE_20,
    margin: `${SPACING.SPACE_40} 0`,
    backgroundColor: theme.bgPrimary,
  },
  cardDetails: {
    gap: SPACING.SPACE_10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: '1 0 40%',
  },
  '@media only screen and (max-width: 430px)': {
    container: {
      flexDirection: 'column',
      padding: SPACING.SPACE_20,
    },
    leftStamp: {
      top: -50,
      right: -50,
    },
    leftContainer: {
      width: '100%',
    },
    rightContainer: {
      width: '100%',
      marginTop: SPACING.SPACE_40,
    },
  },
})

export default withTheme(stylesheet)(HeroSection)
