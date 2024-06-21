/* eslint-disable no-plusplus */
import React from 'react'
import Header from '../header'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.getRandomId = () => `_${Math.random().toString(36).slice(2, 11)}`
    this.getSeparatedTime = (time) => {
      if (time <= 0) {
        return '00:00'
      }
      let mins = parseInt((time % 3600) / 60, 10)
      let secs = parseInt(time % 60, 10)

      mins = mins < 10 ? `0${mins}` : mins
      secs = secs < 10 ? `0${secs}` : secs

      return `${mins}:${secs}`
    }
    this.createTodoItem = (label, timeStamp, timerTime) => ({
      label,
      id: this.getRandomId(),
      isDone: false,
      timeStamp,
      timerID: undefined,
      totalTime: +timerTime[0] * 60 + +timerTime[1],
      displayTime: this.getSeparatedTime(+timerTime[0] * 60 + +timerTime[1]),
    })

    this.getDataFromLocalStorage = () => {
      if (!localStorage.getItem('tasks')) return []
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
        clearInterval(todoData.find((item) => item.id === id).timerID)
        const newTodoData = todoData.filter((item) => item.id !== id)

        return { todoData: newTodoData }
      })
    }
    this.addItem = (value, timeStamp, timerData) => {
      this.setState(({ todoData }) => {
        const newItem = this.createTodoItem(value, timeStamp, timerData)
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
      this.onTimerPause(id)
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
    }
    this.getActiveFilteredData = (todoData, activeFilter) => {
      if (activeFilter === 'all') return todoData
      if (activeFilter === 'active') return todoData.filter((item) => !item.isDone)
      if (activeFilter === 'completed') return todoData.filter((item) => item.isDone)
      return todoData
    }
    this.onTimerPlay = (id) => {
      const { todoData } = this.state
      const currentTodo = todoData.find((item) => item.id === id)
      let { totalTime } = currentTodo

      clearInterval(currentTodo.timerID)

      const timerID = setInterval(() => {
        this.setState(({ todoData: prevTodoData }) => {
          const newTodoData = prevTodoData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                displayTime: this.getSeparatedTime(totalTime),
                totalTime,
              }
            }
            return item
          })
          return { todoData: newTodoData }
        })

        if (--totalTime < 0) {
          totalTime = 0
          clearInterval(timerID)
        }
      }, 1000)

      this.setState(({ todoData: prevTodoData }) => {
        const newTodoData = prevTodoData.map((item) => {
          if (item.id === id) {
            currentTodo.timerID = timerID
            return currentTodo
          }
          return item
        })
        return { todoData: newTodoData }
      })
    }
    this.onTimerPause = (id) => {
      const { todoData } = this.state
      const currentTodo = todoData.find((item) => item.id === id)

      clearInterval(currentTodo.timerID)

      currentTodo.timerID = undefined

      this.setState(() => {
        todoData.map((item) => {
          if (item.id === id) {
            return currentTodo
          }
          return item
        })
      })
    }

    this.componentDidUpdate = () => {
      const { todoData } = this.state
      localStorage.setItem('tasks', JSON.stringify(todoData))
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
            onEdit={this.onEdit}
            onTimerPlay={this.onTimerPlay}
            onTimerPause={this.onTimerPause}
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
