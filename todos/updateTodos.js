import { createFigure } from '../utils/createFigure.js';
import { createTodo } from './createTodos.js';

export function updateTodoList(allTodos) {
  const todoList = document.querySelector('#todo-list');
  const todoEmptyList = document.querySelector('figure');

  if (allTodos.length === 0) {
    createFigure();
  } else {
    todoEmptyList.replaceChildren();
  }

  todoList.replaceChildren();

  allTodos.forEach((obj, i) => {
    const todo = createTodo(obj, i);

    todoList.appendChild(todo);
  });
}