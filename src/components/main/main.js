import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadOfTodo from './headoftodo';
import ModalWindow from './modalwindow';
import TodoList from './todolist/todolist';
import sorted from '../helpers/sorted';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      // sortBy: {
      //   searchText: '',
      //   priority: 'all',
      //   completed: 'all',
      // },
    };

    this.sortedItems = this.sortedItems.bind(this);
  }

  sortedItems(filter) {
    this.setState(prevState => {
      const filterItems = sorted(filter, prevState.items);

      // for corectly render items with sorting where done Todos in the end
      // shoul add next condition
      if (prevState.items.length === filterItems.length) {
        return {
          sortBy: { ...filter },
          filterItems,
          items: filterItems,
        };
      }
      return {
        sortBy: { ...filter },
        filterItems,
      };
    });
  }

  render() {
    return (
      <>
        <HeadOfTodo handleSorted={this.sortedItems} />
        <ModalWindow />
        <TodoList />
      </>
    );
  }
}

export default connect()(Main);
