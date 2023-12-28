import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  renderLargeDeviceNavItems = () => (
    <>
      <ul className="nav-items-container d-none d-md-flex">
        <Link to="/" className="nav-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        onClick={this.logout}
        className="logout-btn d-none d-md-block"
      >
        Logout
      </button>
    </>
  )

  renderSmallDeviceNavItems = () => (
    <ul className="nav-items-container d-flex d-md-none">
      <Link to="/" className="nav-item">
        <li>
          <AiFillHome />
        </li>
      </Link>
      <Link to="/jobs" className="nav-item">
        <li>
          <BsFillBriefcaseFill />
        </li>
      </Link>
      <li onClick={this.logout} className="nav-item">
        <FiLogOut />
      </li>
    </ul>
  )

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        {this.renderSmallDeviceNavItems()}
        {this.renderLargeDeviceNavItems()}
      </nav>
    )
  }
}

export default withRouter(Header)
