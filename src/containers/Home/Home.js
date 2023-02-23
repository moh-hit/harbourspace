import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { Helmet } from 'react-helmet-async'
import dayjs from 'dayjs'
import Header from '../../components/Common/Header'
import HeroSection from '../../components/Home/HeroSection'
import About from '../../components/Home/About'
import Faq from '../../components/Home/Faq'
import Testimonials from '../../components/Home/Testimonials'
import Footer from '../../components/Common/Footer'
import PageLoader from '../../UI/PageLoader'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    const { getPageData } = this.props
    getPageData()
  }

  componentDidUpdate(prevProps) {
    const {
      isFetchingData, fetchDataErr, fetchDataErrMsg, pageData,
    } = this.props

    if(!isEqual(isFetchingData, prevProps.isFetchingData) && !isFetchingData) {
      if (fetchDataErr) {
        alert(fetchDataErrMsg)
      } else {
        this.setState({
          data: pageData,
        })
      }
    }
  }

  render() {
    const { isMobile, isFetchingData } = this.props
    const { data } = this.state

    const { og_meta = {}, scholarship = {} } = data || {}
    const {
      title = '', desc = '', image_url = '', page_url = '',
    } = og_meta
    const {
      name = '', company = {}, program = {}, position = 'N/A', application_end_date = dayjs(), location = {}, duration = '', scholarship_start_date, about: aboutDetails = {},
      total_value = 0, tuition = 0, remaining = 0, stipend_per_year = 0, stipend_per_month = 0,
      study_commitment = 0, study_commitment_text = '', work_commitment = 0, work_commitment_text = '', faqs = {},
    } = scholarship || {}
    const { categories = [], items = [] } = faqs || {}
    const { data: aboutData } = aboutDetails[0] || {}
    const { about = '', description = {} } = program || {}
    const { data: descData = '' } = description || {}
    const { name: locationName } = location || {}
    const programDetails = {
      name,
      company,
      position,
      applicationEndDate: application_end_date,
      scholarshipStartDate: scholarship_start_date,
      locationName,
      duration,
      description: descData,
      about,
    }

    const stats = {
      scholarshipValue: total_value,
      tutionCovered: tuition,
      remaining,
      livingStipend: stipend_per_year,
      perMonth: stipend_per_month,
      studyCommitment: {
        hours: study_commitment,
        text: study_commitment_text,
      },
      workCommitment: {
        hours: work_commitment,
        text: work_commitment_text,
      },
    }

    if (isFetchingData) {
      return <PageLoader fullScreen />
    }

    return (
      <>
        <Helmet title={title}>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="og:image" content={image_url} />
          <meta property="og:url" content={page_url} />
        </Helmet>
        <Header name={name} />
        <HeroSection
          programDetails={programDetails}
        />
        <About about={aboutData} stats={stats} />
        <Testimonials />
        <Faq categories={categories} items={items} />
        {!isMobile && <Footer />}
      </>
    )
  }
}

export default Home
