import { createTodo } from './manageTodos.js';

export function updateTodoList(allTodos) {
  const todoList = document.querySelector('#todo-list');

  todoList.replaceChildren();

  allTodos.forEach((obj, i) => {
    const todo = createTodo(obj, i, allTodos);

    todoList.appendChild(todo);

    document.documentElement.scrollTop = 0;
  });
}