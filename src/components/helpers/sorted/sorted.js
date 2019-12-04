function sorted(filter, array) {
  let copyTodos = [...array];

  switch (filter.completed) {
    case 'done': {
      copyTodos = copyTodos.filter(todoItem => todoItem.done);
      break;
    }
    case 'open': {
      copyTodos = copyTodos.filter(todoItem => !todoItem.done);
      break;
    }
    default:
      break;
  }

  switch (filter.priority) {
    case 'high': {
      copyTodos = copyTodos.filter(todoItem => todoItem.priority === 'high');
      break;
    }
    case 'normal': {
      copyTodos = copyTodos.filter(todoItem => todoItem.priority === 'normal');
      break;
    }
    case 'low': {
      copyTodos = copyTodos.filter(todoItem => todoItem.priority === 'low');
      break;
    }
    default:
      break;
  }
  if (filter.searchText) {
    copyTodos = copyTodos.filter(todoItem =>
      todoItem.title.includes(filter.searchText),
    );
  }

  return copyTodos.sort((x, y) => x.done - y.done);
}

export default sorted;
