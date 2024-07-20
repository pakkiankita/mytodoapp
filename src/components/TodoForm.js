import React, { useState, useEffect } from "react";

const TodoForm = ({ addTodo, editTodo, selectedTodo }) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo.text);
    }
  }, [selectedTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      if (selectedTodo) {
        editTodo({
          ...selectedTodo,
          text: todo,
        });
      } else {
        addTodo({
          id: Date.now(),
          text: todo,
          isCompleted: false,
        });
      }
      setTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline my-4">
      <input
        type="text"
        className="form-control mr-2"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit" className="btn btn-primary">
        {selectedTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
