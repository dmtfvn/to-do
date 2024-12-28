import {
  showEmptyListMsg,
  saveEmptyListDisplayState
} from '../utils/emptyListMsg.js';

import { saveTodoList } from './saveTodos.js';
import { updateTodoList } from './updateTodos.js';

import { createSvg } from '../utils/createSvg.js';

export function createTodo(object, index, allTodos) {
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

    saveTodoList(allTodos);
  });
  checkBox.checked = object.complete;

  function deleteTodo(idx) {
    allTodos.splice(idx, 1);

    if (allTodos.length === 0) {
      showEmptyListMsg();
      saveEmptyListDisplayState();
    }

    saveTodoList(allTodos);
    updateTodoList(allTodos);
  }

  return newElem;
}