import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Header from ".//Header";
import BottomBtns from ".//BottomBtns";
import Pagination from ".//Pagination";
import { connect } from "react-redux";
import axios from "axios";

class Todos extends Component {
  render() {
    const { todos, pagination } = this.props.todos;
    //Get Current Todos

    const indexOfLastTodo = pagination.currentPage * pagination.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - pagination.todosPerPage;
    const curretTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <>
        <Header todos={todos} />
        <BottomBtns todos={todos} />
        {curretTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} todos={curretTodos} />
        ))}

        <Pagination todosPerPage={pagination.todosPerPage} todos={todos} />
        <button onClick={getTodos}>sdfs</button>
      </>
    );
  }
}

const getTodos = () => {
  axios
    .get("http://localhost:9000/todos/getAllToDos")
    .then((res) => this.props.getTodosHandler(res.data));
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    pagination: state.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageChanger: () => {
      dispatch({ type: "PAGE_CHANGER" });
    },
    getTodosHandler: () => {
      dispatch({ type: "GET_TODOS_HANDLER" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
