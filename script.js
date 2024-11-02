const todoEmptyList = document.getElementById('todo-empty-list');
const todoList = document.getElementById('todo-list');

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');

function createEmptyListMsg(value) {
  todoEmptyList.style.display = `${value}`;

  const imgEl = document.createElement('img');
  imgEl.className = 'empty-list-img';
  imgEl.src = 'empty-list.png';

  const pEl = document.createElement('p');
  pEl.className = 'empty-list-text';
  pEl.textContent = 'Your to-do list is empty';

  todoEmptyList.appendChild(imgEl);
  todoEmptyList.appendChild(pEl);
}

function hideEmptyListMsg() {
  return todoEmptyList.style.display = 'none';
}
const hiddenResult = hideEmptyListMsg();

function showEmptyListMsg() {
  return todoEmptyList.style.display = 'inline';
}
const shownResult = showEmptyListMsg();

function saveEmptyListMsg() {
  if (todoEmptyList.style.display === hiddenResult) {
    localStorage.setItem('display', hiddenResult);
  } else if (todoEmptyList.style.display === shownResult) {
    localStorage.setItem('display', shownResult);
  }
}

function getEmptyListDisplayState() {
  const curDisplayState = localStorage.getItem('display');

  return curDisplayState;
}
const displayResult = getEmptyListDisplayState();

createEmptyListMsg(displayResult);

let allTodos = getTodos();
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
  labelEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
  `;

  const pEl = document.createElement('p');
  pEl.className = 'todo-text';
  pEl.textContent = `${string}`;

  const btnEl = document.createElement('button');
  btnEl.className = 'todo-delete-button';
  btnEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  `;

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
  todoList.innerHTML = '';

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