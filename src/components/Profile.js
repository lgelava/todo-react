import axios from "axios";
import React, { Component, createRef } from "react";
import Avatar from "../avatar.jpg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

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
      .catch((err) => console.log(err));
  }

  saveChanges = (userName, email) => {
    axios
      .put(`http://localhost:9000/users/${localStorage.getItem("author")}`, {
        userName,
        email,
      })
      .then((res) => this.props.actions.saveUserChanges(res.data))

      .catch((err) => console.log(err));
  };

  render() {
    const { users } = this.props.users;
    console.log(users);
    return (
      <div className="profile">
        <h2>My Profile</h2>
        <div className="avatar_card">
          <img src={Avatar} style={{ width: "150px" }} alt="avatar" />
          <input
            type="text"
            defaultValue={users.userName}
            ref={this.userNameRef}
          />
          <input type="text" defaultValue={users.email} ref={this.emailRef} />
          <button
            onClick={() =>
              this.saveChanges(
                this.userNameRef.current.value,
                this.emailRef.current.value
              )
            }
            className="btn update_profile"
          >
            Save Changes
          </button>
          <Link to="/changepassword">
            <button className="btn change_password">Change Password</button>
          </Link>
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
