import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import List from "./components/List";
import { todoReducer } from "./reducers/todoReducer";

function App() {
  const [list, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [newTodo, setNewTodo] = useState("");
  const [organisedDateList, setOrganisedDateList] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

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
    dispatch({
      type: "ADD_TODO",
      todo: {
        content: newTodo,
        completed: false
      }
    });
  };

  const updateItem = id => {
    const todo = list.find(t => t.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    dispatch({ type: "UPDATE_TODO", id: id, updatedItem: updatedTodo });
  };

  const handleItemChange = e => {
    setNewTodo(e.target.value);
  };

  const deleteItem = id => {
    dispatch({ type: "REMOVE_TODO", id: id });
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
