import React, { Component, createRef } from "react";
import { connect } from "react-redux";

class AddTodo extends Component {
  inputRef = createRef();

  onAdd = () => {
    const newTodo = {
      id: Date.now(),
      title: this.inputRef.current.value,
      checked: false,
    };
    if (this.inputRef.current.value) {
      this.props.addTodo(newTodo);
      this.inputRef.current.value = "";
      this.props.pageChanger();
    }
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            ref={this.inputRef}
            name="title"
            value={this.inputRef.value}
            style={{ flex: "10", padding: "5px" }}
            placeholder="Add Todo ..."
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
            onClick={() => this.onAdd()}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => {
      dispatch({ type: "ADD_TODO", newTodo });
    },
    pageChanger: () => {
      dispatch({ type: "PAGE_CHANGER" });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
