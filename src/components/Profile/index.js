import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: profileApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const returnData = await response.json()

    // console.log(returnData.profile_details)
    if (response.ok) {
      const profileDetails = returnData.profile_details

      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileData,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  renderProfileLoading = () => (
    <div className="job-profile-main-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="job-profile-main-container">
        <div className="job-profile-container">
          <img
            src={profileImageUrl}
            alt="profile"
            className="job-profile-image"
          />
          <h1 className="job-profile-name">{name}</h1>
          <p className="job-profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.setState(
      {profileApiStatus: profileApiStatusConstants.inProgress},
      this.getProfileDetails,
    )
  }

  renderProfileFailure = () => (
    <div className="job-profile-main-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiStatusConstants.inProgress:
        return this.renderProfileLoading()
      case profileApiStatusConstants.success:
        return this.renderProfileSuccess()
      case profileApiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }
}
export default Profile
