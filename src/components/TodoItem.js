import React, { Component } from "react";

export default class todoItem extends Component {
  // This is usseless here

  // Use destructurization

  state = {
    editInputTitle: this.props.todo.title,
  };

  onCancel = (e) => {
    const { todo } = this.props;
    e.preventDefault();
    this.props.onEditBtnCancel(todo.id);
  };

  onEditSubmit = (e) => {
    const { todo } = this.props;
    const { editInputTitle } = this.state;
    e.preventDefault();
    this.props.onEditBtnSubmit(todo.id, editInputTitle);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { todo, onCheck, onEditBtnClick, onDelete } = this.props;
    return (
      <div>
        {todo.editFormDisplayed ? (
          <li className="todoItem">
            <form className="editForm">
              <input
                onChange={this.onChange}
                type="text"
                name="editInputTitle"
                className="editInput"
                defaultValue={todo.title}
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
        ) : (
          <li className="todoItem">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => onCheck(todo.id)}
            />{" "}
            {todo.title}
            <button className="btnDelete" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
            <button onClick={() => onEditBtnClick(todo.id)} className="btnEdit">
              Edit
            </button>
          </li>
        )}
      </div>
    );
  }
}
