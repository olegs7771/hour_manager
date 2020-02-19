import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
//Layout
import Header from "../src/components/layout/header/Header";

import configureStore from "./store/configureStore/configureStore";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  }
}

export default App;
