import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onCheck={this.props.onCheck}
        onDelete={this.props.onDelete}
        onEditBtnClick={this.props.onEditBtnClick}
        onEditBtnCancel={this.props.onEditBtnCancel}
        onEditBtnSubmit={this.props.onEditBtnSubmit}
      />
    ));
  }
}
export default Todos;
