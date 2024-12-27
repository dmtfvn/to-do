const todoEmptyList = document.getElementById('todo-empty-list');

export function createEmptyListMsg(value) {
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

export function hideEmptyListMsg() {
  return todoEmptyList.style.display = 'none';
}
const hiddenResult = hideEmptyListMsg();

export function showEmptyListMsg() {
  return todoEmptyList.style.display = 'block';
}
const shownResult = showEmptyListMsg();

export function saveEmptyListMsg() {
  if (todoEmptyList.style.display === 'none') {
    localStorage.setItem('display', hiddenResult);
  } else if (todoEmptyList.style.display === 'block') {
    localStorage.setItem('display', shownResult);
  }
}

export function getEmptyListDisplayState() {
  return localStorage.getItem('display');
}