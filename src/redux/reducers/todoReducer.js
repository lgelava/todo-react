import { actionTypes } from "../actions/todoActions";

const initialState = {
  todos: [],
  pagination: {
    currentPage: 1,
    todosPerPage: localStorage.getItem("todosPerPage"),
  },
};

const todoReducer = (state = initialState, action) => {
  const { todos } = state;
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...todos, action.newTodo],
      };

    case actionTypes.SUBMIT_EDIT_TODO:
      return {
        ...state,
        todos: todos.map((el) =>
          el._id === action.id ? { ...el, title: action.newText } : el
        ),
      };
    case actionTypes.CHECK_TODO:
      return {
        ...state,
        todos: todos.map((item) =>
          item._id === action.id ? { ...item, checked: !item.checked } : item
        ),
      };
    case actionTypes.CHECK_ALL_TODOS:
      return {
        ...state,
        todos: todos.map((todo) => {
          return todos.every(action.everyChecked)
            ? { ...todo, checked: false }
            : { ...todo, checked: true };
        }),
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: todos.filter((item) => item._id !== action.id),
      };

    case actionTypes.PAGE_CLICK:
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.pageNumber },
      };

    case actionTypes.DELETE_ALL_CHECKED:
      return {
        ...state,
        todos: todos.filter((task) => !task.checked),
      };

    case actionTypes.GET_TODOS_HANDLER:
      return {
        ...state,
        todos: action.todoList,
      };

    case actionTypes.PAGE_CHANGER:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: Math.ceil(todos.length / state.pagination.todosPerPage),
        },
      };

    case actionTypes.ON_SELECT_CHANGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          todosPerPage: action.event,
        },
      };

    default:
      return state;
  }
};

export default todoReducer;
