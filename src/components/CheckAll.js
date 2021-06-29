import React, { Component } from "react";
import { connect } from "react-redux";

class CheckAll extends Component {
  everyChecked = (currentValue) => currentValue.checked;

  render() {
    const { todos } = this.props;
    return (
      <>
        <button
          className="btn"
          onClick={() => this.props.checkAll(this.everyChecked)}
        >
          {todos.every(this.everyChecked) ? "Uncheck All" : "Check All"}
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAll: (everyChecked) => {
      dispatch({ type: "CHECK_ALL_TODOS", everyChecked });
    },
  };
};

export default connect(null, mapDispatchToProps)(CheckAll);
