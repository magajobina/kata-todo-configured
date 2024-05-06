// import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import TaskList from './components/task-list'
import Footer from './components/footer'

function App() {
  const someData = [{ text: 'qweqwe', id: '3223' }, { text: 'dgdfdgg', id: '7788' }, { text: 'hhhhhhhh', id: '56756' }]

  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList tasks={someData} />
        <Footer />
      </section>
    </section>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
