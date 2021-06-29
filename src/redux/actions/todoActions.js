export const actionTypes = {
  ADD_TODO: "ADD_TODO",
  EDIT_TODO: "EDIT_TODO",
  SUBMIT_EDIT_TODO: "SUBMIT_EDIT_TODO",
  CHECK_TODO: "CHECK_TODO",
  CHECK_ALL_TODOS: "CHECK_ALL_TODOS",
  DELETE_TODO: "DELETE_TODO",
  PAGE_CLICK: "PAGE_CLICK",
  GET_TODOS_HANDLER: "GET_TODOS_HANDLER",
  DELETE_ALL_CHECKED: "DELETE_ALL_CHECKED",
  PAGE_CHANGER: "PAGE_CHANGER",
};

export const addTodo = (newTodo) => ({
  type: actionTypes.ADD_TODO,
  newTodo,
});

export const submitEditTodo = (id, newText) => ({
  type: actionTypes.SUBMIT_EDIT_TODO,
  id,
  newText,
});

export const CHECK_TODO = (id) => ({
  type: CHECK_TODO,
  id,
});

export const checkAllTodos = (allChecked) => ({
  type: actionTypes.CHECK_ALL_TODOS,
  allChecked,
});

export const deleteTodo = (id) => ({
  type: actionTypes.DELETE_TODO,
  id,
});

export const pageClick = (pageNumber) => ({
  type: actionTypes.PAGE_CLICK,
  pageNumber,
});

export const deleteAllTodosChecked = (todos) => ({
  type: actionTypes.DELETE_ALL_CHECKED,
  todos,
});

export const getTodosHandler = (todoList) => ({
  type: actionTypes.GET_TODOS_HANDLER,
  todoList,
});

export const pageChanger = () => ({
  type: actionTypes.PAGE_CHANGER,
});
