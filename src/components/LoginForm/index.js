import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    // console.log('It is Success')

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    // console.log('It is failure')
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    // console.log('enter submit form')
    const {username, password} = this.state

    const userDetails = {username, password}

    // console.log(1)
    const apiUrl = 'https://apis.ccbp.in/login'

    // console.log(2)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    // console.log(3)
    const response = await fetch(apiUrl, options)
    // console.log(4)
    // console.log(response)s
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)

      //   console.log(5)
    } else {
      //   console.log(6)
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    console.log(username)
    console.log(password)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="username-input"
              value={username}
              onChange={this.onChangeUserName}
            />

            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="password-input"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="form-submit-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
