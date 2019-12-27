import React from 'react';

const ListItem = ({ todo, deleteItem }) => {
    const handleDeleteClick = (event) => {
        console.log(event);
        event.preventDefault();
        const confirmDeletion = window.confirm(`Do you really want to delete ${todo.content}?`);
        if (confirmDeletion) {
            deleteItem()
        }
    }
    
    return (
        <li key={todo.id} className="todo-list-item">
            <div className="list-text-content">
            {todo.content} 
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1493" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle" id="delete-svg" onClick={handleDeleteClick}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </li>
    )
}

export default ListItem;