import React from 'react';
import HeadOfTodo from './headoftodo';
import ModalWindow from './modalwindow';
import TodoList from './todolist/todolist';

const Main = () => (
  <>
    <HeadOfTodo />
    <ModalWindow />
    <TodoList />
  </>
);

export default Main;
