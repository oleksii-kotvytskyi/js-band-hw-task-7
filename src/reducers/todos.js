import { CREATE_TODO, EDIT_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions';

const todos = (state = [], action) => {
  switch (action.type) {
    case CREATE_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          ...action.todo,
        },
      ];
    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.todo.id) {
          return { ...action.todo };
        }
        return todo;
      });
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case REMOVE_TODO:
      return state.filter(todo => todo.id === action.id);
    default:
      return state;
  }
};

export default todos;
