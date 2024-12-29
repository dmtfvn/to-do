import { saveTodoList } from './saveTodos.js';
import { updateTodoList } from './updateTodos.js';

export function addTodo(allTodos) {
  const todoInput = document.querySelector('#todo-input');

  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const todoObj = {
      text: todoText,
      complete: false
    };

    allTodos.unshift(todoObj);

    saveTodoList(allTodos);
    updateTodoList(allTodos);

    todoInput.value = '';
    todoInput.blur();

    document.documentElement.scrollTop = 0;
  }
}