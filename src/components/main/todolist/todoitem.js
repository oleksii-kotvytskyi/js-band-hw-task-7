import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTodo, removeTodo, toggleTodo } from '../../../actions';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const {
      todo,
      editTodoInComponent,
      removeTodoInComponent,
      toggleTodoInComponent,
    } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <div
        className={`card text-white ${
          todo.done ? 'bg-success' : 'bg-secondary'
        }  mb-3 todoItem show`}
      >
        <div className="card-header">{todo.title}</div>
        <div className="card-body">
          <p className="card-text">{todo.description}</p>
        </div>
        <div className="d-flex justify-content-around card-footer">
          <p>{todo.priority}</p>

          <div
            className={
              dropdownOpen ? 'dropdownEditTodo open' : 'dropdownEditTodo'
            }
          >
            <button type="button" onClick={this.handleOpen}>
              ...
            </button>
            <ul>
              <li
                onClick={() => {
                  toggleTodoInComponent(todo.id);
                  this.handleOpen();
                }}
              >
                done
              </li>
              <li
                onClick={() => {
                  editTodoInComponent(todo);
                  this.handleOpen();
                }}
              >
                edit
              </li>
              <li
                onClick={() => {
                  removeTodoInComponent(todo.id);
                }}
              >
                delete
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    done: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  editTodoInComponent: PropTypes.func.isRequired,
  removeTodoInComponent: PropTypes.func.isRequired,
  toggleTodoInComponent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  editTodoInComponent: todo => dispatch(editTodo(todo)),
  toggleTodoInComponent: id => dispatch(toggleTodo(id)),
  removeTodoInComponent: id => dispatch(removeTodo(id)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
