import {BsSearch} from 'react-icons/bs'

const FiltersGroup = props => {
  const {changeSearchInput, enterSearchInput, searchInput} = props

  const onChangeSearch = event => {
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const renderSearchInput = () => (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearch}
        onKeyDown={onEnterSearchInput}
      />
      <BsSearch className="search-icon" />
    </div>
  )

  return <div>{renderSearchInput()}</div>
}

export default FiltersGroup
