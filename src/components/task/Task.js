import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

const dateDistance = formatDistanceToNow(new Date(2024, 4, 5), { includeSeconds: true })

class Task extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isDone: false,
  }

  // componentDidMount() {
  //   console.log('123')
  // }

  // componentWillUnmount() {
  //   console.log('qwe')
  // }

  onToggleClick = () => {
    this.setState(({ isDone }) => ({
      // в коллбек-функцию первым аргументом АВТОМАТОМ прилетает prev state, и мы его деструктурировали.
      isDone: !isDone,
    }))
  }

  render() {
    const { task, onDeleted } = this.props
    const { isDone } = this.state

    const classNames = isDone ? 'completed' : ''

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => {
              this.onToggleClick()
            }}
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
}

export default Task
