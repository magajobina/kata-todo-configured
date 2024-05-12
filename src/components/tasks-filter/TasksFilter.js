import React from 'react'
import './TasksFilter.css'

export default class TasksFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedButton: 'all',
    }
  }

  clickHandler = (id) => {
    const { onFilter } = this.props

    this.setState({ selectedButton: id })
    onFilter(id)
  }

  render() {
    const { selectedButton } = this.state

    return (
      <ul className="filters">
        <li>
          <button
            className={selectedButton === 'all' ? 'selected' : ''}
            type="button"
            onClick={() => this.clickHandler('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={selectedButton === 'active' ? 'selected' : ''}
            type="button"
            onClick={() => this.clickHandler('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={selectedButton === 'completed' ? 'selected' : ''}
            type="button"
            onClick={() => this.clickHandler('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
