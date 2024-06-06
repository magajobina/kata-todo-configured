/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // inputText: '',
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    const mins = e.target[1].value !== '' ? e.target[1].value : 0 // если пусто то ноль
    const secs = e.target[2].value !== '' ? e.target[2].value : 0 // если пусто то ноль

    if (this.onEnterHandler(e.target[0], [mins, secs])) {
      e.target[0].value = ''
      e.target[1].value = ''
      e.target[2].value = ''
    }
  }

  onEnterHandler = (textInput, timerTime) => {
    const { onItemAdded } = this.props

    if (textInput.value !== '' && textInput.value !== ' ') {
      console.log(timerTime);
      onItemAdded(textInput.value, new Date(), timerTime)
      return true
    }
    return false
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="new-todo-form">
        <input className="new-todo" placeholder="Task" />
        <input className="new-todo-form__timer timer-mins" type="number" min={0} max={60} step={1} placeholder="Min" />
        <input className="new-todo-form__timer timer-secs" type="number" min={0} max={60} step={1} placeholder="Sec" />
        <input className="qwe" type="submit" hidden />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
