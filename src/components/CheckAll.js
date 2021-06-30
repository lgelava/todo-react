import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkAllTodos } from "../redux/actions/todoActions";
import axios from "axios";

class CheckAll extends Component {
  everyChecked = (currentValue) => currentValue.checked;
  onCheckAll = () => {
    const { checkAllTodos, todos } = this.props;

    axios
      .put(`http://localhost:9000/todos/checkalltodos`, {
        checked: !todos.every(this.everyChecked),
      })
      .then(() => {
        checkAllTodos(this.everyChecked);
      });
  };
  render() {
    const { todos } = this.props;

    return (
      <>
        <button
          className="btn"
          onClick={() => this.onCheckAll(this.everyChecked)}
        >
          {todos.every(this.everyChecked) ? "Uncheck All" : "Check All"}
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAllTodos: (everyChecked) => {
      dispatch({ type: "CHECK_ALL_TODOS", everyChecked });
    },
  };
};

export default connect(null, mapDispatchToProps)(CheckAll);
