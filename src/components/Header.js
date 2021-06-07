import React, { Component } from "react";
import AddTodo from "./AddTodo";

export default class Header extends Component {
  render() {
    return (
      <div>
        <h3>TodoApp</h3>
        <AddTodo onAdd={this.props.onAdd} todos={this.props.todos} />
      </div>
    );
  }
}
