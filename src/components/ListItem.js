import React from "react";

const ListItem = ({ todo, updateItem, deleteItem }) => {
  const handleDeleteClick = event => {
    event.preventDefault();
    const confirmDeletion = window.confirm(
      `Do you really want to delete ${todo.content}?`
    );
    if (confirmDeletion) {
      deleteItem();
    }
  };

  const handleCompleteClick = event => {
    event.preventDefault();
    updateItem();
    console.log("updated...");
  };

  console.log(todo);

  return (
    <li className="todo-list-item">
      <div
        className={
          todo.completed
            ? "list-text-content completed-item"
            : "list-text-content"
        }
      >
        {todo.content}
      </div>
      <div className="icons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7eff3e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="complete-svg"
          onClick={handleCompleteClick}
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff1493"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x-circle"
          id="delete-svg"
          onClick={handleDeleteClick}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
    </li>
  );
};

export default ListItem;
