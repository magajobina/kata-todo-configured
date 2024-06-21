import { useState } from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default function TasksFilter({ onFilter }) {
  const [selectedButton, setSelectedButton] = useState('all')
  const clickHandler = (id) => {
    setSelectedButton(id)
    onFilter(id)
  }

  return (
    <ul className="filters">
      <li>
        <button
          className={selectedButton === 'all' ? 'selected' : ''}
          type="button"
          onClick={() => clickHandler('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 'active' ? 'selected' : ''}
          type="button"
          onClick={() => clickHandler('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={selectedButton === 'completed' ? 'selected' : ''}
          type="button"
          onClick={() => clickHandler('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
}
