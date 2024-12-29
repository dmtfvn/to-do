import { updateTodoList } from './todos/updateTodos.js';
import { addTodo } from './todos/addTodos.js';

function getTodoList() {
  const data = localStorage.getItem('todos') || '[]';

  return JSON.parse(data);
}

const allTodos = getTodoList();
updateTodoList(allTodos);

const todoForm = document.querySelector('form');
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  addTodo(allTodos);
});