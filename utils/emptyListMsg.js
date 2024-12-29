export function createEmptyListMsg() {
  const todoEmptyList = document.querySelector('figure');

  const imgEl = document.createElement('img');
  imgEl.className = 'empty-list-img';
  imgEl.src = 'empty-list.png';

  const pEl = document.createElement('p');
  pEl.className = 'empty-list-text';
  pEl.textContent = 'Your to-do list is empty';

  todoEmptyList.appendChild(imgEl);
  todoEmptyList.appendChild(pEl);
}