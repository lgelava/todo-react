import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    const {
      todos,
      onCheck,
      onDelete,
      onEditBtnClick,
      onEditBtnCancel,
      onEditBtnSubmit,
    } = this.props;
    return todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        todos={todos}
        onCheck={onCheck}
        onDelete={onDelete}
        onEditBtnClick={onEditBtnClick}
        onEditBtnCancel={onEditBtnCancel}
        onEditBtnSubmit={onEditBtnSubmit}
      />
    ));
  }
}
export default Todos;
