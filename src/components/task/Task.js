import './Task.css';

function Task({task}) {
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <article>
          <span className="description">{task}</span>
          <span className="created">created 5 minutes ago</span>
        </article>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" />
      </div>
    </li>
  )
}

export default Task
