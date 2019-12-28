import React from "react";

const Form = ({ addListItem }) => {
  return (
    <div>
      <form onSubmit={addListItem}>
        What do you want to do today? <input type="text" name="todo" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
