import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const SalaryFilter = props => {
  const {clickSalary} = props
  return (
    <div className="job-salary-filters-container">
      <h1 className="job-salary-filter-title">Salary Range</h1>
      <ul className="job-salary-list-container">
        {salaryRangesList.map(eachItem => {
          const onClickSalary = () => {
            clickSalary(eachItem.salaryRangeId)
          }
          return (
            <li className="job-salary-item" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                name="salary"
                className="job-filter-radio"
                onClick={onClickSalary}
              />
              <label
                htmlFor={eachItem.salaryRangeId}
                className="job-salary-filter-name"
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
export default SalaryFilter
