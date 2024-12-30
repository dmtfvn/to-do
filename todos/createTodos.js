export function createTodo(object, index) {
  const elemId = `todo-${index}`;
  const string = object.text;

  const listEl = document.createElement('li');
  listEl.className = 'todo-element';

  const inputEl = document.createElement('input');
  inputEl.id = `${elemId}`;
  inputEl.type = 'checkbox';
  inputEl.checked = object.complete;

  const labelEl = document.createElement('label');
  labelEl.className = 'todo-custom-checkbox';
  labelEl.setAttribute('for', `${elemId}`);

  const pEl = document.createElement('p');
  pEl.className = 'todo-text';
  pEl.textContent = `${string}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-delete-button';

  listEl.appendChild(inputEl);
  listEl.appendChild(labelEl);
  listEl.appendChild(pEl);
  listEl.appendChild(deleteBtn);

  return listEl;
}