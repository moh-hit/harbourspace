import React from 'react'
import CustomText from '../../UI/CustomText'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  COLORS, DIMENSIONS, FONTS, SPACING,
} from '../../Theme'
import ListDropdown from '../../UI/Dropdown/ListDropdown'
import Expandable from '../../UI/Expandable'

const filters = [
  { label: 'Program conditions', value: 'program_conditions' },
  { label: 'Program eligibility', value: 'program_eligibility' },
  { label: 'Program requirements', value: 'program_requirements' },
  { label: 'Program application', value: 'program_application' },
]

function Faq({ styles }) {
  const [filterBy, setFilterBy] = React.useState(filters[0].value)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CustomText size="large_48" weight="semi_bold" color={COLORS.THEME_PRIMARY}>Frequently asked questions</CustomText>
        <div className={styles.actionRenderer}>
          <CustomText color="textSecondary" size="medium" weight="light">Filter by:</CustomText>
          <ListDropdown
            selected={filterBy}
            onSelect={setFilterBy}
            options={filters}
            inputContainerStyles={styles.inputContainer}
            inputBtnStyles={styles.inputBtnStyles}
            inputStyles={styles.inputStyles}
            inputLabelSize="medium"
            dropdownIconSize={24}
          />
        </div>
      </div>
      {Array(5).fill().map(() => {
        return (
          <div className={styles.faqRow}>
            <CustomText
              size="large_25"
              weight="semi_bold"
              color={COLORS.THEME_PRIMARY}
              style={{ marginTop: SPACING.SPACE_20 }}
            >
              Program conditions
            </CustomText>
            <Expandable
              title="What are my obligations?"
              titleProps={{ size: 'large_25' }}
            >
              <div className={styles.faqDesc}>
                <CustomText size="large" weight="light" style={{ lineHeight: 2 }}>
                  The majority of our students receive numerous job offers at the end of
                  the second academic year of their Bachelor&aposs programme and at the
                  end of the first academic year of their Master&aposs programme.
                  The best applicants receive an offer from our industrial
                  partners at the beginning of their programmes.
                  Harbour.Space is highly recognized among innovative employers and is
                  strategic partner of B.Grimm multi- industry corporation with 140 years
                  of history in Thailand. Together we insure students get the best knowledge
                  about the current job market opportunities.
                  We offer our students paid internships options during studies jointly with
                  our industrial partners.
                  Employers that hired graduates of Harbour.Space in the past include Google,
                  IBM, Accenture, Typeform, Frog, and other tech centric companies.
                  Our industry specific employability report could be provided
                  to you separately during the admission process.
                </CustomText>
              </div>
            </Expandable>
          </div>
        )
      })}

    </div>
  )
}

const stylesheet = () => ({
  container: {
    padding: DIMENSIONS.SPACE_SECTION,
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SPACE_40,
  },
  actionRenderer: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SPACE_20,
  },
  inputContainer: {
    width: 250,
  },
  inputBtnStyles: {
    padding: SPACING.SPACE_16,
    borderRadius: 50,
  },
  inputStyles: {
    fontSize: FONTS.LARGE,
  },
  faqDesc: {
    padding: SPACING.SPACE_20,
  },
  faqRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    marginBottom: SPACING.SPACE_40,
    gridRowGap: SPACING.SPACE_40,
  },
})
export default withTheme(stylesheet)(Faq)
