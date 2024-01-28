import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

// import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobItems = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobs
  return (
    <li className="similar-list-item">
      <div className="similar-image-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="card-item-image"
        />
        <div className="similar-title-container">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating-container">
            <BsStarFill className="similar-star-image" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="similar-description-container">
        <h1 className="similar-description-heading">Description</h1>
        <p className="similar-description">{jobDescription}</p>
      </div>
      <div className="similar-location-salary-container">
        <div className="similar-location-container">
          <div className="similar-icon-container">
            <MdLocationOn className="similar-location-image" />
            <p className="similar-location">{location}</p>
          </div>
          <div className="similar-icon-container">
            <FaSuitcase className="similar-job-type-image" />
            <p className="similar-job-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItems
