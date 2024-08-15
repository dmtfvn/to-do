const todoForm = document.querySelector('form');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

let allTodos = getTodos();
updateTodoList();

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    const todoObj = {
      text: todoText,
      complete: false
    };

    allTodos.push(todoObj);

    updateTodoList();
    saveTodos();

    todoInput.value = '';
  }
}

function deleteTodo(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveTodos();
  updateTodoList();
}

function createTodo(todoObj, index) {
  const newItem = document.createElement('li');
  const itemId = `todo-${index}`;

  const textEl = todoObj.text;

  newItem.className = 'todo';
  newItem.innerHTML = `
    <input id="${itemId}" type="checkbox">
    <label class="custom-checkbox" for="${itemId}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <label class="todo-text" for="${itemId}">${textEl}</label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </button>
  `;

  const deleteBtn = newItem.querySelector('.delete-button');
  deleteBtn.addEventListener('click', function () {
    deleteTodo(index);
  });

  const checkBox = newItem.querySelector('input');
  checkBox.addEventListener('change', function () {
    allTodos[index].complete = checkBox.checked;
    saveTodos();
  });

  checkBox.checked = todoObj.complete;

  return newItem;
}

function updateTodoList() {
  todoList.innerHTML = '';

  allTodos.forEach((todoObj, index) => {
    const todoItem = createTodo(todoObj, index);

    todoList.append(todoItem);
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