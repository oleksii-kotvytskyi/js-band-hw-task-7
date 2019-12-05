import { SET_VISIBILITY_FILTER, SORTY_BY } from '../actions';

const filterTodos = (state = SORTY_BY, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterTodos;
