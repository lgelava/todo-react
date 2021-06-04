import React, { Component } from "react";

export default class AddTodo extends Component {
  state = {
    title: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.title);
    this.setState({ title: "" });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form style={{ display: "flex" }} onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            style={{ flex: "10", padding: "5px" }}
            placeholder="Add Todo ..."
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}
