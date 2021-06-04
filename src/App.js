import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";

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
  };

  onDelete = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  onAdd = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      checked: false,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  onCheck = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      }),
    });
  };

  onEditBtnClick = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.editFormDisplayed = true;
        }
        return todo;
      }),
    });
  };

  onEditBtnCancel = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.editFormDisplayed = false;
        }
        return todo;
      }),
    });
  };

  onEditBtnSubmit = (id, title) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.editFormDisplayed = false;
          todo.title = title;
        }
        return todo;
      }),
    });
  };

  render() {
    return (
      <div className="App">
        <Header onAdd={this.onAdd} />
        <Todos
          todos={this.state.todos}
          onDelete={this.onDelete}
          onCheck={this.onCheck}
          onEditBtnClick={this.onEditBtnClick}
          onEditBtnCancel={this.onEditBtnCancel}
          onEditBtnSubmit={this.onEditBtnSubmit}
        />
      </div>
    );
  }
}
export default App;
