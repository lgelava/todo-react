import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { todos, todosPerPage, paginate } = this.props;

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="paginationPages">
        {pageNumbers.map((number) => (
          <button onClick={() => paginate(number)} key={number} className="btn">
            {number}
          </button>
        ))}
      </div>
    );
  }
}
