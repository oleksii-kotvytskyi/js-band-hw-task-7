export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const FILTER_TODO = 'FILTER_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SHOW_MODAL = 'SHOW_MODAL';
export const CLEAR_EDIT_ITEM = 'CLEAR_EDIT_ITEM';

export const createTodo = todo => ({
  type: CREATE_TODO,
  showModal: true,
  todo,
});

export const editTodo = todo => ({
  type: EDIT_TODO,
  showModal: true,
  todo,
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const filterTodo = filter => ({
  type: FILTER_TODO,
  filter,
});

export const showModal = value => ({
  type: SHOW_MODAL,
  value,
});
export const clearEditItem = () => ({
  type: CLEAR_EDIT_ITEM,
  value: undefined,
});
