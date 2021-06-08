import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Header from ".//Header";
import BottomBtns from ".//BottomBtns";
import Pagination from ".//Pagination";

class Todos extends Component {
  state = {
    todos: [],
    pagination: { currentPage: 1, todosPerPage: 5 },
  };

  checkAll = () => {
    const everyChecked = (currentValue) => currentValue.checked;
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return todos.every(everyChecked)
          ? { ...todo, checked: false }
          : { ...todo, checked: true };
      }),
    });
  };

  paginate = (pageNumber) => {
    this.setState((prevState) => ({
      pagination: {
        ...prevState.pagination,
        currentPage: pageNumber,
      },
    }));
  };

  onDeleteAllChecked = () => {
    const { todos, pagination } = this.state;
    this.setState({
      todos: [...todos.filter((todo) => todo.checked !== true)],
    });
    let checkedLength = todos.filter((todo) => todo.checked);
    let unCheckedLength = todos.filter((todo) => !todo.checked);
    if ((todos.length - checkedLength.length) % 5 === 0) {
      this.setState((prevState) => ({
        pagination: {
          ...prevState.pagination,
          currentPage: pagination.currentPage - 1,
        },
      }));
    } else if (
      (todos.length - checkedLength.length) % 5 !== 0 &&
      unCheckedLength.length > 0
    ) {
      this.setState((prevState) => ({
        pagination: {
          ...prevState.pagination,
          currentPage: pagination.currentPage,
        },
      }));

      if (unCheckedLength.length < 5) {
        this.setState((prevState) => ({
          pagination: {
            ...prevState.pagination,
            currentPage: pagination.currentPage - 1,
          },
        }));
        if (checkedLength.length >= 5) {
          this.setState((prevState) => ({
            pagination: {
              ...prevState.pagination,
              currentPage: pagination.currentPage - 1,
            },
          }));
        }
      }
    }
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
  render() {
    const { todos, pagination } = this.state;
    //Get Current Todos

    const indexOfLastTodo = pagination.currentPage * pagination.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - pagination.todosPerPage;
    const curretTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <>
        <Header onAdd={this.onAdd} todos={todos} />
        <BottomBtns
          todos={todos}
          checkAll={this.checkAll}
          onDeleteAllChecked={this.onDeleteAllChecked}
        />
        {curretTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={curretTodos}
            onCheck={this.onCheck}
            onDelete={this.onDelete}
            onEditBtnClick={this.onEditBtnClick}
            onEditBtnCancel={this.onEditBtnCancel}
            onEditBtnSubmit={this.onEditBtnSubmit}
          />
        ))}

        <Pagination
          todosPerPage={pagination.todosPerPage}
          todos={todos}
          paginate={this.paginate}
        />
      </>
    );
  }
}
export default Todos;
