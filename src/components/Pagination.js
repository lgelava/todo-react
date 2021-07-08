import React, { Component } from "react";
import { connect } from "react-redux";

class Pagination extends Component {
  render() {
    const { todos, todosPerPage } = this.props;

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="paginationPages">
        {pageNumbers.map((pageNumber) => (
          <button
            onClick={() => this.props.pageClick(pageNumber)}
            key={pageNumber}
            className="btn"
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pageClick: (pageNumber) => {
      dispatch({ type: "PAGE_CLICK", pageNumber });
    },
  };
};

export default connect(null, mapDispatchToProps)(Pagination);
