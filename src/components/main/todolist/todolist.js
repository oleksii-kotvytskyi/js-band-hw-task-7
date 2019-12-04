import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoitem';
import './style.css';

function TodoList(props) {
  const { todolist, editTodo, toggleDone, deleteTodo } = props;
  return (
    <ul className="todoList">
      {todolist.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todolist: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
    }),
  ).isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
