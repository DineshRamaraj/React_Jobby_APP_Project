import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase, FaExternalLinkAlt} from 'react-icons/fa'

import SimilarJobItems from '../SimilarJobItems'

import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class JobsDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skillsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobIdData()
  }

  getUpdatedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    lifeAtCompanyDescription: data.life_at_company.description,
    lifeAtCompanyImageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
  })

  getSimilarJobs = similarData =>
    similarData.map(data => ({
      id: data.id,
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      jobDescription: data.job_description,
      location: data.location,
      rating: data.rating,
      title: data.title,
    }))

  getSkillsData = skillsData =>
    skillsData.map(data => ({
      name: data.name,
      imageUrl: data.image_url,
    }))

  getJobIdData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const jobDetails = this.getUpdatedData(data.job_details)
      const similarJobDetails = this.getSimilarJobs(data.similar_jobs)
      const skillsData = this.getSkillsData(data.job_details.skills)

      this.setState({
        jobDetails,
        similarJobs: similarJobDetails,
        skillsList: skillsData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFailureView = () => {
    this.getJobIdData()
  }

  renderFailureView = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-image"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-retry-button"
        onClick={this.retryFailureView}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs, skillsList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      companyWebsiteUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <>
        <Header />

        <div className="main-job-details-container">
          <div className="job-details-item">
            <div className="job-details-image-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-details-image"
              />
              <div className="job-details-title-container">
                <h1 className="job-details-heading">{title}</h1>
                <div className="job-details-rating-container">
                  <BsStarFill className="job-details-star-image" />
                  <p className="job-details-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-location-salary-container">
              <div className="job-details-location-container">
                <div className="job-details-icon-container">
                  <MdLocationOn className="job-details-location-image" />
                  <p className="job-details-location">{location}</p>
                </div>
                <div className="job-details-icon-container">
                  <FaSuitcase className="job-details-job-type-image" />
                  <p className="job-details-job-type">{employmentType}</p>
                </div>
              </div>
              <p className="job-details-package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="job-details-description-container">
              <div className="job-details-description-link">
                <h1 className="job-details-description-heading">Description</h1>
                <a className="job-details-link" href={companyWebsiteUrl}>
                  Visit <FaExternalLinkAlt className="job-details-link-icon" />
                </a>
              </div>
              <p className="job-details-description">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1 className="skills-heading">Skills</h1>
              <ul className="skills-list-container">
                {skillsList.map(eachItem => (
                  <li className="skills-list-item" key={eachItem.name}>
                    <img
                      src={eachItem.imageUrl}
                      alt={eachItem.name}
                      className="skills-image"
                    />
                    <p className="skills-name">{eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="life-container">
              <div>
                <h1 className="life-heading">Life at Company</h1>
                <p className="life-description">{lifeAtCompanyDescription}</p>
              </div>
              <img
                src={lifeAtCompanyImageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
          <div className="similar-container">
            <h1 className="similar-heading">Similar Jobs</h1>
            <ul className="similar-list-container">
              {similarJobs.map(eachItem => (
                <SimilarJobItems similarJobs={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default JobsDetails
