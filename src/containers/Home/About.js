import React from 'react'
import CustomText from '../../UI/CustomText'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  ASSETS,
  COLORS,
  DIMENSIONS, SPACING, theme,
} from '../../Theme'

const { ABOUTPROFILE, ABOUTPROFILEBG } = ASSETS

const renderField = (label, value, value2) => {
  return (
    <div style={{
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.SPACE_10,
      margin: `${SPACING.SPACE_10} 0`,
    }}
    >
      <CustomText color={COLORS.THEME_PRIMARY} size="medium">{label}</CustomText>
      <CustomText weight="light" size="medium">{value}</CustomText>
      {value2 && <CustomText weight="light" size="medium">{value2}</CustomText>}
    </div>
  )
}

function About({ styles }) {
  return (
    <div className={styles.container}>
      <div className={styles.aboutContent}>
        <div className={styles.leftContainer}>
          <div style={{ backgroundImage: `url(${ABOUTPROFILEBG})` }} className={styles.aboutProfileBg}>
            <img src={ABOUTPROFILE} alt="about profile" className={styles.aboutProfile} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <CustomText size="large_48" weight="semi_bold" color={COLORS.THEME_PRIMARY}>About the apprenticeship</CustomText>
          <CustomText weight="light" size="large_25">
            Our scholarships are designed to give talented and driven young people from any
            background access to top-class education, experience and network.
            We offer a fully-funded master’s degree alongside an apprenticeship
            and a guaranteed job upon graduation.
          </CustomText>
        </div>
      </div>
      <div className={styles.statsCardContainer}>
        <div className={styles.card}>
          <CustomText color={COLORS.THEME_PRIMARY} size="medium">Scholarship value</CustomText>
          <CustomText size="large_48">€31,300</CustomText>
          <div className={styles.separator} />
          <div className={styles.cardDetails}>
            {renderField('Tution covered', '€20,900')}
            {renderField('Remaining', '€2,000')}
            {renderField('Living stipend', '€8,400(€700/month)')}
          </div>
        </div>
        <div className={styles.statsSubContainer}>
          <div style={{
            gridArea: 'commitmentcard',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: SPACING.SPACE_20,
          }}
          >
            <div className={styles.card}>
              <CustomText color={COLORS.THEME_PRIMARY} size="medium">Study commitment</CustomText>
              <CustomText size="large_3" weight="light" color="textSecondary">3 hours / day</CustomText>
              <div className={styles.smallseperator} />
              <CustomText weight="light" size="medium">You will complete 15 modules to graduate. Daily classes are 3 hours, plus coursework to complete in your own time. </CustomText>
            </div>
            <div className={styles.card}>
              <CustomText color={COLORS.THEME_PRIMARY} size="medium">Work commitment</CustomText>
              <CustomText size="large_3" weight="light" color="textSecondary">4 hours / day</CustomText>
              <div className={styles.smallseperator} />
              <CustomText weight="light" size="medium">Immerse yourself in the professional world during your apprenticeship. You’ll learn the ropes from the best and get to apply your newly acquired knowledge in the field from day one.</CustomText>
            </div>
          </div>
          <div style={{ gridArea: 'separator' }} className={styles.textSeparator}>
            <div className={styles.separator} />
            <CustomText weight="medium" size="medium">GRADUATION</CustomText>
            <div className={styles.separator} />
          </div>
          <div className={styles.card} style={{ gridArea: 'contractcard' }}>
            <CustomText color={COLORS.THEME_PRIMARY} size="medium">A full-time contract</CustomText>
            <CustomText size="large_3" weight="light" color="textSecondary">1 Year / Full-Time</CustomText>
            <div className={styles.smallseperator} />
            <CustomText weight="light" size="medium">You’ll be guaranteed a 1 year contract with SCG upon graduation. </CustomText>
          </div>
        </div>

      </div>
    </div>

  )
}

const stylesheet = () => ({
  container: {
    padding: DIMENSIONS.SPACE_SECTION,
    position: 'relative',
  },
  aboutContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: SPACING.SPACE_40,
    width: '40%',
  },
  rightContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: SPACING.SPACE_40,
  },
  aboutProfileBg: {
    width: 400,
    height: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutProfile: {
    width: '80%',
    objectFit: 'cover',
    borderRadius: 500,
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
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.BORDER_COLOR,
    margin: `${SPACING.SPACE_20} 0`,
  },
  smallseperator: {
    width: '20%',
    height: 1,
    backgroundColor: COLORS.BORDER_COLOR,
    margin: `${SPACING.SPACE_10} 0`,
  },
  cardDetails: {
    display: 'flex',
    gap: SPACING.SPACE_10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCardContainer: {
    display: 'grid',
    gap: SPACING.SPACE_40,
    gridTemplateColumns: '1fr 2.5fr',
  },
  statsSubContainer: {
    display: 'grid',
    gridTemplateAreas: "'commitmentcard' 'separator''contractcard'",
  },
  textSeparator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SPACE_20,
  },
})

export default withTheme(stylesheet)(About)
