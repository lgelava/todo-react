import axios from "axios";
import React, { Component, createRef } from "react";
import Nav from "../components/Nav";


export default class Login extends Component {
  loginUser = (userName, password) => {
    
    
    axios.post("http://localhost:9000/users/login", {
      userName,
      password,
    })
    .then((res) => {
    
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('author',res.data.author)
      localStorage.setItem('todosPerPage',5)
      this.props.history.push('/todos') 

      
    })
    .catch((error) => {
        alert(error.response.data)
    })
  }
  userNameRef = createRef();
  passwordRef = createRef();
  render() {
    if(localStorage.getItem("token") !== null){
      this.props.history.push('/todos')
      
    }
    return (
      <div>
        <Nav />
        <div className="login_outer">
            <div className="form">
                <input type="text" placeholder="Username" ref={this.userNameRef}/>
                <input type="password" placeholder="Password" ref={this.passwordRef} />
                <button onClick={() => this.loginUser(this.userNameRef.current.value, this.passwordRef.current.value)} className="login-btn">Login</button>
            </div>
        </div>
      </div>
    );
  }
}




;
