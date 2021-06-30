import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Header from ".//Header";
import BottomBtns from ".//BottomBtns";
import Pagination from ".//Pagination";
import { connect } from "react-redux";
import axios from "axios";
import { bindActionCreators } from "redux";
import { getTodosHandler } from "../redux/actions/todoActions";

class Todos extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:9000/todos/getAllToDos")
      .then((res) => this.props.actions.getTodosHandler(res.data));
  }

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
          <TodoItem key={todo._id} todo={todo} todos={curretTodos} />
        ))}

        <Pagination todosPerPage={pagination.todosPerPage} todos={todos} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    pagination: state.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getTodosHandler,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
