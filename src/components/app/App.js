import React from 'react'
import Header from '../header'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends React.Component {
  maxId = 100

  constructor(props) {
    super(props)

    // eslint-disable-next-line no-plusplus
    this.createTodoItem = (label) => ({ label, id: this.maxId++, isDone: false })

    this.state = {
      todoData: [this.createTodoItem('Make awesome App'), this.createTodoItem('Create react boobs app')],
      activeFilter: 'all',
    }

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.filter((item) => item.id !== id)

        return { todoData: newTodoData }
      })
    }
    this.addItem = (event) => {
      this.setState(({ todoData }) => {
        const newItem = this.createTodoItem(event.target.value)
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
    this.getActiveFilteredData = (todoData, activeFilter) => {
      if (activeFilter === 'all') return todoData
      if (activeFilter === 'active') return todoData.filter((item) => !item.isDone)
      if (activeFilter === 'completed') return todoData.filter((item) => item.isDone)
      return todoData
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
