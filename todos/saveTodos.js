export function saveTodoList(allTodos) {
  const data = JSON.stringify(allTodos);

  localStorage.setItem('todos', data);
}