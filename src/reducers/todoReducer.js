import uuid from "uuid/v1";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: uuid(),
          content: action.todo.content,
          completed: action.todo.completed || false,
          date: JSON.stringify(new Date())
        }
      ];
    case "REMOVE_TODO":
      return state.filter(item => item.id !== action.id);
    case "UPDATE_TODO":
      return state.map(item =>
        item.id !== action.id ? item : action.updatedItem
      );
    default:
      return state;
  }
};
