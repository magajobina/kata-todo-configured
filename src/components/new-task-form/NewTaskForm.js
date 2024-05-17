import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
    }
  }

  onInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    })
  }

  onEnterHandler = (e) => {
    const { onItemAdded } = this.props

    if (e.key === 'Enter' && e.target.value !== '' && e.target.value !== ' ') {
      onItemAdded(e, new Date())

      this.setState({
        inputText: ''
      })
    }
  }

  render() {
    const { inputText } = this.state

    return (
      <input
        className="new-todo"
        value={inputText}
        placeholder="What needs to be done?"
        onChange={this.onInputChange}
        onKeyDown={this.onEnterHandler}
      />
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}