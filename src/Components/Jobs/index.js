import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Filter from '../Filter'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobs: [],
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount = () => this.getJobsList()

  enterSearch = e => e.key === 'Enter' && this.getJobsList()

  changeEmploymentType = employment => {
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(employment)
          ? prevState.employmentType.filter(
              employmentTypeItem => employmentTypeItem !== employment,
            )
          : [...prevState.employmentType, employment],
      }),
      this.getJobsList,
    )
  }

  changeSalaryRange = salaryRange =>
    this.setState({salaryRange}, this.getJobsList)

  getJobsList = async () => {
    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${
      employmentType.length > 0 ? employmentType.join(',') : ''
    }&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        companyLogoUrl: job.company_logo_url,
        location: job.location,
        jobDescription: job.job_description,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobs: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsView = () => {
    const {jobs, searchInput} = this.state

    return jobs.length > 0 ? (
      <>
        <ul className="jobs-list-container">
          <div className="search-container d-none d-md-flex">
            <input
              type="search"
              value={searchInput}
              onChange={e => this.setState({searchInput: e.target.value})}
              onKeyDown={this.enterSearch}
              className="search-input"
              placeholder="Search"
            />
            <button
              type="button"
              aria-label="Search"
              data-testid="searchButton"
              onClick={this.getJobsList}
              className="search-btn"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          {jobs.map(job => (
            <JobCard job={job} key={job.id} />
          ))}
        </ul>
      </>
    ) : (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="w-75"
        />
        <h2 className="failure-title">No Jobs Found</h2>
        <p className="failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-75"
      />
      <h2 className="failure-title">Oops! Something Went Wrong</h2>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getJobsList}
        className="btn btn-primary px-4"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employmentType, salaryRange} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-container d-flex d-md-none">
            <input
              type="search"
              value={searchInput}
              onChange={e => this.setState({searchInput: e.target.value})}
              onKeyDown={this.enterSearch}
              className="search-input"
              placeholder="Search"
            />
            <button
              type="button"
              aria-label="Search"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.getJobsList}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Filter
            employmentType={employmentType}
            salaryRange={salaryRange}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            getJobsList={this.getJobsList}
          />
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}

export default Jobs
