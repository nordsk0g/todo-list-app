import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import todoService from "./services/todos";

function App() {
  const [list, setList] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [newTodo, setNewTodo] = useState("");
  const [organisedDateList, setOrganisedDateList] = useState({});

  // useEffect(() => {
  //   setDate(Object.keys(organisedDateList)[0]);
  // }, [organisedDateList]);

  useEffect(() => {
    todoService.getAll().then(response => setList(response.reverse()));
  }, []);

  useEffect(() => {
    let newList = {
      [date]: []
    };
    list.forEach(item => {
      let parsedAndFormattedDate = new Date(
        JSON.parse(item.date)
      ).toLocaleDateString();
      if (newList.hasOwnProperty(parsedAndFormattedDate)) {
        newList = {
          ...newList,
          [parsedAndFormattedDate]: [
            ...newList[parsedAndFormattedDate],
            { content: item.content, id: item.id, completed: item.completed }
          ]
        };
      } else {
        newList = {
          ...newList,
          [parsedAndFormattedDate]: [
            { content: item.content, id: item.id, completed: item.completed }
          ]
        };
      }
    });

    setOrganisedDateList(newList);
  }, [list, date]);

  const addItem = event => {
    event.preventDefault();
    const todoObject = {
      id: list.length + 1,
      content: newTodo,
      completed: false,
      date: JSON.stringify(new Date())
    };

    todoService.create(todoObject).then(response => {
      setList(list.concat(response));
      setNewTodo("");
      setDate(new Date().toLocaleDateString());
    });
  };

  const updateItem = id => {
    const todo = list.find(t => t.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    todoService
      .update(id, updatedTodo)
      .then(returnedTodo => {
        setList(list.map(item => (item.id !== id ? item : returnedTodo)));
      })
      .catch(error => console.error(error));
  };

  const handleItemChange = e => {
    setNewTodo(e.target.value);
  };

  const deleteItem = id => {
    const todo = list.find(t => t.id === id);

    todoService
      .remove(id, todo)
      .then(() => {
        setList(list.filter(item => item.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>To-do List</h1>
      <List
        list={list}
        updateItem={updateItem}
        deleteItem={deleteItem}
        organisedDateList={organisedDateList}
        // initialDate={Object.keys(organisedDateList)[0]}
        date={date}
        setDate={setDate}
      />
      <form
        className={
          date === new Date().toLocaleDateString() ? "todo-form" : "todo-form"
        }
        onSubmit={addItem}
      >
        What do you want to do today?
        <div className="input-and-button">
          <input
            className="new-task-input"
            value={newTodo}
            onChange={handleItemChange}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
