import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {eachJobItem} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobItem

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card-item">
        <div className="card-item-image-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="card-item-image"
          />
          <div className="card-item-title-container">
            <h1 className="card-item-heading">{title}</h1>
            <div className="card-item-rating-container">
              <BsStarFill className="card-item-star-image" />
              <p className="card-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="card-item-location-salary-container">
          <div className="card-item-location-container">
            <div className="card-item-icon-container">
              <MdLocationOn className="card-item-location-image" />
              <p className="card-item-location">{location}</p>
            </div>
            <div className="card-item-icon-container">
              <FaSuitcase className="card-item-job-type-image" />
              <p className="card-item-job-type">{employmentType}</p>
            </div>
          </div>
          <p className="card-item-package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="card-item-description-container">
          <h1 className="card-item-description-heading">Description</h1>
          <p className="card-item-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
