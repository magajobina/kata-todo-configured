import TasksFilter from "../tasks-filter"
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
        <TasksFilter />
      <button className="clear-completed" type="button">Clear completed</button>
    </footer>
  )
}

export default Footer
