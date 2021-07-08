import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTodo, pageChanger } from "../redux/actions/todoActions";
import axios from "axios";

class AddTodo extends Component {
  inputRef = createRef();

  onAdd = (title) => {
    // const newTodo = {
    //   title,
    //   checked: false,
    //   author: "",
    // };
    if (this.inputRef.current.value) {
      const { addTodo, pageChanger } = this.props.actions;

      axios
        .post("http://localhost:9000/todos/addtodohandler", {
          title,
          checked: false,
          author: localStorage.getItem("author"),
        })
        .then((res) => {
          addTodo(res.data);
          this.inputRef.current.value = "";
          pageChanger();
        });
    }
  };

  onEnter = (e) => {
    if (e.keyCode === 13) {
      this.onAdd(this.inputRef.current.value);
    }
  };

  render() {
    return (
      <div>
        <div
          className="addTodoDiv"
          style={{ display: "flex", marginTop: "50px" }}
        >
          <input
            className="addTodoInput"
            type="text"
            ref={this.inputRef}
            name="title"
            value={this.inputRef.value}
            placeholder="Add Todo ..."
            onKeyUp={this.onEnter}
          />
          <button
            className="createTodoSubmitButton btn btn-success"
            onClick={() => this.onAdd(this.inputRef.current.value)}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        addTodo,
        pageChanger,
      },
      dispatch
    ),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
