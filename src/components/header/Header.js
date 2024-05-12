import NewTaskForm from '../new-task-form'
import './Header.css'

function Header({ onItemAdded }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} />
    </header>
  )
}

export default Header
