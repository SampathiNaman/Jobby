import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => this.setState({username: e.target.value})}
          placeholder="Username"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => this.setState({password: e.target.value})}
          placeholder="Password"
        />
      </div>
    )
  }

  login = async () => {
    const {username, password} = this.state
    const {history} = this.props

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {path: '/', expires: 30})
      this.setState({errorMsg: ''})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg})
    }
  }

  onSubmitLoginForm = e => {
    e.preventDefault()
    this.login()
  }

  render() {
    const {errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.onSubmitLoginForm} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorMsg && <p className="err-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
