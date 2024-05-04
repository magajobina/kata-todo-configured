function TodoListItem({ label, important = false }) {
  
  const style = {
    color: important ? 'tomato' : 'black',
    fontSize: 20,
  }

  return <span style={style}>{label}</span>
}

export default TodoListItem