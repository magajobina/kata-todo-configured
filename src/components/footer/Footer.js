import TasksFilter from '../tasks-filter'
import './Footer.css'

function Footer({ tasksLeft, onFilter, onClearCompleted }) {
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

export default Footer
