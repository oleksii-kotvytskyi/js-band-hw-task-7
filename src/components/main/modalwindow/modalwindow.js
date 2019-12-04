import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../helpers/dropdown';
import './style.css';

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
        const { title, description, priority, id } = editItem;
        this.setState({
          title,
          description,
          priority,
          id,
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
    const { title, description, priority, id } = this.state;
    const { creatTodo, editTodo, editItem } = this.props;
    event.preventDefault();
    if (!editItem) {
      creatTodo({ title, description, priority });
    } else {
      editTodo({ title, description, priority, id });
    }

    this.resetData();
  }

  handleCancel() {
    const { handleShowModal } = this.props;
    handleShowModal();
    this.resetData();
  }

  handleClick(e) {
    this.setState({
      priority: e.target.innerText,
    });
  }

  resetData() {
    const { resetItem } = this.props;
    this.setState({
      title: '',
      description: '',
      priority: 'high',
      edit: false,
      id: null,
    });
    resetItem();
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
  }),
  creatTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired,
};

export default ModalWindow;
