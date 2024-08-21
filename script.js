const todoForm = document.querySelector('form');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

const todoEmptyMsg = document.getElementById('todo-empty-msg');

function createEmptyListMsg(value) {
  todoEmptyMsg.style.display = `${value}`;
  todoEmptyMsg.innerHTML = `
    <img class="empty-list-img" src="empty-list.png">
    <p class="empty-list-text">Your to-do list is empty</p>
  `;
}

function hideEmptyListMsg() {
  return todoEmptyMsg.style.display = 'none';
}
const hiddenResult = hideEmptyListMsg();

function showEmptyListMsg() {
  return todoEmptyMsg.style.display = 'block';
}
const shownResult = showEmptyListMsg();

function saveEmptyListMsg() {
  if (todoEmptyMsg.style.display === hiddenResult) {
    localStorage.setItem('display', hiddenResult);
  } else if (todoEmptyMsg.style.display === shownResult) {
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
  allTodos = allTodos.filter((_, i) => i !== idx);

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

  newElem.className = 'todo';
  newElem.innerHTML = `
    <input id="${elemId}" type="checkbox">
    <label class="custom-checkbox" for="${elemId}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <p class="todo-text">${string}</p>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </button>
  `;

  const deleteBtn = newElem.querySelector('.delete-button');
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

function updateTodoList() {
  todoList.innerHTML = '';

  allTodos.forEach((obj, i) => {
    const todoItem = createTodo(obj, i);

    todoList.appendChild(todoItem);
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