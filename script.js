const todoEmptyList = document.getElementById('todo-empty-list');
const todoList = document.getElementById('todo-list');

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');

todoInput.addEventListener('focusin', function () {
  window.scrollTo(0, 0);
  scrollBodyTop();
});

function createEmptyListMsg(value) {
  todoEmptyList.style.display = `${value}`;
  todoEmptyList.innerHTML = `
    <img class="empty-list-img" src="empty-list.png">
    <p class="empty-list-text">Your to-do list is empty</p>
  `;
}

function hideEmptyListMsg() {
  return todoEmptyList.style.display = 'none';
}
const hiddenResult = hideEmptyListMsg();

function showEmptyListMsg() {
  return todoEmptyList.style.display = 'block';
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
  const newElem = document.createElement('li');
  const elemId = `todo-${index}`;

  const string = object.text;

  newElem.className = 'todo-element';
  newElem.innerHTML = `
    <input id="${elemId}" type="checkbox">
    <label class="todo-custom-checkbox" for="${elemId}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <p class="todo-text">${string}</p>
    <button class="todo-delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </button>
  `;

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