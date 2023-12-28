import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Filter extends Component {
  state = {
    profile: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => this.getProfile()

  renderEmploymentFilter = () => {
    const {employmentType, changeEmploymentType} = this.props
    return (
      <>
        <h6 className="filter-title">Type of Employment</h6>
        <ul className="filter-options-container">
          {employmentTypesList.map(employment => {
            const {employmentTypeId, label} = employment
            return (
              <li className="filter-option-container" key={employmentTypeId}>
                <input
                  type="checkbox"
                  id={employmentTypeId}
                  value={employmentTypeId}
                  onChange={e => changeEmploymentType(e.target.value)}
                  checked={employmentType.includes(employmentTypeId)}
                />
                <label className="option" htmlFor={employmentTypeId}>
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  renderSalaryFilter = () => {
    const {salaryRange, changeSalaryRange} = this.props
    return (
      <>
        <h6 className="filter-title">Salary Range</h6>
        <ul className="filter-options-container">
          {salaryRangesList.map(salary => {
            const {salaryRangeId, label} = salary
            return (
              <li className="filter-option-container" key={salaryRangeId}>
                <input
                  type="radio"
                  id={salaryRangeId}
                  name="salary"
                  value={salaryRangeId}
                  onChange={e => changeSalaryRange(e.target.value)}
                  checked={salaryRange === salaryRangeId}
                />
                <label className="option" htmlFor={salaryRangeId}>
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profile} = this.state
    const {profileImageUrl, name, shortBio} = profile
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="retry-btn-container">
      <button
        type="button"
        onClick={this.getProfile}
        className="btn btn-primary"
      >
        Retry
      </button>
    </div>
  )

  renderProfileViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="filter-container">
          {this.renderProfileViews()}
          <hr className="separator" />
          {this.renderEmploymentFilter()}
          <hr className="separator" />
          {this.renderSalaryFilter()}
          <hr />
        </div>
      </>
    )
  }
}

export default Filter
