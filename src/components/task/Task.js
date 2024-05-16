/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types' // ES6
import './Task.css'
import { isEditable } from '@testing-library/user-event/dist/utils'

// const dateDistance = formatDistanceToNow(new Date(2024, 4, 13), { includeSeconds: true })
// const dateDistance = formatDistanceToNow(new Date(), { includeSeconds: true })

export default class Task extends React.Component {
  static defaultProps = {
    isDone: true,
  }

  static propTypes = {
    isDone: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      timeDistance: props.timeStamp,
      isEditing: false,
      inputText: this.props.task,
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
      const { timeStamp } = this.props
      this.setState({
        timeDistance: formatDistanceToNow(timeStamp, { includeSeconds: true }),
      })
    }
    this.editBtnHandler = (e) => {
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
    const { task, onDeleted, onToggleDone, isDone, timeStamp } = this.props
    const { isEditing, inputText } = this.state

    const liClassForm = () => {
      if (isDone) return 'completed'
      if (isEditing) return 'editing'
      return ''
    }

    const defaultChecked = isDone ? 'checked' : ''

    const dateDistance = formatDistanceToNow(timeStamp, { includeSeconds: true })

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
            <span className="description">{task}</span>
            <span className="created">{dateDistance} ago</span>
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
