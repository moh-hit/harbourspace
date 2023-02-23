import React from 'react'
import CustomText from '../../UI/CustomText'
import { withTheme } from '../../Theme/ThemeProvider'
import {
  COLORS, DIMENSIONS, FONTS, SPACING,
} from '../../Theme'
import ListDropdown from '../../UI/Dropdown/ListDropdown'
import Expandable from '../../UI/Expandable'

function Faq(props) {
  const {
    styles, isMobile, categories = [], items = [],
  } = props
  const [filterBy, setFilterBy] = React.useState(categories[0])
  const [selectedItems, setSelectedItems] = React.useState([])

  const options = React.useMemo(() => {
    if (categories.length === 0) return []

    setFilterBy(categories[0])
    return categories.map((category) => {
      return { label: category, value: category }
    })
  }, [categories])

  React.useEffect(() => {
    if (filterBy) {
      const filteredItems = items.filter(item => item.type === filterBy)
      setSelectedItems(filteredItems)
    }
  }, [filterBy, items])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CustomText size="large_48" weight="semi_bold" color={COLORS.THEME_PRIMARY}>Frequently asked questions</CustomText>
        <div className={styles.actionRenderer}>
          <CustomText color="textSecondary" size="medium" weight="light">Filter by:</CustomText>
          <ListDropdown
            selected={filterBy}
            options={options}
            inputContainerStyles={styles.inputContainer}
            inputBtnStyles={styles.inputBtnStyles}
            inputStyles={styles.inputStyles}
            inputLabelSize="medium"
            dropdownIconSize={24}
            onChangeOption={setFilterBy}
          />
        </div>
      </div>
      {selectedItems.map((item) => {
        const { question = '', answer = {} } = item || {}
        const { data: answerData = '' } = answer[0] || {}
        return (
          <div className={styles.faqRow} key={question}>
            {!isMobile && (
            <CustomText
              size="large_25"
              weight="semi_bold"
              color={COLORS.THEME_PRIMARY}
              style={{ marginTop: SPACING.SPACE_20 }}
            >
              {filterBy}
            </CustomText>
            )}
            <Expandable
              title={question}
              titleProps={{
                size: isMobile ? 'large_1' : 'large_25',
                style: { textAlign: 'left', overflowWrap: 'break-word' },
              }}
              useCustomExpandIcon
              headerStyle={styles.titleStyle}
            >
              <div className={styles.faqDesc}>
                <CustomText size="large" weight="light" style={{ lineHeight: 2 }}>
                  {answerData}
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
  titleStyle: {
    width: '90%',
  },
  '@media only screen and (max-width: 430px)': {
    container: {
      padding: SPACING.SPACE_20,
    },
    header: {
      flexDirection: 'column',
      gap: SPACING.SPACE_20,
      alignItems: 'flex-start',
    },
    actionRenderer: {
      flexDirection: 'column',
      gap: SPACING.SPACE_20,
      alignItems: 'flex-start',
    },
    faqRow: {
      gridTemplateColumns: '1fr',
    },
  },
})
export default withTheme(stylesheet)(Faq)
