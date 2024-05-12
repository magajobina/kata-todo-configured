import Task from '../task'
import './TaskList.css'

function TaskList({ tasks, onDeleted, onToggleDone }) {
  const tasksData = tasks.map((item) => {
    const { label, id, isDone } = item

    return (
      <Task
        key={id}
        task={label}
        onDeleted={() => {
          onDeleted(id)
        }}
        onToggleDone={() => {
          onToggleDone(id)
        }}
        isDone={isDone}
      />
    )
  })

  return <ul className="todo-list">{tasksData}</ul>
}

export default TaskList
