import React from 'react'
import {
  ASSETS, COLORS, ICONS, SPACING, theme,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import AnimatedCarousal from '../../UI/AnimatedCarousal'
import CustomText from '../../UI/CustomText'
import Icon from '../../UI/Icon'
import Dot from '../../UI/Dot'

const { TESTMONIALBG, TESTIMONIALPROFILE } = ASSETS

const CAROUSELMAP = [
  {
    id: 1,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 2,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 3,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 4,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 5,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 6,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 7,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 8,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
  {
    id: 9,
    profile: TESTIMONIALPROFILE,
    name: 'Irene Pereyra',
    course: 'Interaction Design Fellow ‘19',
    testimonial: 'This Fellowship was a turning point in my career. I wouldn’t be where I am today without the financial support and experienced offered through the program.',
    education: 'B.A. Visual Design',
    socialmedia: ICONS.LINKEDIN,
  },
]

function Testimonials({ styles }) {
  const renderCarouselCard = (item) => {
    const {
      profile, name, course, testimonial, education, socialmedia, id,
    } = item

    return (
      <div key={id} className={styles.testimonialCard}>
        <div className={styles.header}>
          <div className={styles.row}>
            <img alt="profile" src={profile} style={{ borderRadius: 50 }} />
            <div>
              <CustomText weight="medium">{name}</CustomText>
              <CustomText weight="light">{course}</CustomText>
            </div>
          </div>
          <Icon name={socialmedia} size={16} color={COLORS.GREY} />
        </div>
        <div className={styles.body}>
          <CustomText
            size="medium"
            weight="light"
            style={{
              whiteSpace: 'pre-wrap',
              marginBottom: SPACING.SPACE_20,
              lineHeight: 1.5,
            }}
          >
            {testimonial}
          </CustomText>
          <div className={styles.row}>
            <CustomText size="small" weight="light">Education</CustomText>
            <Dot size={3} />
            <CustomText size="small" weight="light">{education}</CustomText>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <img
        alt="testimonial"
        src={TESTMONIALBG}
        style={{
          position: 'absolute',
          top: -50,
          left: 150,
        }}
      />
      <AnimatedCarousal
        singleView={false}
        showNav
        navBtnSize={50}
      >
        {CAROUSELMAP.map(renderCarouselCard)}
      </AnimatedCarousal>
    </div>
  )
}

const stylesheet = () => ({
  container: {
    margin: `${SPACING.SPACE_40} 0`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 4,
    width: 400,
    backgroundColor: theme.bgPrimary,
    margin: SPACING.SPACE_20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.SPACE_10,
    padding: SPACING.SPACE_20,
  },
  body: {
    padding: `${SPACING.SPACE_20} ${SPACING.SPACE_40}`,
    backgroundColor: COLORS.BOX_SHADOW,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SPACE_10,
  },
  '@media only screen and (max-width: 430px)': {
    testimonialCard: {
      width: '90%',
    },
  },
})

export default withTheme(stylesheet)(Testimonials)
