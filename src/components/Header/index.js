import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
      </Link>
      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
