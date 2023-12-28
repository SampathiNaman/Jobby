import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobItem
  return (
    <li className="job-card similar-job-card">
      <div className="d-flex align-items-center">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-logo"
        />
        <div>
          <h6 className="job-title p-0 m-0">{title}</h6>
          <div className="d-flex align-items-center">
            <FaStar className="start-icon" />
            <p className="p-0 m-0 mx-2">{rating}</p>
          </div>
        </div>
      </div>
      <div className="my-3">
        <h6 className="job-sub-heading">Description</h6>
        <p className="job-description">{jobDescription}</p>
      </div>
      <div className="d-flex justify-content-space-around align-items-center gap-3 my-3">
        <div className="d-flex align-items-center gap-2">
          <IoLocationSharp />
          <p className="job-detail">{location}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <BsFillBriefcaseFill />
          <p className="job-detail">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
