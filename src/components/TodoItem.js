import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

import {
  checkTodo,
  deleteTodo,
  pageChanger,
  editTodo,
} from "../redux/actions/todoActions";
class TodoItem extends Component {
  state = {
    editFormDisplayed: false,
  };

  inputRef = createRef();

  onCancel = () => {
    this.setState({ editFormDisplayed: false });
  };

  onEditSubmit = (id, title) => {
    this.setState({ editFormDisplayed: false });
    const { editTodo } = this.props.actions;

    axios
      .put(`http://localhost:9000/todos/edittodo/${id}`, {
        title: title,
      })
      .then(() => editTodo(id, title));
  };

  onEditBtnClick = () => {
    this.setState({ editFormDisplayed: true });
  };

  onDelete = (id) => {
    const { deleteTodo, pageChanger } = this.props.actions;
    axios.delete(`http://localhost:9000/todos/deleteTodo/${id}`).then(() => {
      deleteTodo(id);
      pageChanger();
    });
  };

  onCheck = (id, checked) => {
    const { checkTodo } = this.props.actions;

    axios
      .put(`http://localhost:9000/todos/checktodos/${id}`, {
        checked: !checked,
      })
      .then(() => {
        checkTodo(id, checked);
      });
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
                onClick={() =>
                  this.onEditSubmit(todo._id, this.inputRef.current.value)
                }
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
            <div className="item_with_checkbox">
              <input
                type="checkbox"
                checked={todo.checked}
                className="checkbox"
                onChange={() => this.onCheck(todo._id, todo.checked)}
              />{" "}
              <p className="todo_title">{todo.title}</p>
            </div>
            <button
              className="btnDelete"
              onClick={() => this.onDelete(todo._id)}
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
    actions: bindActionCreators(
      {
        checkTodo,
        deleteTodo,
        pageChanger,
        editTodo,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
