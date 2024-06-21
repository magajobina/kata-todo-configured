import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default function NewTaskForm({ onItemAdded }) {
  const onEnterHandler = (textInput, timerTime) => {
    if (textInput.value !== '' && textInput.value !== ' ') {
      onItemAdded(textInput.value, new Date(), timerTime)
      return true
    }
    return false
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const mins = e.target[1].value !== '' ? e.target[1].value : 0 // если пусто то ноль
    const secs = e.target[2].value !== '' ? e.target[2].value : 0 // если пусто то ноль

    if (onEnterHandler(e.target[0], [mins, secs])) {
      e.target[0].value = ''
      e.target[1].value = ''
      e.target[2].value = ''
    }
  }

  return (
    <form onSubmit={submitHandler} className="new-todo-form">
      <input className="new-todo" placeholder="Task" />
      <input className="new-todo-form__timer timer-mins" type="number" min={0} max={60} step={1} placeholder="Min" />
      <input className="new-todo-form__timer timer-secs" type="number" min={0} max={60} step={1} placeholder="Sec" />
      <input className="qwe" type="submit" hidden />
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
