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
      .get(
        `http://localhost:9000/todos/getAllToDos/${localStorage.getItem(
          "author"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) =>
        this.props.actions.getTodosHandler(
          res.data,
          localStorage.getItem("author")
        )
      )
      .catch((err) => {
        this.props.history.push("/");
      });
  }

  logOut = () => {
    // localStorage.removeItem("token");

    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const { todos, pagination } = this.props.todos;

    //Get Current Todos

    const indexOfLastTodo = pagination.currentPage * pagination.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - pagination.todosPerPage;

    const curretTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <>
        <button
          onClick={() => this.logOut()}
          style={{
            float: "right",
            background: "#dc413c",
            fontSize: "20px",
            borderRadius: "5px",
            marginTop: "30px",
          }}
          className="btn"
        >
          {/* <BiLogIn style={{ color: "grey", fontSize: "32px" }} />
           */}
          Log Out
        </button>
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
