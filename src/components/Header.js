import React, { Component } from "react";
import AddTodo from "./AddTodo";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onSelectChange, pageChanger } from "../redux/actions/todoActions";
import { Link } from "react-router-dom";

class Header extends Component {
  handleChange = (event) => {
    console.log("event", event.target.value);
    const { onSelectChange, pageChanger } = this.props.actions;
    onSelectChange(event.target.value);
    pageChanger();
    localStorage.setItem("todosPerPage", event.target.value);
  };
  render() {
    return (
      <div>
        <Select
          style={{ marginTop: "30px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={localStorage.getItem("todosPerPage")}
          onClick={this.handleChange}
        >
          <MenuItem value={5}>Items per page: 5</MenuItem>
          <MenuItem value={10}>Items per page: 10</MenuItem>
          <MenuItem value={15}>Items per page: 15</MenuItem>
          <MenuItem value={20}>Items per page: 20</MenuItem>
        </Select>
        <Link style={{ float: "right", marginTop: "30px" }} to="/profile">
          <button className="my_profile btn">My Profile</button>
        </Link>

        <AddTodo onAdd={this.props.onAdd} todos={this.props.todos} />
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
        onSelectChange,
        pageChanger,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
