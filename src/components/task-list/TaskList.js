/* eslint-disable no-unused-vars */
import Task from '../task'
import './TaskList.css'

function TaskList({ tasks, onDeleted, onToggleDone, onEdit }) {
  const tasksData = tasks.map((item) => {
    const { label, id, isDone, timeStamp } = item

    return (
      <Task
        key={id}
        task={label}
        onDeleted={() => {
          onDeleted(id)
        }}
        onEdit={(changedLabel) => {
          onEdit(id, changedLabel)
        }}
        onToggleDone={() => {
          onToggleDone(id)
        }}
        isDone={isDone}
        timeStamp={timeStamp}
      />
    )
  })

  return <ul className="todo-list">{tasksData}</ul>
}

export default TaskList
