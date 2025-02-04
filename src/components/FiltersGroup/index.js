import {BsSearch} from 'react-icons/bs'

const FiltersGroup = props => {
  const {
    changeSearchInput,
    enterSearchInput,
    searchInput,
    employmentTypesList,
    filterEmploymentTypes,
    salaryRangesList,
    updateSalaryRange,
  } = props

  const onChangeSearch = event => {
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onClickSearch = () => {
    enterSearchInput()
  }

  const onChangeCheckbox = event => {
    console.log(event.target.value, event.target.checked)
    filterEmploymentTypes(event.target.value, event.target.checked)
  }

  const onChangeRadio = event => {
    console.log(event.target.value)

    updateSalaryRange(event.target.value)
  }

  const renderEmploymentTypesList = () =>
    employmentTypesList.map(employmentType => (
      <li key={employmentType.employmentTypeId}>
        <input
          type="checkbox"
          id={employmentType.employmentTypeId}
          onChange={onChangeCheckbox}
          value={employmentType.employmentTypeId}
        />
        <label htmlFor={employmentType.employmentTypeId}>
          {employmentType.label}
        </label>
      </li>
    ))

  const renderSalaryRangesList = () =>
    salaryRangesList.map(salaryRange => (
      <li key={salaryRange.salaryRangeId}>
        <input
          type="radio"
          id={salaryRange.salaryRangeId}
          onChange={onChangeRadio}
          value={salaryRange.salaryRangeId}
          name="salary range"
        />
        <label htmlFor={salaryRange.salaryRangeId}>{salaryRange.label}</label>
      </li>
    ))

  const renderEmploymentTypes = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>{renderEmploymentTypesList()}</ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>{renderSalaryRangesList()}</ul>
    </div>
  )

  const renderSearchInput = () => (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearch}
        onKeyDown={onEnterSearchInput}
      />
      <button type="button" data-testid="searchButton" onClick={onClickSearch}>
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  return (
    <div>
      {renderSearchInput()}
      {renderEmploymentTypes()}
      {renderSalaryRanges()}
    </div>
  )
}

export default FiltersGroup
