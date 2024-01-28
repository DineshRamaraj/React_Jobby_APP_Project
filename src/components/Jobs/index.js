import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import EmployeeTypeFilter from '../EmployeeTypeFilter'
import SalaryFilter from '../SalaryFilter'
import JobItem from '../JobItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJob: 'NO_JOB',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isChecked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isChecked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isChecked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isChecked: false,
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    checkBoxList: employmentTypesList,
    salaryId: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, checkBoxList, salaryId} = this.state

    const filteredList = checkBoxList.filter(eachItem => eachItem.isChecked)

    const filteredItem = filteredList.map(eachItem => eachItem.employmentTypeId)
    console.log(filteredList)
    console.log(filteredItem)
    console.log(salaryId)

    const apiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${filteredItem.join()}&minimum_package=${salaryId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      //   console.log(updatedData.length)
      if (updatedData.length > 0) {
        this.setState({
          jobsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.noJob})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJobItem => (
          <JobItem eachJobItem={eachJobItem} key={eachJobItem.id} />
        ))}
      </ul>
    )
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  retryFailureView = () => {
    this.getJobsList()
  }

  renderJobsFailure = () => (
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

  renderJobsStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoading()
      case apiStatusConstants.success:
        return this.renderJobsSuccess()
      case apiStatusConstants.noJob:
        return this.renderNoJobs()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  clickCheckBox = valueId => {
    this.setState(
      prevState => ({
        checkBoxList: prevState.checkBoxList.map(eachItem => {
          if (eachItem.employmentTypeId === valueId) {
            return {...eachItem, isChecked: !eachItem.isChecked}
          }
          return {...eachItem}
        }),
      }),
      this.getJobsList,
    )
  }

  clickSalary = valueId => {
    this.setState(
      {
        salaryId: valueId,
      },
      this.getJobsList,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="job-search-mobile-container">
            <input
              type="search"
              className="job-search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onKeyDown}
            />
            {/* eslint-disable-next-line */}
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.onClickSearchButton}
              className="search-button"
            >
              <BsSearch className="job-search-icon" />
            </button>
          </div>

          <div className="job-profile-and-job-filter-container">
            <Profile />
            <hr className="hr-line" />
            <EmployeeTypeFilter
              employmentTypesList={employmentTypesList}
              clickCheckBox={this.clickCheckBox}
            />
            <hr className="hr-line" />
            <SalaryFilter clickSalary={this.clickSalary} />
          </div>
          <div className="main-job-search-container">
            <div className="job-search-lg-container">
              <input
                type="search"
                className="job-search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDown}
              />
              {/* eslint-disable-next-line */}
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
                className="search-button"
              >
                <BsSearch className="job-search-icon" />
              </button>
            </div>
            <div className="job-list-container">{this.renderJobsStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
