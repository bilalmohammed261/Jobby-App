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
      <p>Description</p>
      <FaMapMarkerAlt />
      <p>{location}</p>
      <FaBriefcase />
      <p>{employmentType}</p>

      <hr />

      <p>{jobDescription}</p>
      <h1>Skills</h1>
    </li>
  )
}

export default SimilarJobItem
