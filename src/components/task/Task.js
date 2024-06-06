/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { format, formatDistanceToNow } from 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'
import './Task.css'

let countdown
let isPaused = false
let remainingTime = 0

export default class Task extends React.Component {
  constructor(props) {
    super(props)

    const { timeStamp, task } = props

    this.state = {
      timeDistance: formatDistanceToNow(timeStamp, { includeSeconds: true }),
      isEditing: false,
      inputText: task,
    }
    this.onInputChange = (e) => {
      this.setState({
        inputText: e.target.value,
      })
    }
    this.onEnterHandler = (e) => {
      const { onEdit } = this.props

      if (e.key === 'Enter' && e.target.value !== '' && e.target.value !== ' ') {
        onEdit(e.target.value)

        this.setState({
          isEditing: false,
        })
      }
    }
    this.tick = () => {
      this.setState({
        timeDistance: formatDistanceToNow(timeStamp, { includeSeconds: true }),
      })
    }
    this.editBtnHandler = () => {
      this.setState({
        isEditing: true,
      })
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    const { task, onDeleted, onToggleDone, isDone, onTimerPlay, onTimerPause, displayTime } = this.props
    const { isEditing, inputText, timeDistance } = this.state

    const liClassForm = () => {
      if (isEditing) return 'editing'
      if (isDone) return 'completed'
      return ''
    }

    const defaultChecked = isDone ? 'checked' : ''

    const editForm = (
      <input
        type="text"
        className="edit"
        onChange={this.onInputChange}
        onKeyDown={this.onEnterHandler}
        value={inputText}
      />
    )

    return (
      <li className={liClassForm()}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={defaultChecked} onClick={onToggleDone} />
          <article>
            <span className="title">{task}</span>
            <span className="description">
              <button onClick={onTimerPlay} className="icon icon-play" />
              <button onClick={onTimerPause} className="icon icon-pause" />
              {displayTime}
            </span>
            <span className="description">{timeDistance} ago</span>
          </article>
          <button
            type="button"
            className="icon icon-edit"
            onClick={(e) => {
              this.editBtnHandler(e)
            }}
          />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {isEditing === true ? editForm : null}
      </li>
    )
  }
}

Task.defaultProps = {
  isDone: false,
}

Task.propTypes = {
  task: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  isDone: PropTypes.bool,
  timeStamp: PropTypes.instanceOf(Date).isRequired,
}
