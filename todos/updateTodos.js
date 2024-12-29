import { createEmptyListMsg } from '../utils/emptyListMsg.js';
import { createTodo } from './manageTodos.js';

export function updateTodoList(allTodos) {
  const todoList = document.querySelector('#todo-list');
  const todoEmptyList = document.querySelector('figure');

  if (allTodos.length === 0) {
    createEmptyListMsg();
  } else {
    todoEmptyList.replaceChildren();
  }

  todoList.replaceChildren();

  allTodos.forEach((obj, i) => {
    const todo = createTodo(obj, i, allTodos);

    todoList.appendChild(todo);

    document.documentElement.scrollTop = 0;
  });
}