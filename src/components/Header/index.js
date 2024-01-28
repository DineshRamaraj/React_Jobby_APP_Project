import {FaHome, FaSuitcase} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="header-nav-items-container">
          <Link to="/" className="nav-link">
            <li>
              <FaHome className="home-nav-logo" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <FaSuitcase className="job-nav-logo" />
            </li>
          </Link>
          <li>
            <IoIosLogOut className="logout-nav-logo" onClick={onClickLogout} />
          </li>
        </ul>
      </div>
      <div className="header-lg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
        <div className="header-nav-container">
          <Link to="/" className="nav-link">
            <p className="header-home">Home</p>
          </Link>
          <Link to="/jobs" className="nav-link">
            <p className="header-job">Jobs</p>
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
