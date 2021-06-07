import React, { Component } from "react";
import CheckAll from "./CheckAll";

export default class BottomBtns extends Component {
  everyChecked = (currentValue) => currentValue.checked;

  render() {
    const { todos, checkAll, onDeleteAllChecked } = this.props;
    return (
      <div className="bottomBtnsDiv">
        {todos.length > 0 ? (
          <CheckAll todos={todos} checkAll={checkAll} />
        ) : null}
        {todos.some(this.everyChecked) ? (
          <button onClick={() => onDeleteAllChecked()}>
            Delete All Checked
          </button>
        ) : null}
      </div>
    );
  }
}
