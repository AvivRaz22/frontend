import React, { useState } from "react";

export const EditTodoForm = ({
  id,
  text,
  isCompleted,
  isEditing,
  setTodoText,
}) => {
  const [value, setValue] = useState(text);

  const submit = () => {
    setTodoText(id, value);
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Update Task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={submit}>Update Task</button>
    </div>
  );
};
