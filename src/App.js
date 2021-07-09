import React, { Component } from "react";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import axios from "axios";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/" exact component={Login} />
              <Route path="/todos" component={Todos} />
              <Route path="/profile" component={Profile} />
              <Route path="/changepassword" component={ChangePassword} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
