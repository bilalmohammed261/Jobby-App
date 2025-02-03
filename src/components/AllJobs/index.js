import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  changeSearchInput = searchInput => {
    this.setState({
      searchInput,
    })
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(jobsUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobsData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: jobsData,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsListSuccessView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0
    return shouldShowJobsList ? (
      <>
        <ul>
          {jobsList.map(job => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      </>
    ) : (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs.Try other filters.</p>
      </>
    )
  }

  renderJobsListFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <Link to="/jobs">
        <button type="button">Retry</button>
      </Link>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <FiltersGroup
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {this.renderJobsList()}
      </>
    )
  }
}

export default AllJobs
