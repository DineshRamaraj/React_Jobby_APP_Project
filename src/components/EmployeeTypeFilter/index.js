import './index.css'

const EmployeeTypeFilter = props => {
  const {clickCheckBox, employmentTypesList} = props

  return (
    <div className="job-type-filters-container">
      <h1 className="job-filter-type-employment">Type of Employment</h1>
      <ul className="job-filter-list-container">
        {employmentTypesList.map(eachItem => {
          const onClickCheckBox = () => {
            clickCheckBox(eachItem.employmentTypeId)
            /* console.log(eachItem.employmentTypeId) */
          }

          return (
            <li
              className="job-filter-type-container"
              key={eachItem.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                className="job-filter-checkbox"
                onClick={onClickCheckBox}
                value={eachItem.isChecked}
              />
              <label
                htmlFor={eachItem.employmentTypeId}
                className="job-filter-type-name"
              >
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EmployeeTypeFilter
