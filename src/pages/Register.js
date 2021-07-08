import axios from "axios";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNewUser } from "../redux/actions/userActions";
import Nav from "../components/Nav";

class Register extends Component {
  userNameRef = createRef();
  emailRef = createRef();
  passwordRef = createRef();
  confirmPasswordRef = createRef();
  addUser = (userName, email, password, confirmPassword) => {
    const { addNewUser } = this.props.actions;
    if (password !== confirmPassword) {
      alert("passwords dont match");
    } else {
      axios
        .post("http://localhost:9000/users/adduser", {
          userName,
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          addNewUser(res.data);
          alert("User Registered");
          this.userNameRef.current.value = "";
          this.emailRef.current.value = "";
          this.passwordRef.current.value = "";
          this.confirmPasswordRef.current.value = "";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };
  render() {
    return (
      <div>
        <Nav />

        <div className="register_outer">
          <div className="form">
            <input type="text" placeholder="Username" ref={this.userNameRef} />
            <input type="email" placeholder="Email" ref={this.emailRef} />
            <input
              type="password"
              placeholder="Password"
              ref={this.passwordRef}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={this.confirmPasswordRef}
            />
            <button
              onClick={() =>
                this.addUser(
                  this.userNameRef.current.value,
                  this.emailRef.current.value,
                  this.passwordRef.current.value,
                  this.confirmPasswordRef.current.value
                )
              }
              className="register-btn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        addNewUser,
      },
      dispatch
    ),
  };
};

export default connect(null, mapDispatchToProps)(Register);
