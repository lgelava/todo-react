import React, { Component } from "react";
import CheckAll from "./CheckAll";
import { connect } from "react-redux";

class BottomBtns extends Component {
  oneChecked = (currentValue) => currentValue.checked;
  onDeleteAllCheckedTodos = (todos) => {
    this.props.deleteAllChecked(todos);
    this.props.pageChanger();
  };

  render() {
    const { todos, checkAll } = this.props;
    return (
      <div className="bottomBtnsDiv">
        {todos.length > 0 && <CheckAll todos={todos} checkAll={checkAll} />}
        {todos.some(this.oneChecked) && (
          <button
            className="btn"
            onClick={() => this.onDeleteAllCheckedTodos(todos)}
          >
            Delete All Checked
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllChecked: (todos) => {
      dispatch({ type: "DELETE_ALL_CHECKED", todos });
    },
    pageChanger: () => {
      dispatch({ type: "PAGE_CHANGER" });
    },
  };
};

export default connect(null, mapDispatchToProps)(BottomBtns);
