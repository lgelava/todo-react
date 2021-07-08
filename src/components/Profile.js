import axios from "axios";
import React, { Component, createRef } from "react";
import Avatar from "../avatar.jpg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  profilePageRendered,
  saveUserChanges,
} from "../redux/actions/userActions";

class Profile extends Component {
  userNameRef = createRef();
  emailRef = createRef();
  componentDidMount() {
    axios
      .get(`http://localhost:9000/users/${localStorage.getItem("author")}`)
      .then((res) => this.props.actions.profilePageRendered(res.data))

      .catch((err) => {
        this.props.history.push("/");
      });
  }

  saveChanges = (author, userName, email) => {
    axios
      .put(
        `http://localhost:9000/todos/checktodos/${localStorage.getItem(
          "author"
        )}`,
        {
          userName: userName,
          email: email,
        }
      )
      .then((res) => {
        this.props.actions.saveUserChanges(author, userName, email);
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
      });
  };
  render() {
    const { email, userName } = this.props.users;

    return (
      <div className="profile">
        <h2>My Profile</h2>
        <div className="avatar_card">
          <img src={Avatar} style={{ width: "150px" }} alt="avatar" />
          <input type="text" defaultValue={userName} ref={this.userNameRef} />
          <input type="text" defaultValue={email} ref={this.emailRef} />
          <button
            onClick={() =>
              this.saveChanges(
                localStorage.getItem("author"),
                this.userNameRef.current.value,
                this.emailRef.current.value
              )
            }
            className="btn update_profile"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        profilePageRendered,
        saveUserChanges,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
