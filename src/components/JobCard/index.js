import {FaRegStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <FaRegStar />
        <p>{rating}</p>
        <FaMapMarkerAlt />
        <p>{location}</p>
        <FaBriefcase />
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
