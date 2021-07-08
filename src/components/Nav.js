import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="nav_ul">
          <Link to="/">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li className="register_li">Register</li>
          </Link>
        </ul>
      </nav>
    );
  }
}
