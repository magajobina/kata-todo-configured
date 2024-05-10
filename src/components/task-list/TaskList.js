import Task from '../task'
import './TaskList.css'

export default function TaskList({ tasks, onDeleted }) {
  const tasksData = tasks.map((item) => {
    const { text, id } = item

    return <Task key={id} task={text} onDeleted={() => {onDeleted(id)}} />
  })

  return <ul className="todo-list">{tasksData}</ul>
}
