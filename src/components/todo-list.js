// eslint-disable-next-line no-unused-vars
import React from "react";
import TodoListItem from "./todo-list-item";
import './todo-list.css'

function TodoList({todos}) {  

  const elements = todos.map((item) => {

    const { id, label, important } = item 

    return (
      <li key={id}>
        <TodoListItem label={label} important={important} />
      </li>
    )
  })

  console.log(elements);
  return (
    <ul>
      {elements}
    </ul>
  );
}

export default TodoList