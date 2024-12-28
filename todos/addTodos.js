import {
  hideEmptyListMsg,
  saveEmptyListDisplayState
} from '../utils/emptyListMsg.js';

import { saveTodoList } from './saveTodos.js';
import { updateTodoList } from './updateTodos.js';

export function addTodo(allTodos) {
  const todoInput = document.querySelector('#todo-input');

  const todoText = todoInput.value.trim();

  if (todoText === '') {
    return;
  }

  const todoObj = {
    text: todoText,
    complete: false
  };

  allTodos.unshift(todoObj);

  if (allTodos.length > 0) {
    hideEmptyListMsg();
    saveEmptyListDisplayState();
  }

  saveTodoList(allTodos);
  updateTodoList(allTodos);

  todoInput.value = '';

  todoInput.blur();
}