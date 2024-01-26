import React, { useState } from "react";

export const AddTodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const submit = () => {
    addTodo(value);
    setValue("");
  };

  return (
    <div className="form add-todo-form">
      <input
        type="text"
        placeholder="What is the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={submit}>Add Task</button>
    </div>
  );
};
