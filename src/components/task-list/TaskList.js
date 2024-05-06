import Task from '../task'
import './TaskList.css'

function TaskList({ tasks }) {
  
  const tasksData = tasks.map((item) => {
    const { text, id } = item

    return <Task key={id} task={text} />
  })

  console.log(tasksData);

  return (
    <ul className="todo-list">
      {/* <Task task={tasks[0]} /> */}
      {tasksData}
    </ul>
  )
}

export default TaskList
