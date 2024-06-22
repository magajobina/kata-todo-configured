/* eslint-disable no-plusplus */
import { useState, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'
import Header from '../header'
import TaskList from '../task-list'
import Footer from '../footer'

export default function App() {
  const getRandomId = () => nanoid()
  const getSeparatedTime = (time) => {
    if (time <= 0) {
      return '00:00'
    }
    let mins = parseInt((time % 3600) / 60, 10)
    let secs = parseInt(time % 60, 10)

    mins = mins < 10 ? `0${mins}` : mins
    secs = secs < 10 ? `0${secs}` : secs

    return `${mins}:${secs}`
  }

  const createTodoItem = (label, timeStamp, timerTime) => ({
    label,
    id: getRandomId(),
    isDone: false,
    timeStamp,
    timerID: undefined,
    totalTime: +timerTime[0] * 60 + +timerTime[1],
    displayTime: getSeparatedTime(+timerTime[0] * 60 + +timerTime[1]),
  })

  const getDataFromLocalStorage = () => {
    if (!localStorage.getItem('tasks')) return []
    const parseResult = JSON.parse(localStorage.getItem('tasks'))
    return parseResult.map((item) => ({
      ...item,
      timeStamp: new Date(item.timeStamp),
    }))
  }

  const [todoData, setTodoData] = useState(getDataFromLocalStorage())
  const [activeFilter, setActiveFilter] = useState('all')

  const deleteItem = useCallback((id) => {
    setTodoData((prevTodoData) => {
      clearInterval(prevTodoData.find((item) => item.id === id).timerID)
      return prevTodoData.filter((item) => item.id !== id)
    })
  }, [])

  const addItem = useCallback((value, timeStamp, timerData) => {
    setTodoData((prevTodoData) => {
      const newItem = createTodoItem(value, timeStamp, timerData)
      return [...prevTodoData, newItem]
    })
  }, [])

  const onTimerPause = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const currentTodo = prevTodoData.find((item) => item.id === id)

      clearInterval(currentTodo.timerID)

      return prevTodoData.map((item) => {
        if (item.id === id) {
          return { ...item, timerID: undefined }
        }
        return item
      })
    })
  }, [])

  const onToggleDone = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const newTodoData = prevTodoData.map((item) => {
        if (id === item.id) {
          return { ...item, isDone: !item.isDone }
        }
        return item
      })
      return newTodoData
    })
    onTimerPause(id)
  }, [])

  const onToggleFilter = (filterToOn) => {
    setActiveFilter(filterToOn)
  }

  const onClearCompleted = useCallback(() => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => !item.isDone))
  }, [])

  const onEdit = useCallback((id, label) => {
    setTodoData((prevTodoData) => {
      const newTodoData = prevTodoData.map((item) => {
        if (id === item.id) {
          return { ...item, label }
        }
        return item
      })
      return newTodoData
    })
  }, [])

  const getActiveFilteredData = () => {
    if (activeFilter === 'all') return todoData
    if (activeFilter === 'active') return todoData.filter((item) => !item.isDone)
    if (activeFilter === 'completed') return todoData.filter((item) => item.isDone)
    return todoData
  }

  const onTimerPlay = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const currentTodo = prevTodoData.find((item) => item.id === id)
      let { totalTime } = currentTodo

      clearInterval(currentTodo.timerID)

      const timerID = setInterval(() => {
        setTodoData((prevTodoData2) => {
          if (--totalTime < 0) {
            totalTime = 0
            clearInterval(timerID)
          }

          const newTodoData = prevTodoData2.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                displayTime: getSeparatedTime(totalTime),
                totalTime,
              }
            }
            return item
          })
          return newTodoData
        })
      }, 1000)

      return prevTodoData.map((item) => {
        if (item.id === id) {
          return { ...item, timerID }
        }
        return item
      })
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todoData))
  }, [todoData])

  const undoneItems = todoData.filter((item) => !item.isDone)

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <section className="main">
        <TaskList
          tasks={getActiveFilteredData(todoData, activeFilter)}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onTimerPlay={onTimerPlay}
          onTimerPause={onTimerPause}
        />
        <Footer tasksLeft={undoneItems.length} onFilter={onToggleFilter} onClearCompleted={onClearCompleted} />
      </section>
    </section>
  )
}
