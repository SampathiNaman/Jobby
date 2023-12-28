import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount = () => this.getJobItemDetails()

  getFormattedJobDetails = jobItemDetails => ({
    id: jobItemDetails.id,
    companyLogoUrl: jobItemDetails.company_logo_url,
    companyWebsiteUrl: jobItemDetails.company_website_url,
    title: jobItemDetails.title,
    rating: jobItemDetails.rating,
    location: jobItemDetails.location,
    employmentType: jobItemDetails.employment_type,
    packagePerAnnum: jobItemDetails.package_per_annum,
    jobDescription: jobItemDetails.job_description,
    skills: jobItemDetails.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    })),
    lifeAtCompany: {
      description: jobItemDetails.life_at_company.description,
      imageUrl: jobItemDetails.life_at_company.image_url,
    },
  })

  getFormattedSimilarJobs = similarJobs =>
    similarJobs.map(similarJob => ({
      id: similarJob.id,
      companyLogoUrl: similarJob.company_logo_url,
      title: similarJob.title,
      rating: similarJob.rating,
      jobDescription: similarJob.job_description,
      location: similarJob.location,
      employmentType: similarJob.employment_type,
    }))

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: this.getFormattedJobDetails(data.job_details),
        similarJobs: this.getFormattedSimilarJobs(data.similar_jobs),
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItem = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <>
        <div className="job-card">
          <div className="d-flex align-items-center">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-logo"
            />
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
            <div className="d-flex justify-content-between align-items-center my-4">
              <h6 className="job-sub-heading p-0 m-0">Description</h6>
              <a href={companyWebsiteUrl} className="visit-container">
                <span className="visit">Visit</span> <FaExternalLinkAlt />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h6 className="job-sub-heading">Skills</h6>
            <ul className="skills-list-container">
              {skills.map(skill => (
                <li key={skill.name} className="skill-container">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
            <h6 className="job-sub-heading">Life at Company</h6>
            <div className="life-at-company-container">
              <p className="job-description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="text-white">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobs.map(similarJobItem => (
              <SimilarJobItem
                similarJobItem={similarJobItem}
                key={similarJobItem.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-75 w-md-50 w-lg-25"
      />
      <h6 className="failure-title">Oops! Something Went Wrong</h6>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getJobItemDetails}
        className="btn btn-primary px-4"
      >
        Retry
      </button>
    </div>
  )

  renderJobItemViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItem()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-container">{this.renderJobItemViews()}</div>
      </>
    )
  }
}

export default JobItem
