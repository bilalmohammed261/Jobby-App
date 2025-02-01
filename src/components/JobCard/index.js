import {FaRegStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'

const JobCard = props => {
  const {jobDetails} = props
  const {
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
      <p>Description</p>
      <p>{jobDescription}</p>
    </li>
  )
}

export default JobCard
