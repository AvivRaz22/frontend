import React, { useEffect, useState } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [errComponent, setErrComponent] = useState();

  const getTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) =>
        setErrComponent(
          <div className="error-wrapper">
            <p>Error fetching todos: {error.message}</p>
          </div>
        )
      );
  };

  const updateTodos = (todos) => {
    setTodos(todos);
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos),
    }).catch((error) =>
      setErrComponent(
        <div className="error-wrapper">
          <p>Error updating server: {error.message}</p>
        </div>
      )
    );
  };

  useEffect(getTodos, []);

  const addTodo = (text) => {
    updateTodos([
      ...todos,
      { id: uuidv4(), text: text, isCompleted: false, isEditing: false },
    ]);
  };

  const deleteTodo = (todoID) => {
    updateTodos(todos.filter((todo) => todo.id !== todoID));
  };

  const toggleEditingTodo = (todoID) => {
    updateTodos(
      todos.map((todo) =>
        todo.id === todoID ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const toggleCompletedTodo = (todoID) => {
    updateTodos(
      todos.map((todo) =>
        todo.id === todoID ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const setTodoText = (todoID, newText) => {
    updateTodos(
      todos.map((todo) =>
        todo.id === todoID ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="wrapper">
      <h1>Get Things Done!</h1>
      <AddTodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm
            key={index}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            isEditing={todo.isEditing}
            setTodoText={setTodoText}
          />
        ) : (
          <Todo
            key={index}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            isEditing={todo.isEditing}
            deleteTodo={deleteTodo}
            editTodo={toggleEditingTodo}
            toggleCompletedTodo={toggleCompletedTodo}
          />
        )
      )}
      {errComponent}
    </div>
  );
};
