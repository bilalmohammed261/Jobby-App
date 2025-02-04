import {FaRegStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'

const SimilarJobItem = props => {
  const {JobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = JobDetails
  return (
    <li>
      <img src={companyLogoUrl} alt="similar job company logo" />
      <h1>{title}</h1>
      <FaRegStar />
      <p>{rating}</p>
      <h1>Description</h1>
      <FaMapMarkerAlt />
      <p>{location}</p>
      <FaBriefcase />
      <p>{employmentType}</p>

      <hr />

      <p>{jobDescription}</p>
    </li>
  )
}

export default SimilarJobItem
