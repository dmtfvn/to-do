import {
  createEmptyListMsg,
  getEmptyListDisplayState,
} from './utils/emptyListMsg.js';

import { updateTodoList } from './todos/updateTodos.js';
import { addTodo } from './todos/addTodos.js';

const displayResult = getEmptyListDisplayState();
createEmptyListMsg(displayResult);

function getTodos() {
  const data = localStorage.getItem('todos') || '[]';

  return JSON.parse(data);
}

const allTodos = getTodos();
updateTodoList(allTodos);

const todoForm = document.querySelector('form');
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  addTodo(allTodos);
});