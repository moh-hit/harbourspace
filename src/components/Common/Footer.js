import React from 'react'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  COLORS, DIMENSIONS, SPACING, theme,
} from '../../Theme'
import CustomText from '../../UI/CustomText'

const FOOTERDETAILSMAP = [
  { label: 'Zeptolab', value: 'Marketing Performance' },
  { label: 'Location', value: 'Bangkok' },
  { label: 'Duration', value: '1 Year Full-Time' },
  { label: 'Start date', value: '3 Aug 2020' },
  { label: 'Application deadline', value: '30 June 2020' },
  { label: 'Apolication closes in', value: '6 Day   :   22 Hrs   :   56 Min' },
]

const renderField = ({ label, value, value2 }) => {
  return (
    <div style={{
      width: '15%',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <CustomText color={COLORS.THEME_PRIMARY} weight="medium" size="medium">{label}</CustomText>
      <CustomText weight="light" size="medium">{value}</CustomText>
      {value2 && <CustomText weight="light" size="medium">{value2}</CustomText>}
    </div>
  )
}

function Footer({ styles }) {
  return (
    <div className={styles.container}>
      {FOOTERDETAILSMAP.map(item => (renderField(item)))}
    </div>
  )
}

const stylesheet = () => ({
  container: {
    backgroundColor: theme.bgPrimary,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: DIMENSIONS.HEADER_HEIGHT,
    padding: `${SPACING.SPACE_40} ${SPACING.SPACE_40}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
  },
})

export default withTheme(stylesheet)(Footer)
