export function saveTodoList(allTodos) {
  const todosJson = JSON.stringify(allTodos);

  localStorage.setItem('todos', todosJson);
}