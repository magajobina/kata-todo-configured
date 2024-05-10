import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

const dateDistance = formatDistanceToNow(new Date(2024, 4, 5), { includeSeconds: true })

export default function Task({ task, onDeleted }) {

  const [isDone, setIsDone] = useState(false)

  const onToggleClick = () => {
    setIsDone(!isDone)
  }

  const classNames = isDone ? 'completed' : ''

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleClick}
        />
        <article>
          <span className="description">{task}</span>
          <span className="created">{dateDistance}</span>
        </article>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  )
}

