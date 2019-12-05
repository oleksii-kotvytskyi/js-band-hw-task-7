import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './todoitem';
import sorted from '../../helpers/sorted';
import './style.css';

function TodoList(props) {
  const { todos, filter } = props;
  const filterTodos = sorted(filter, todos);

  return (
    <ul className="todoList">
      {filterTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(state => ({
  todos: state.todos.todos,
  filter: state.filterTodos,
}))(TodoList);
