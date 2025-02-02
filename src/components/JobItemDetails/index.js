import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaRegStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import {LiaExternalLinkAltSolid} from 'react-icons/lia'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getFormattedSimilarJobData = data => ({
    companyLogoUrl: data.company_logo_url,

    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,

    location: data.location,

    rating: data.rating,
    title: data.title,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      console.log(fetchedData.job_details)

      const updateJobData = this.getFormattedJobData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(similarJob =>
        this.getFormattedSimilarJobData(similarJob),
      )
      this.setState({
        jobData: updateJobData,
        similarJobs: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobs} = this.state
    //  console.log(similarJobs)

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData
    return (
      <>
        <img src={companyLogoUrl} alt="job details company logo" />
        <h1>{title}</h1>
        <FaRegStar />
        <p>{rating}</p>
        <FaMapMarkerAlt />
        <p>{location}</p>
        <FaBriefcase />
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <Link to={companyWebsiteUrl}>Visit</Link>
        <LiaExternalLinkAltSolid />
        <hr />
        <p>Description</p>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skills.map(skill => (
            <li key={skill.name}>
              <img src={skill.imageUrl} alt={skill.name} />
              <h1>{skill.name}</h1>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
        <p>{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.imageUrl} alt="life at company" />
        <h1>Similar Jobs</h1>
        <ul className="similar-products-list">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem
              JobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div> {this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
