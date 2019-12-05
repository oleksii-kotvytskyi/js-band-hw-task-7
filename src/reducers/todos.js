import {
  CREATE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SHOW_MODAL,
  CLEAR_EDIT_ITEM,
} from '../actions';

const initialState = {
  todos: [],
  showModal: false,
  editItem: undefined,
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        showModal: action.showModal,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            ...action.todo,
          },
        ],
      };
    case EDIT_TODO:
      return {
        ...state,
        showModal: action.showModal,
        editItem: action.todo,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id ? { ...action.todo } : todo,
        ),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.value,
      };
    case CLEAR_EDIT_ITEM:
      return {
        ...state,
        editItem: action.value,
      };
    default:
      return state;
  }
};

export default todos;
