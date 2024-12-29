import { updateTodoList } from './todos/updateTodos.js';
import { addTodo } from './todos/addTodos.js';

const data = localStorage.getItem('todos') || '[]';

const allTodos = JSON.parse(data);

updateTodoList(allTodos);

const todoForm = document.querySelector('form');
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  addTodo(allTodos);
});