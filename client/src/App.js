import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//Auth
import Register from "../src/components/auth/Register";
//Layout
import Header from "../src/components/layout/header/Header";

import configureStore from "./store/configureStore/configureStore";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
