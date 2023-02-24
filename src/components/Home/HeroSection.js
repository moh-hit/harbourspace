import React from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import CustomText from '../../UI/CustomText'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  ASSETS, COLORS, DIMENSIONS, FONTWEIGHT, SPACING, theme,
} from '../../Theme'
import Button from '../../UI/Button'

const { SECTION_PATTERN, HEROLEFT } = ASSETS

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

function HeroSection(props) {
  const { programDetails = {}, styles } = props
  const {
    name = '', description = '', about = '',
    company = {}, position = 'N/A', applicationEndDate = '',
    scholarshipStartDate = '', locationName = '', duration = '',
  } = programDetails || {}
  const {
    name: companyName = '', color_logo: {
      src = '',
    } = {},
  } = company || {}

  // create a timer for the application end date
  const [time, setTime] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const startTimer = () => {
    const countDownDate = new Date(applicationEndDate).getTime()

    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime()

      // Find the distance between now and the count down date
      const distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))

      // Output the result in an element with id="demo"
      setTime({
        days: Math.floor(days),
        hours: Math.floor(hours % 24),
        minutes: Math.floor(minutes % 60),
        seconds: Math.floor(seconds % 60),
      })

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x)
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }, 1000)
  }

  React.useEffect(() => {
    startTimer()

    return () => {
      setTime({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
    }
  }, [])

  const timerText = `${time.days} Day: ${time.hours} Hrs: ${time.minutes} Min: ${time.seconds} Secs`

  const startDate = dayjs(scholarshipStartDate, 'YYYY-MM-DD HH:MM:SS').format('DD MMM YYYY ')
  const endDate = dayjs(scholarshipStartDate, 'YYYY-MM-DD HH:MM:SS').add(duration, 'year').format('DD MMM YYYY')

  return (
    <div className={styles.container}>
      <img src={SECTION_PATTERN} className={styles.sectionPattern} alt="pattern" />
      <div className={styles.leftContainer}>
        <img src={HEROLEFT} alt="interactive-design" className={styles.leftStamp} />
        <CustomText size="large_48" weight="semi_bold" color={COLORS.THEME_PRIMARY}>{name}</CustomText>
        <CustomText weight="medium" size="large_2">{about}</CustomText>
        <CustomText weight="light" size="large_25">
          {description}
        </CustomText>
        {position && (
        <CustomText className={styles.positionText} weight="semi_bold" size="large">
          Position:
          {' '}
          <span>{position}</span>
        </CustomText>
        )}
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
          <img src={src} alt="zepto-logo" className={styles.zeptoLogo} />
          <div>
            <CustomText weight="light" size="large">Powered By</CustomText>
            <CustomText size="large_1">{companyName}</CustomText>
          </div>
        </div>
        <div className={styles.card}>
          <CustomText color={COLORS.THEME_PRIMARY} size="medium_1">Application closes in</CustomText>
          <CustomText size="large" weight="light">{timerText}</CustomText>
        </div>
        <div className={classNames(styles.card, styles.cardDetails)}>
          {renderField('Location', locationName)}
          {renderField('Duration', `${duration} Year`, ' Full Time')}
          {renderField('Start Date', startDate)}
          {renderField('End date', endDate)}
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
    zeptoLogo: {
      maxWidth: 200,
    },
  },
})

export default withTheme(stylesheet)(HeroSection)
