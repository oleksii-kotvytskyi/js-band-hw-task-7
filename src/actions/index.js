export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const FILTER_TODO = 'FILTER_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SHOW_MODAL = 'SHOW_MODAL';
export const CLEAR_EDIT_ITEM = 'CLEAR_EDIT_ITEM';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SORTY_BY = {
  searchText: '',
  priority: 'all',
  completed: 'all',
};

export const createTodo = todo => ({
  type: CREATE_TODO,
  payload: {
    showModal: true,
    todo,
  },
});

export const editTodo = todo => ({
  type: EDIT_TODO,
  payload: {
    showModal: true,
    todo,
  },
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: {
    id,
  },
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {
    id,
  },
});

export const filterTodo = filter => ({
  type: FILTER_TODO,
  payload: {
    filter,
  },
});

export const showModal = value => ({
  type: SHOW_MODAL,
  payload: {
    value,
  },
});
export const clearEditItem = () => ({
  type: CLEAR_EDIT_ITEM,
  payload: {
    value: undefined,
  },
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: {
    filter,
  },
});
