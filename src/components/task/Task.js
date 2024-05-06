import { formatDistanceToNow } from 'date-fns'
import './Task.css'

function Task({ task }) {
  const dateDistance = formatDistanceToNow(new Date(2024, 4, 5), { includeSeconds: true })
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <article>
          <span className="description">{task}</span>
          <span className="created">{dateDistance}</span>
        </article>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" />
      </div>
    </li>
  )
}

export default Task
