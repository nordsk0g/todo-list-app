import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import todoService from './services/todos';

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    todoService
      .getAll()
      .then(response => setList(response))
  }, [])

  const addItem = (event) => {
    event.preventDefault();
    const todoObject = {
      id: list.length + 1,
      content: newTodo,
      important: false,
      date: JSON.stringify(new Date())
    }

    todoService
      .create(todoObject)
      .then(response => {
        setList(list.concat(response))
        setNewTodo('');
      })
  }
  
  const handleItemChange = (e) => {
    setNewTodo(e.target.value);
  }

  const deleteItem = id => {
    const todo = list.find(t => t.id === id);

    todoService
      .remove(id, todo)
      .then(() => {
        setList(list.filter(item => item.id !== id))
      })
      .catch(error => console.error(error));
  }

  

  return (
    <div className="container">
      <h1>To-do List</h1>
      <List list={list} deleteItem={deleteItem} />
      <form className="todo-form" onSubmit={addItem}>
          What do you want to do today?
          <div className="input-and-button">
            <input className="new-task-input" value={newTodo} onChange={handleItemChange} />
            <button className="btn" type="submit">Submit</button>
          </div>
      </form>
    </div>
  );
}

export default App;
