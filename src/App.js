import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";
import BottomBtns from "./components/BottomBtns";
import Pagination from "./components/Pagination";

import "./App.css";

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Meeting with boss",
        checked: false,
        editFormDisplayed: false,
      },
      {
        id: 2,
        title: "Meeting with boss2",
        checked: false,
        editFormDisplayed: false,
      },
      {
        id: 3,
        title: "Meeting with boss3",
        checked: false,
        editFormDisplayed: false,
      },
    ],
    pagination: { currentPage: 1, todosPerPage: 5 },
  };

  everyChecked = (currentValue) => currentValue.checked;

  checkAll = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todos.every(this.everyChecked)
          ? { ...todo, checked: false }
          : { ...todo, checked: true };
      }),
    });
  };

  onDeleteAllChecked = () => {
    const { todos, pagination } = this.state;
    this.setState({
      todos: [...todos.filter((todo) => todo.checked !== true)],
    });
    let checkedLength = todos.filter((todo) => todo.checked);
    if ((todos.length - checkedLength.length) % 5 === 0) {
      this.setState((prevState) => ({
        pagination: {
          ...prevState.pagination,
          currentPage: Math.ceil((todos.length - 1) / 5),
        },
      }));
    }

    console.log(pagination.currentPage);
  };

  onDelete = (id) => {
    const { todos, pagination } = this.state;
    this.setState({
      todos: [...todos.filter((todo) => todo.id !== id)],
    });
    if (Math.ceil(todos.length / 5) - pagination.currentPage === 0) {
      this.setState((prevState) => ({
        pagination: {
          ...prevState.pagination,
          currentPage: Math.ceil((todos.length - 1) / 5),
        },
      }));
    }
  };

  onAdd = (title) => {
    const { todos } = this.state;
    const newTodo = {
      id: Date.now(),
      title,
      checked: false,
    };
    if (title !== "") {
      this.setState({ todos: [...todos, newTodo] });
      this.setState((prevState) => ({
        pagination: {
          ...prevState.pagination,
          currentPage: Math.ceil((todos.length + 1) / 5),
        },
      }));
    } else {
      alert("Write Something");
    }
  };

  onCheck = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
      }),
    });
  };

  onEditBtnClick = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todo.id === id ? { ...todo, editFormDisplayed: true } : todo;
      }),
    });
  };

  onEditBtnSubmit = (id, title) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todo.id === id && title !== ""
          ? { ...todo, editFormDisplayed: false, title: title }
          : todo;
      }),
    });
  };

  onEditBtnCancel = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todo.id === id ? { ...todo, editFormDisplayed: false } : todo;
      }),
    });
  };

  //Change Page

  paginate = (pageNumber) => {
    this.setState((prevState) => ({
      pagination: {
        ...prevState.pagination,
        currentPage: pageNumber,
      },
    }));
  };
  render() {
    //Get Current Todos
    const { pagination, todos } = this.state;

    const indexOfLastTodo = pagination.currentPage * pagination.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - pagination.todosPerPage;
    const curretTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div className="App">
        <Header onAdd={this.onAdd} todos={todos} />
        <BottomBtns
          todos={todos}
          checkAll={this.checkAll}
          onDeleteAllChecked={this.onDeleteAllChecked}
        />
        <Todos
          todos={curretTodos}
          onDelete={this.onDelete}
          onCheck={this.onCheck}
          onEditBtnClick={this.onEditBtnClick}
          onEditBtnCancel={this.onEditBtnCancel}
          onEditBtnSubmit={this.onEditBtnSubmit}
        />

        <Pagination
          todosPerPage={pagination.todosPerPage}
          todos={todos}
          paginate={this.paginate}
        />
      </div>
    );
  }
}
export default App;
