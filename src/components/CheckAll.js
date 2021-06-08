import React, { Component } from "react";

export default class CheckAll extends Component {
  everyChecked = (currentValue) => currentValue.checked;

  render() {
    const { todos } = this.props;
    return (
      <>
        <button className="btn" onClick={() => this.props.checkAll()}>
          {todos.every(this.everyChecked) ? "Uncheck All" : "Check All"}
        </button>
      </>
    );
  }
}
