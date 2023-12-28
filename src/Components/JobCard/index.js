import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="job-card">
      <div className="d-flex align-items-center">
        <img src={companyLogoUrl} alt="company logo" className="job-logo" />
        <div>
          <h1 className="job-title p-0 m-0">{title}</h1>
          <div className="d-flex align-items-center">
            <FaStar className="start-icon" />
            <p className="p-0 m-0 mx-2">{rating}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div className="d-flex justify-content-space-around align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <IoLocationSharp />
            <p className="job-detail">{location}</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <BsFillBriefcaseFill />
            <p className="job-detail">{employmentType}</p>
          </div>
        </div>
        <p className="p-0 m-0">{packagePerAnnum}</p>
      </div>
      <hr className="separator" />
      <div>
        <h2 className="job-sub-heading">Description</h2>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
