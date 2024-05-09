import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import TaskList from './components/task-list'
import Footer from './components/footer'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todoData: [
        { text: 'Make awesome App', id: '3223' },
        { text: 'Boobs 3', id: '7788' },
        { text: 'Creepers be like: hhhhhhhh boom', id: '56756' },
      ],
    }

    this.deleteItem = (id) => {
      this.setState((prevState) => {
        const { todoData } = prevState

        const newTodoData = todoData.filter((item) => item.id !== id)

        return {
          todoData: newTodoData,
        }
      })
    }
  }

  render() {
    const { todoData } = this.state

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList tasks={todoData} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    )
  }
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
