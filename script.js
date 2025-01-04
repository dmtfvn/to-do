import { saveTodoList } from './todos/saveTodos.js';
import { updateTodoList } from './todos/updateTodos.js';
import { addTodo } from './todos/addTodos.js';

const data = localStorage.getItem('todos') || '[]';

const allTodos = JSON.parse(data);

updateTodoList(allTodos);

const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('form');

todoList.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    const parentEl = e.target.closest('li');
    const elemId = parentEl.querySelector('input').id;

    const idx = elemId.split('-')[1];

    allTodos.splice(idx, 1);

    saveTodoList(allTodos);
    updateTodoList(allTodos);
  }
});

todoList.addEventListener('change', (e) => {
  const checkboxEl = e.target;

  if (e.target.nodeName === 'INPUT') {
    const idx = checkboxEl.id.split('-')[1];

    allTodos[idx].complete = checkboxEl.checked;

    saveTodoList(allTodos);
  }
});

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo(allTodos);
});