import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropDown from '../../helpers/dropdown';
import { showModal, setVisibilityFilter } from '../../../actions';

class HeadOfTodo extends Component {
  constructor() {
    super();
    this.state = {
      openByDone: {
        open: true,
        name: 'openByDone',
      },
      openByPriority: {
        open: true,
        name: 'openByPriority',
      },
    };
    this.changeVisibleFilters = this.changeVisibleFilters.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
  }

  changeVisibleFilters(item) {
    this.setState(prevState => ({
      [item.name]: {
        ...prevState[item.name],
        open: !prevState[item.name].open,
      },
    }));
  }

  handleClick(e, name) {
    const { setFilters, filter } = this.props;
    const value = e.target.innerText;
    this.setState({ filter });

    setFilters({
      ...filter,
      [name]: value,
    });
  }

  searchByTitle(e) {
    const { setFilters, filter } = this.props;
    const { value } = e.target;
    this.setState({ filter });

    setFilters({
      ...filter,
      searchText: value,
    });
  }

  render() {
    const { openByDone, openByPriority } = this.state;
    const {
      handleShowModal,
      filter: { priority, completed },
    } = this.props;

    const priorityItems = ['all', 'high', 'normal', 'low'];
    const doneItems = ['all', 'open', 'done'];
    return (
      <div className="d-flex justify-content-around mt-3">
        <div>
          <input
            type="search"
            placeholder="search by title"
            className="form-control"
            onChange={this.searchByTitle}
          />
        </div>
        <DropDown
          items={doneItems}
          dropdownInf={openByDone}
          visibleToggle={this.changeVisibleFilters}
          handleClick={e => this.handleClick(e, 'completed')}
          textValue={completed}
        />
        <DropDown
          items={priorityItems}
          dropdownInf={openByPriority}
          visibleToggle={this.changeVisibleFilters}
          handleClick={e => this.handleClick(e, 'priority')}
          textValue={priority}
        />
        <button
          className="btn btn-dark col-2 p-0"
          style={{ height: '40px' }}
          type="button"
          onClick={() => handleShowModal(true)}
        >
          Сreate
        </button>
      </div>
    );
  }
}

HeadOfTodo.propTypes = {
  handleShowModal: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleShowModal: value => dispatch(showModal(value)),
  setFilters: filter => dispatch(setVisibilityFilter(filter)),
});

export default connect(
  state => ({ filter: state.filterTodos }),
  mapDispatchToProps,
)(HeadOfTodo);
