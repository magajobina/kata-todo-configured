/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

const dateDistance = formatDistanceToNow(new Date(2024, 4, 5), { includeSeconds: true })

export default class Task extends React.Component {

  render() {
    const { task, onDeleted, onToggleDone, isDone } = this.props

    const classNames = isDone ? 'completed' : ''

    const defaultChecked  = isDone ? 'checked' : ''

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={defaultChecked} onClick={onToggleDone} />
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
}
