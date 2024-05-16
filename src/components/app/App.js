/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-class-component-methods */
import React from 'react'
import Header from '../header'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends React.Component {
  maxId = 100

  constructor(props) {
    super(props)

    this.getRandomId = () => `_${Math.random().toString(36).slice(2, 11)}`

    this.createTodoItem = (label, timeStamp) => ({
      label,
      id: this.getRandomId(),
      isDone: false,
      timeStamp,
    })

    this.getDataFromLocalStorage = () => {
      if (!localStorage.getItem('tasks'))
        return []
      const parseResult = JSON.parse(localStorage.getItem('tasks'))
      const resolvedTimeArr = parseResult.map((item) => ({
        ...item,
        timeStamp: new Date(item.timeStamp),
      }))

      return resolvedTimeArr
    }

    this.state = {
      todoData: this.getDataFromLocalStorage(),
      activeFilter: 'all',
    }

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.filter((item) => item.id !== id)

        return { todoData: newTodoData }
      })
    }
    this.addItem = (event, timeStamp) => {
      this.setState(({ todoData }) => {
        const newItem = this.createTodoItem(event.target.value, timeStamp)
        const newTodoData = [...todoData, newItem]

        return { todoData: newTodoData }
      })
    }
    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((item) => {
          if (id === item.id) {
            return { ...item, isDone: !item.isDone }
          }

          return item
        })

        return { todoData: newTodoData }
      })
    }
    this.onToggleFilter = (filterToOn) => {
      this.setState({
        activeFilter: filterToOn,
      })
    }
    this.onClearCompleted = () => {
      this.setState(({ todoData }) => {
        const undoneItems = todoData.filter((item) => !item.isDone)

        return { todoData: undoneItems }
      })
    }
    this.onEdit = (id, label) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((item) => {
          if (id === item.id) {
            return { ...item, label }
          }

          return item
        })

        return { todoData: newTodoData }
      })

      console.log(id, label);
    }
    this.getActiveFilteredData = (todoData, activeFilter) => {
      if (activeFilter === 'all') return todoData
      if (activeFilter === 'active') return todoData.filter((item) => !item.isDone)
      if (activeFilter === 'completed') return todoData.filter((item) => item.isDone)
      return todoData
    }

    this.componentDidUpdate = (prevProps, prevState) => {
      localStorage.setItem('tasks', JSON.stringify(this.state.todoData))
    }
  }

  render() {
    const { todoData, activeFilter } = this.state

    // const doneItems = todoData.filter((item) => item.isDone)
    const undoneItems = todoData.filter((item) => !item.isDone)

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={this.getActiveFilteredData(todoData, activeFilter)}
            onDeleted={this.deleteItem}
            onEdit={this.onEdit}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            tasksLeft={undoneItems.length}
            onFilter={this.onToggleFilter}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}
