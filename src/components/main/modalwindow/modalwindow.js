import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from '../../helpers/dropdown';
import './style.css';
import {
  createTodo,
  showModal,
  editTodo,
  clearEditItem,
} from '../../../actions';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openByPriority: {
        name: 'openByPriority',
        open: true,
      },
      title: '',
      description: '',
      priority: 'high',
      id: null,
      done: false,
    };

    this.visibleToggle = this.visibleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetData = this.resetData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { editItem } = this.props;
    if (editItem) {
      if (prevProps.editItem !== editItem) {
        const { title, description, priority, id, done } = editItem;
        this.setState({
          title,
          description,
          priority,
          id,
          done,
        });
      }
    }
  }

  handleChange(e) {
    const target = e.target.tagName;
    const name = target === 'INPUT' ? 'title' : 'description';
    const { value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { title, description, priority, done, id } = this.state;
    const createObject = {
      title,
      description,
      priority,
      done,
    };
    const {
      handleShowModal,
      creatTodoInComp,
      editTodoInComponent,
      editItem,
      clearEditItemInComponent,
    } = this.props;

    event.preventDefault();
    if (!editItem) {
      creatTodoInComp(createObject);
    } else {
      editTodoInComponent({ ...createObject, id });
      clearEditItemInComponent();
    }

    handleShowModal(false);
    this.resetData();
  }

  handleCancel() {
    const { handleShowModal } = this.props;
    handleShowModal(false);
    this.resetData();
  }

  handleClick(e) {
    this.setState({
      priority: e.target.innerText,
    });
  }

  resetData() {
    this.setState({
      title: '',
      description: '',
      priority: 'high',
      id: null,
      done: false,
    });
  }

  visibleToggle(item) {
    this.setState(prevState => ({
      [item.name]: {
        ...prevState[item.name],
        open: !prevState[item.name].open,
      },
    }));
  }

  render() {
    const { openByPriority, title, description, priority } = this.state;
    const { show } = this.props;
    const priorityItems = ['high', 'normal', 'low'];

    return (
      <div className={show ? 'modalWindow show' : 'modalWindow'}>
        <form className="createTodoContent" onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              placeholder="Title"
              title="please fill this field"
              className="form-control"
              value={title}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Description:
            <div>
              <textarea
                placeholder="Description"
                className="form-control"
                value={description}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <p>Priority: </p>
          <Dropdown
            items={priorityItems}
            dropdownInf={openByPriority}
            visibleToggle={this.visibleToggle}
            handleClick={this.handleClick}
            textValue={priority}
          />
          <div className="btnGroup">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-outline-success">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ModalWindow.defaultProps = {
  editItem: undefined,
};

ModalWindow.propTypes = {
  show: PropTypes.bool.isRequired,
  editItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  handleShowModal: PropTypes.func.isRequired,
  creatTodoInComp: PropTypes.func.isRequired,
  editTodoInComponent: PropTypes.func.isRequired,
  clearEditItemInComponent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  show: state.todos.showModal,
  editItem: state.todos.editItem,
});

const mapDispatchToProps = dispatch => ({
  creatTodoInComp: todo => dispatch(createTodo(todo)),
  editTodoInComponent: todo => dispatch(editTodo(todo)),
  handleShowModal: value => dispatch(showModal(value)),
  clearEditItemInComponent: () => dispatch(clearEditItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
