import PropTypes from 'prop-types'
import TasksFilter from '../tasks-filter'
import './Footer.css'

export default function Footer({ tasksLeft, onFilter, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TasksFilter onFilter={onFilter} />
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasksLeft: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}
