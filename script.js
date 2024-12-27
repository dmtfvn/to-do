import {
  createEmptyListMsg,
  hideEmptyListMsg,
  showEmptyListMsg,
  saveEmptyListMsg,
  getEmptyListDisplayState
} from './utils/emptyListMsg.js';

import { createSvg } from './utils/createSvg.js';

const todoList = document.getElementById('todo-list');

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');

const displayResult = getEmptyListDisplayState();
createEmptyListMsg(displayResult);

const allTodos = getTodos();
updateTodoList();

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    const todoObj = {
      text: todoText,
      complete: false
    };

    allTodos.unshift(todoObj);

    if (allTodos.length > 0) {
      hideEmptyListMsg();
      saveEmptyListMsg();
    }

    saveTodos();
    updateTodoList();

    todoInput.value = '';
  }
}

function deleteTodo(idx) {
  allTodos.splice(idx, 1);

  if (allTodos.length === 0) {
    showEmptyListMsg();
    saveEmptyListMsg();
  }

  saveTodos();
  updateTodoList();
}

function createTodo(object, index) {
  const elemId = `todo-${index}`;
  const string = object.text;

  const newElem = document.createElement('li');
  newElem.className = 'todo-element';

  const inputEl = document.createElement('input');
  inputEl.id = `${elemId}`;
  inputEl.type = 'checkbox';

  const labelEl = document.createElement('label');
  labelEl.className = 'todo-custom-checkbox';
  labelEl.setAttribute('for', `${elemId}`);

  const svgO = createSvg(
    'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'
  );
  labelEl.appendChild(svgO);

  const pEl = document.createElement('p');
  pEl.className = 'todo-text';
  pEl.textContent = `${string}`;

  const btnEl = document.createElement('button');
  btnEl.className = 'todo-delete-button';

  const svgX = createSvg(
    'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
  );
  btnEl.appendChild(svgX);

  newElem.appendChild(inputEl);
  newElem.appendChild(labelEl);
  newElem.appendChild(pEl);
  newElem.appendChild(btnEl);

  const deleteBtn = newElem.querySelector('.todo-delete-button');
  deleteBtn.addEventListener('click', function () {
    deleteTodo(index);
  });

  const checkBox = newElem.querySelector('input');
  checkBox.addEventListener('change', function () {
    allTodos[index].complete = checkBox.checked;

    saveTodos();
  });
  checkBox.checked = object.complete;

  return newElem;
}

function scrollBodyTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function updateTodoList() {
  todoList.replaceChildren();

  allTodos.forEach((obj, i) => {
    const todoItem = createTodo(obj, i);
    todoList.appendChild(todoItem);

    scrollBodyTop();
  });
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);

  localStorage.setItem('todos', todosJson);
}

function getTodos() {
  const data = localStorage.getItem('todos') || '[]';

  return JSON.parse(data);
}

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  addTodo();

  todoInput.blur();
});