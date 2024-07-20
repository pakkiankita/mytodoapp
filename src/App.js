import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const updateStatus = (id, isCompleted) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo))
    );
  };

  const editTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setSelectedTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.isCompleted;
      } else if (filter === "pending") {
        return !todo.isCompleted;
      }
      return true;
    })
    .filter((todo) => {
      return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo App</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TodoForm
          addTodo={addTodo}
          editTodo={editTodo}
          selectedTodo={selectedTodo}
        />
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search todos"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <select
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        editTodo={setSelectedTodo}
        deleteTodo={deleteTodo}
        updateStatus={updateStatus}
      />
    </div>
  );
};

export default App;
