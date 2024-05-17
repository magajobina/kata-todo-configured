import PropTypes from 'prop-types'
import Task from '../task'
import './TaskList.css'

export default function TaskList({ tasks, onDeleted, onToggleDone, onEdit }) {
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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
      timeStamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,

  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
