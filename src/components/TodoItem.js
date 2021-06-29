import React, { Component, createRef } from "react";
import { connect } from "react-redux";

class TodoItem extends Component {
  state = {
    editFormDisplayed: false,
  };

  inputRef = createRef();

  onCancel = () => {
    this.setState({ editFormDisplayed: false });
  };

  onEditSubmit = () => {
    const { todo } = this.props;
    this.setState({ editFormDisplayed: false });
    this.props.editTodo(todo.id, this.inputRef.current.value);
  };

  onEditBtnClick = () => {
    this.setState({ editFormDisplayed: true });
  };

  onDelete = (id) => {
    this.props.deleteTodo(id);
    this.props.pageChanger();
  };

  render() {
    const { todo } = this.props;

    return (
      <div>
        {this.state.editFormDisplayed ? (
          <li className="todoItem">
            <div className="editForm">
              <input
                type="text"
                name="editInputTitle"
                className="editInput"
                defaultValue={todo.title}
                ref={this.inputRef}
              />
              <button
                onClick={() => this.onEditSubmit()}
                type="submit"
                className="editSubmit"
              >
                Submit
              </button>
              <button className="editCancel" onClick={this.onCancel}>
                Cancel
              </button>
            </div>
          </li>
        ) : (
          <li className="todoItem">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => this.props.checkTodo(todo.id)}
            />{" "}
            {todo.title}
            <button
              className="btnDelete"
              onClick={() => this.onDelete(todo.id)}
            >
              Delete
            </button>
            <button onClick={() => this.onEditBtnClick()} className="btnEdit">
              Edit
            </button>
          </li>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    pagination: state.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkTodo: (id) => {
      dispatch({ type: "CHECK_TODO", id });
    },
    deleteTodo: (id) => {
      dispatch({ type: "DELETE_TODO", id });
    },
    editTodo: (id, newText) => {
      dispatch({ type: "SUBMIT_EDIT_TODO", id, newText });
    },
    pageChanger: () => {
      dispatch({ type: "PAGE_CHANGER" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
