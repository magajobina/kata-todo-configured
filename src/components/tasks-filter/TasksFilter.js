import './TasksFilter.css'

function TasksFilter() {
  return (
    <ul className="filters">
      <li>
        <button className="selected" type="button">All</button>
      </li>
      <li>
        <button type="button">Active</button>
      </li>
      <li>
        <button type="button">Completed</button>
      </li>
    </ul>
  )
}

export default TasksFilter
