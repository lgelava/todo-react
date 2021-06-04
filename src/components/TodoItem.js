import React, { Component } from "react";

export default class todoItem extends Component {
  state = {
    editInputTitle: this.props.todo.title,
  };
  onCancel = (e) => {
    e.preventDefault();
    this.props.onEditBtnCancel(this.props.todo.id);
  };

  onEditSubmit = (e) => {
    e.preventDefault();
    this.props.onEditBtnSubmit(this.props.todo.id, this.state.editInputTitle);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    let output;
    if (this.props.todo.editFormDisplayed) {
      output = (
        <li className="todoItem">
          <form className="editForm">
            <input
              onChange={this.onChange}
              type="text"
              name="editInputTitle"
              className="editInput"
              defaultValue={this.props.todo.title}
            />
            <button
              onClick={this.onEditSubmit}
              type="submit"
              className="editSubmit"
            >
              Submit
            </button>
            <button className="editCancel" onClick={this.onCancel}>
              Cancel
            </button>
          </form>
        </li>
      );
    } else {
      output = (
        <li className="todoItem">
          <input
            type="checkbox"
            defaultChecked={this.props.todo.checked}
            onChange={() => this.props.onCheck(this.props.todo.id)}
          />{" "}
          {this.props.todo.title}
          <button
            className="btnDelete"
            onClick={() => this.props.onDelete(this.props.todo.id)}
          >
            Delete
          </button>
          <button
            onClick={() => this.props.onEditBtnClick(this.props.todo.id)}
            className="btnEdit"
          >
            Edit
          </button>
        </li>
      );
    }
    return <>{output}</>;
  }
}
