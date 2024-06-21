import { formatDistanceToNow } from 'date-fns'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

export default function Task({
  task,
  onDeleted,
  onToggleDone,
  isDone = false,
  onTimerPlay,
  onTimerPause,
  displayTime,
  timeStamp,
  onEdit,
}) {
  const [timeDistance, setTimeDistance] = useState(formatDistanceToNow(timeStamp, { includeSeconds: true }))
  const [isEditing, setIsEditing] = useState(false)
  const [inputText, setInputText] = useState(task)

  const onInputChange = (e) => {
    setInputText(e.target.value)
  }

  const onEnterHandler = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      onEdit(e.target.value)
      setIsEditing(false)
    }
  }

  const tick = () => {
    // console.log('tick');
    setTimeDistance(formatDistanceToNow(timeStamp, { includeSeconds: true }))
  }

  const editBtnHandler = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)

    // console.log('Сработал эффект таймера в Task')

    return () => {
      clearInterval(timerID)
      // console.log('Сработала очистка эффекта таймера в Task')
    }
  }, [])

  const liClassForm = () => {
    if (isEditing) return 'editing'
    if (isDone) return 'completed'
    return ''
  }

  const defaultChecked = isDone ? 'checked' : ''

  const editForm = (
    <input type="text" className="edit" onChange={onInputChange} onKeyDown={onEnterHandler} value={inputText} />
  )

  return (
    <li className={liClassForm()}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={defaultChecked} onClick={onToggleDone} />
        <article>
          <span className="title">{task}</span>
          <span className="description">
            <button onClick={onTimerPlay} className="icon icon-play" type="button" />
            <button onClick={onTimerPause} className="icon icon-pause" type="button" />
            {displayTime}
          </span>
          <span className="description">{timeDistance} ago</span>
        </article>
        <button
          type="button"
          className="icon icon-edit"
          onClick={(e) => {
            editBtnHandler(e)
          }}
        />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {isEditing && editForm}
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  isDone: PropTypes.bool.isRequired,
  timeStamp: PropTypes.instanceOf(Date).isRequired,
  onTimerPlay: PropTypes.func.isRequired,
  onTimerPause: PropTypes.func.isRequired,
  displayTime: PropTypes.string.isRequired,
}
