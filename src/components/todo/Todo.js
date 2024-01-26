import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Todo = ({
  id,
  text,
  isCompleted,
  isEditing,
  deleteTodo,
  editTodo,
  toggleCompletedTodo,
}) => {
  return (
    <div className="todo">
      <p
        className={isCompleted ? "completed" : ""}
        onClick={() => toggleCompletedTodo(id)}
      >
        {text}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(id)} />
      </div>
    </div>
  );
};
