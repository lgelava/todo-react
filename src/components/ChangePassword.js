import axios from "axios";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { passwordChanger } from "../redux/actions/userActions";
class ChangePassword extends Component {
  newPasswordRef = createRef();
  oldPasswordRef = createRef();
  changePassword = (newPassword, currentPassword) => {
    const { users } = this.props.users;

    axios
      .put(
        `http://localhost:9000/users/changepassword/${localStorage.getItem(
          "author"
        )}`,
        {
          password: newPassword,
          currentPassword: currentPassword,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="profile">
        <div className="avatar_card">
          <input
            type="password"
            ref={this.oldPasswordRef}
            placeholder="Old Password"
          />
          <input
            type="password"
            ref={this.newPasswordRef}
            placeholder="New Password"
          />

          <button
            onClick={() =>
              this.changePassword(
                this.newPasswordRef.current.value,
                this.oldPasswordRef.current.value
              )
            }
            className="btn update_profile"
          >
            Save New Password
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: bindActionCreators(
//       {
//         passwordChanger,
//       },
//       dispatch
//     ),
//   };
// };

export default connect(mapStateToProps, null)(ChangePassword);
