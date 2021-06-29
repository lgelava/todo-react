import React, { Component } from "react";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";

class App extends Component {
  //Change Page

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Todos />
        </div>
      </Provider>
    );
  }
}
export default App;
