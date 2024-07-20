import React from "react";

const TodoList = ({
  todos,
  toggleComplete,
  editTodo,
  deleteTodo,
  updateStatus,
}) => {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className="todo-text"
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </span>
          <div className="todo-buttons">
            <select
              className="form-control"
              value={todo.isCompleted ? "completed" : "pending"}
              onChange={(e) =>
                updateStatus(todo.id, e.target.value === "completed")
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => editTodo(todo)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
